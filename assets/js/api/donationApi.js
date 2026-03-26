/**
 * Hunger Heroes — Donation API Module (SRP + API Chaining)
 * 
 * Each function has a SINGLE RESPONSIBILITY following APCSP Procedural Abstraction:
 *   - Parameters: Inputs that customize behavior
 *   - Algorithm: Sequenced steps implementing purpose
 *   - Return Value: Output for calling code
 *   - Abstraction: Hides complexity, provides clear interface
 * 
 * ARCHITECTURE:
 *   Error Configuration  → Centralized error definitions
 *   API Workers           → Single-purpose fetch functions (do the work)
 *   Data Transformers     → Pure functions for data manipulation
 *   UI Renderers          → DOM update functions
 *   Orchestrators         → Coordinate workflows (delegate, never implement)
 */

import { javaURI, pythonURI, fetchOptions } from './config.js';

// ============================================
// ERROR CONFIGURATION: Centralized error types & messages
// ============================================

export const ERROR_TYPES = {
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  INVALID_DATA: 'INVALID_DATA',
  HTTP_ERROR: 'HTTP_ERROR',
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  BACKEND_UNAVAILABLE: 'BACKEND_UNAVAILABLE',
};

export const ERROR_MESSAGES = {
  [ERROR_TYPES.AUTHENTICATION_REQUIRED]: 'Please log in to access this feature.',
  [ERROR_TYPES.INVALID_DATA]: 'Invalid data received from server.',
  [ERROR_TYPES.TIMEOUT]: 'Server took too long to respond. Please try again.',
  [ERROR_TYPES.NETWORK_ERROR]: 'Network error. Check your connection.',
  [ERROR_TYPES.NOT_FOUND]: 'Resource not found.',
  [ERROR_TYPES.BACKEND_UNAVAILABLE]: 'Neither Spring nor Flask backend could be reached.',
  [ERROR_TYPES.HTTP_ERROR]: (statusCode) => `Server error (${statusCode}). Please try again.`,
  DEFAULT: 'An unexpected error occurred.',
};

// ============================================
// RESPONSIBILITY: Get user-friendly error message
// Parameters: error (Error) — the caught error
// Returns: string — human-readable message
// ============================================
export function getErrorMessage(error) {
  if (error.message.startsWith(ERROR_TYPES.HTTP_ERROR)) {
    const statusCode = error.message.split('_').pop();
    return ERROR_MESSAGES[ERROR_TYPES.HTTP_ERROR](statusCode);
  }
  return ERROR_MESSAGES[error.message] || ERROR_MESSAGES.DEFAULT;
}

// ============================================
// RESPONSIBILITY: Fetch from Spring backend with timeout
// Parameters: url (string), opts (object) — fetch options override
// Returns: Promise<any> — parsed JSON response
// Throws: Error with typed error codes
// ============================================
export async function springFetch(url, opts = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { ...fetchOptions, ...opts, signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.status === 401 || res.status === 403) {
      throw new Error(ERROR_TYPES.AUTHENTICATION_REQUIRED);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`${ERROR_TYPES.HTTP_ERROR}_${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') throw new Error(ERROR_TYPES.TIMEOUT);
    throw err;
  }
}

// ============================================
// RESPONSIBILITY: Fetch from Flask backend with timeout
// Parameters: url (string), opts (object) — fetch options override
// Returns: Promise<any> — parsed JSON response
// ============================================
export async function flaskFetch(url, opts = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { ...fetchOptions, ...opts, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`${ERROR_TYPES.HTTP_ERROR}_${res.status}`);
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') throw new Error(ERROR_TYPES.TIMEOUT);
    throw err;
  }
}

// ============================================
// RESPONSIBILITY: Try Spring first, fall back to Flask
// Parameters: springUrl, flaskUrl, opts, transformFlask (optional)
// Returns: { data, source } — data and which backend served it
// ============================================
export async function dualFetch(springUrl, flaskUrl, opts = {}, transformFlask = null) {
  // Step 1: Try Spring backend (primary)
  try {
    const data = await springFetch(springUrl, opts);
    return { data, source: 'spring' };
  } catch (springErr) {
    console.log('Spring unavailable, trying Flask…', springErr.message);
  }

  // Step 2: Fall back to Flask backend
  try {
    let data = await flaskFetch(flaskUrl, opts);
    if (transformFlask) data = transformFlask(data);
    return { data, source: 'flask' };
  } catch (flaskErr) {
    console.log('Flask also unavailable', flaskErr.message);
  }

  // Step 3: Both failed
  throw new Error(ERROR_TYPES.BACKEND_UNAVAILABLE);
}

// ============================================
// RESPONSIBILITY: POST to both backends (keep in sync)
// Parameters: endpoint (string), body (object)
// Returns: { id, source } — donation id and primary source
// ============================================
export async function dualPost(endpoint, body) {
  let resultId = null;
  let source = 'local';

  // Step 1: Try Spring first
  try {
    const springRes = await fetch(`${javaURI}${endpoint}`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (springRes.ok) {
      const result = await springRes.json();
      resultId = result.id || result.donation_id;
      source = 'spring';
      console.log('✅ Spring POST:', endpoint, resultId);
    }
  } catch (e) {
    console.log('Spring unavailable for POST:', e.message);
  }

  // Step 2: Also save to Flask (keep databases in sync)
  try {
    const flaskRes = await fetch(`${pythonURI}${endpoint}`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (flaskRes.ok) {
      const result = await flaskRes.json();
      if (!resultId) {
        resultId = result.id || result.donation_id;
        source = 'flask';
      }
      console.log('✅ Flask POST:', endpoint);
    }
  } catch (e) {
    console.log('Flask unavailable for POST:', e.message);
  }

  return { id: resultId, source };
}

// ============================================
// URGENCY SYSTEM — Computed from expiration data
// ============================================

/**
 * RESPONSIBILITY: Compute urgency level for a donation
 * Parameters: donation (object) — must have expiry_date or expires_at
 * Returns: { level, label, emoji, color, hoursLeft }
 * 
 * Urgency Levels:
 *   🟢 Fresh    — >3 hours left
 *   🟡 Expiring — 1–3 hours left
 *   🔴 Urgent   — <1 hour left
 *   ⚫ Expired  — past expiration
 */
export function computeUrgency(donation) {
  const expiryStr = donation.expires_at || donation.expiry_date || donation.expiration_date || donation.expirationDate;
  if (!expiryStr) {
    return { level: 'unknown', label: 'Unknown', emoji: '❓', color: 'text-slate-400', cssClass: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400', hoursLeft: null };
  }

  const expiry = new Date(expiryStr);
  const now = new Date();
  const hoursLeft = (expiry - now) / (1000 * 60 * 60);

  if (hoursLeft <= 0) {
    return { level: 'expired', label: 'Expired', emoji: '⚫', color: 'text-red-700 dark:text-red-400', cssClass: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', hoursLeft: 0 };
  }
  if (hoursLeft < 1) {
    return { level: 'urgent', label: 'Urgent', emoji: '🔴', color: 'text-red-600 dark:text-red-400', cssClass: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400', hoursLeft: Math.round(hoursLeft * 60) };
  }
  if (hoursLeft <= 3) {
    return { level: 'expiring', label: 'Expiring Soon', emoji: '🟡', color: 'text-amber-600 dark:text-amber-400', cssClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400', hoursLeft: Math.round(hoursLeft) };
  }
  return { level: 'fresh', label: 'Fresh', emoji: '🟢', color: 'text-green-600 dark:text-green-400', cssClass: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400', hoursLeft: Math.round(hoursLeft) };
}

/**
 * RESPONSIBILITY: Render an urgency badge HTML string
 * Parameters: donation (object)
 * Returns: string — HTML for the badge
 */
export function urgencyBadge(donation) {
  const u = computeUrgency(donation);
  if (u.level === 'unknown') return '';

  let timeText = '';
  if (u.level === 'expired') {
    timeText = 'Expired';
  } else if (u.level === 'urgent') {
    timeText = `${u.hoursLeft}m left`;
  } else {
    timeText = `${u.hoursLeft}h left`;
  }

  return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${u.cssClass}">${u.emoji} ${timeText}</span>`;
}

/**
 * RESPONSIBILITY: Sort donations with urgent items first
 * Parameters: donations (array)
 * Returns: array — sorted copy (does not mutate original)
 */
export function sortByUrgency(donations) {
  const levelOrder = { expired: 0, urgent: 1, expiring: 2, fresh: 3, unknown: 4 };
  return [...donations].sort((a, b) => {
    const ua = computeUrgency(a);
    const ub = computeUrgency(b);
    return (levelOrder[ua.level] ?? 4) - (levelOrder[ub.level] ?? 4);
  });
}

// ============================================
// DATA TRANSFORMERS — Pure functions, no side effects
// ============================================

/**
 * RESPONSIBILITY: Normalize donation status across backends
 * Parameters: raw (string) — status from any backend
 * Returns: string — normalized status
 */
export function normalizeStatus(raw) {
  const s = (raw || '').toLowerCase().replace(/ /g, '_');
  const map = { posted: 'active', claimed: 'accepted', in_transit: 'in-transit', confirmed: 'delivered' };
  return map[s] || s;
}

/**
 * RESPONSIBILITY: Generate a status badge HTML string
 * Parameters: raw (string) — raw status
 * Returns: string — HTML badge
 */
export function statusBadge(raw) {
  const s = normalizeStatus(raw);
  const map = {
    active:       ['📋 Active',      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'],
    accepted:     ['🤝 Accepted',    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'],
    'in-transit': ['🚚 In Transit',  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'],
    delivered:    ['📦 Delivered',    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'],
    cancelled:    ['❌ Cancelled',    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'],
    expired:      ['⏰ Expired',     'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'],
  };
  const [label, cls] = map[s] || ['❓ ' + raw, 'bg-gray-100 text-gray-600'];
  return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${cls}">${label}</span>`;
}

/**
 * RESPONSIBILITY: Build a source badge (Spring vs Flask)
 * Parameters: source (string) — 'spring' or 'flask'
 * Returns: string — HTML badge
 */
export function sourceBadge(source) {
  if (!source) return '';
  const isSpring = source === 'spring';
  const cls = isSpring
    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
    : 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400';
  const label = isSpring ? '☕ Java Spring' : '🐍 Flask';
  return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cls}">${label}</span>`;
}

/**
 * RESPONSIBILITY: Normalize a Flask donation list response
 * Parameters: data (any) — raw Flask response
 * Returns: array — normalized donation array
 */
export function normalizeDonationList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.donations)) return data.donations;
  return [];
}

/**
 * RESPONSIBILITY: Generate a client-side fallback donation ID
 * Returns: string — unique ID
 */
export function generateLocalId() {
  return 'HH-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// ============================================
// LOCALSTORAGE HELPERS — Persistence fallback
// ============================================

const STORAGE_KEY = 'hh_donations';

/**
 * RESPONSIBILITY: Read donations from localStorage
 * Returns: array
 */
export function getLocalDonations() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

/**
 * RESPONSIBILITY: Save/update a donation in localStorage
 * Parameters: donation (object) — must have .id
 */
export function saveLocalDonation(donation) {
  const all = getLocalDonations();
  const idx = all.findIndex(x => x.id === donation.id);
  if (idx >= 0) all[idx] = donation;
  else all.push(donation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * RESPONSIBILITY: Clean up old delivered/confirmed donations (24hr)
 */
export function cleanupLocalDonations() {
  const all = getLocalDonations();
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const cleaned = all.filter(d => {
    if (d.status === 'confirmed' && d.confirmed_at && new Date(d.confirmed_at).getTime() < cutoff) return false;
    if (d.status === 'delivered' && d.delivered_at && new Date(d.delivered_at).getTime() < cutoff) return false;
    return true;
  });
  if (cleaned.length !== all.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }
}

// ============================================
// UI HELPERS — Toast notifications
// ============================================

/**
 * RESPONSIBILITY: Show a toast notification
 * Parameters: msg (string), type ('success' | 'error')
 */
export function showToast(msg, type = 'success') {
  const el = document.getElementById('toast');
  const inner = document.getElementById('toast-inner');
  if (!el || !inner) return;
  inner.className = `px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-large flex items-center gap-2 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`;
  inner.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

/**
 * RESPONSIBILITY: Render an error placeholder with retry button
 * Parameters: msg (string)
 * Returns: string — HTML
 */
export function errorPlaceholder(msg) {
  return `<div class="text-center py-8"><div class="text-4xl mb-2">⚠️</div><p class="text-slate-500 dark:text-slate-400 text-sm">${msg}</p><button onclick="location.reload()" class="mt-3 px-4 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-semibold transition-colors">Retry</button></div>`;
}

/**
 * RESPONSIBILITY: Render a "no results" placeholder
 * Parameters: title (string), subtitle (string), emoji (string)
 * Returns: string — HTML
 */
export function emptyPlaceholder(title, subtitle, emoji = '📭') {
  return `
    <div class="text-center py-16">
      <div class="text-5xl mb-3">${emoji}</div>
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">${title}</h3>
      <p class="text-slate-500 dark:text-slate-400 text-sm">${subtitle}</p>
    </div>`;
}

// ============================================
// CATEGORY DATA
// ============================================

export const CATEGORY_EMOJIS = {
  'canned': '🥫', 'fresh-produce': '🥬', 'dairy': '🧀', 'bakery': '🍞',
  'meat-protein': '🥩', 'grains': '🌾', 'beverages': '🥤', 'frozen': '❄️',
  'snacks': '🍪', 'baby-food': '🍼', 'prepared-meals': '🍱', 'other': '📦',
  'produce': '🥦', 'meat': '🥩', 'seafood': '🐟', 'prepared': '🍱',
  'dry-goods': '🌾', 'All Food': '🍽️', 'Perishable': '🧊',
  'Shelf-Stable': '🏪', 'Specialty': '✨',
};

// Re-export URIs for pages that need them
export { javaURI, pythonURI, fetchOptions };

// ============================================
// NETWORK HELPERS: status update, assign volunteer, label download
// ============================================

/**
 * RESPONSIBILITY: Patch donation status with Spring → Flask fallback
 * Parameters: id (string), payload (object)
 * Returns: parsed JSON response
 */
export async function patchStatus(id, payload = {}) {
  const endpoint = `${javaURI}/api/donations/${encodeURIComponent(id)}/status`;
  try {
    const res = await springFetch(endpoint, { method: 'PATCH', body: JSON.stringify(payload) });
    return res;
  } catch (e) {
    // try Flask fallback
    const flaskUrl = `${pythonURI}/api/donations/${encodeURIComponent(id)}/status`;
    try {
      return await flaskFetch(flaskUrl, { method: 'PATCH', body: JSON.stringify(payload) });
    } catch (fe) {
      throw new Error(ERROR_TYPES.BACKEND_UNAVAILABLE);
    }
  }
}


/**
 * RESPONSIBILITY: Assign a volunteer to a donation (Spring → Flask fallback)
 * Parameters: id (string), volunteer (object) — e.g. { volunteer_name }
 * Returns: parsed JSON response
 */
export async function assignVolunteer(id, volunteer) {
  const endpoint = `${javaURI}/api/donations/${encodeURIComponent(id)}/assign-volunteer`;
  try {
    const res = await springFetch(endpoint, { method: 'POST', body: JSON.stringify(volunteer) });
    return res;
  } catch (e) {
    const flaskUrl = `${pythonURI}/api/donations/${encodeURIComponent(id)}/assign-volunteer`;
    try {
      return await flaskFetch(flaskUrl, { method: 'POST', body: JSON.stringify(volunteer) });
    } catch (fe) {
      throw new Error(ERROR_TYPES.BACKEND_UNAVAILABLE);
    }
  }
}


/**
 * RESPONSIBILITY: Try to fetch a server-rendered label (PNG/PDF) as Blob
 * Parameters: id (string)
 * Returns: Blob or throws
 */
export async function fetchLabelBlob(id) {
  // Try Spring
  try {
    const res = await fetch(`${javaURI}/api/donations/${encodeURIComponent(id)}/label`, { ...fetchOptions });
    if (res.ok) return await res.blob();
  } catch (e) {
    console.log('Spring label fetch failed', e.message);
  }

  // Try Flask
  try {
    const res = await fetch(`${pythonURI}/api/donations/${encodeURIComponent(id)}/label`, { ...fetchOptions });
    if (res.ok) return await res.blob();
  } catch (e) {
    console.log('Flask label fetch failed', e.message);
  }

  throw new Error(ERROR_TYPES.BACKEND_UNAVAILABLE);
}


/**
 * RESPONSIBILITY: Toggle a simple loading state for a button element
 * Parameters: el (HTMLElement|string), loading (bool)
 */
export function setLoading(el, loading = true) {
  let node = null;
  if (typeof el === 'string') node = document.querySelector(el);
  else node = el;
  if (!node) return;
  if (loading) {
    node.dataset.origHtml = node.innerHTML;
    node.disabled = true;
    node.innerHTML = `<svg class="animate-spin w-4 h-4 mr-2 inline-block" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="CurrentColor" stroke-width="4" fill="none" opacity="0.25"></circle><path d="M4 12a8 8 0 018-8" stroke="CurrentColor" stroke-width="4" fill="none"></path></svg> ${node.dataset.loadingText || 'Loading...'}`;
  } else {
    node.disabled = false;
    if (node.dataset.origHtml) node.innerHTML = node.dataset.origHtml;
  }
}
