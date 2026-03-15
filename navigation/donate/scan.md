---
layout: base
title: Scan Donation
permalink: /donate/scan
search_exclude: true
menu: nav/home.html
---

<!-- html5-qrcode CDN -->
<script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-2xl mx-auto">

    <!-- Back -->
    <a href="{{site.baseurl}}/donate/" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Donate
    </a>

    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-secondary-500 shadow-md mb-4">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Scan & Manage</h1>
      <p class="text-slate-500 dark:text-slate-400">Scan a QR code or enter a Donation ID to view details and manage status</p>
    </div>

    <!-- Tab Buttons -->
    <div class="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1 mb-6">
      <button onclick="switchTab('camera')" id="tab-camera"
        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>
        Camera
      </button>
      <button onclick="switchTab('manual')" id="tab-manual"
        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all text-slate-500 dark:text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
        </svg>
        Enter ID
      </button>
    </div>

    <!-- Camera Panel -->
    <div id="panel-camera" class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div id="qr-reader" class="w-full" style="min-height: 300px;"></div>
        <div class="p-4 text-center">
          <p id="camera-status" class="text-sm text-slate-400">Initializing camera…</p>
        </div>
      </div>
    </div>

    <!-- Manual Panel -->
    <div id="panel-manual" class="hidden space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Donation ID</label>
        <div class="flex gap-3">
          <input type="text" id="manual-id" placeholder="HH-XXXXXX-XXXX"
            class="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 font-mono text-lg tracking-wider">
          <button onclick="lookupById()"
            class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all whitespace-nowrap">
            Look Up
          </button>
        </div>
      </div>
    </div>

    <!-- Warning Banners (shown dynamically) -->
    <div id="warning-banners" class="space-y-3 mt-4 hidden"></div>

    <!-- Result -->
    <div id="result-panel" class="hidden mt-6 space-y-4">

      <!-- Status Timeline -->
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <h3 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Status Timeline</h3>
        <div id="status-timeline" class="flex items-center justify-between gap-1"></div>
      </div>

      <!-- Donation Info Card -->
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Donation Details</h3>
          <span id="result-status" class="px-3 py-1 rounded-full text-xs font-bold"></span>
        </div>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span id="result-emoji" class="text-3xl"></span>
            <div>
              <h2 id="result-food" class="text-xl font-bold text-slate-900 dark:text-white"></h2>
              <p id="result-meta" class="text-sm text-slate-500 dark:text-slate-400"></p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm" id="result-grid"></div>
          <div id="result-allergens" class="hidden">
            <p class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">⚠️ Allergens</p>
            <p id="result-allergens-list" class="text-sm text-slate-700 dark:text-slate-300"></p>
          </div>
          <div id="result-instructions" class="hidden">
            <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">📝 Special Instructions</p>
            <p id="result-instructions-text" class="text-sm text-slate-700 dark:text-slate-300 italic"></p>
          </div>
        </div>
      </div>

      <!-- Volunteer Assignment Section -->
      <div id="volunteer-section" class="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6 hidden">
        <h3 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">🙋 Volunteer Assignment</h3>

        <!-- Assigned volunteer info -->
        <div id="volunteer-info" class="hidden">
          <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm" id="volunteer-avatar"></div>
            <div>
              <p class="font-semibold text-slate-900 dark:text-white" id="volunteer-name-display"></p>
              <p class="text-xs text-slate-500 dark:text-slate-400" id="volunteer-since"></p>
            </div>
          </div>
        </div>

        <!-- Assign form (when no volunteer yet) -->
        <div id="volunteer-assign-form" class="hidden">
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">No volunteer assigned yet. Claim this donation to deliver it.</p>
          <div class="flex gap-3">
            <input type="text" id="volunteer-name-input" placeholder="Your name"
              class="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm">
            <button onclick="assignVolunteer()"
              class="px-5 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-semibold text-sm shadow-md transition-all whitespace-nowrap">
              🙋 Volunteer
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div id="action-buttons" class="space-y-3"></div>

      <!-- Scan Again -->
      <button onclick="resetScanner()"
        class="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors mt-2">
        ← Scan Another
      </button>
    </div>

  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  const CATEGORY_MAP = {
    'canned':'🥫','fresh-produce':'🥬','dairy':'🧀','bakery':'🍞',
    'meat-protein':'🥩','grains':'🌾','beverages':'🥤','frozen':'❄️',
    'snacks':'🍪','baby-food':'🍼','prepared-meals':'🍱','other':'📦'
  };

  const STATUS_FLOW = ['posted','claimed','in_transit','delivered','confirmed'];
  const STATUS_LABELS = {
    'posted':'Posted','claimed':'Claimed','in_transit':'In Transit',
    'delivered':'Delivered','confirmed':'Confirmed',
    'expired':'Expired','cancelled':'Cancelled'
  };
  const STATUS_COLORS = {
    'posted':     'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'claimed':    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'in_transit': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'delivered':  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'confirmed':  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'expired':    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'cancelled':  'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400',
  };

  let currentDonation = null;
  let html5QrCode = null;

  // ── Tab Switching ──

  window.switchTab = function(tab) {
    const isCamera = tab === 'camera';
    document.getElementById('panel-camera').classList.toggle('hidden', !isCamera);
    document.getElementById('panel-manual').classList.toggle('hidden', isCamera);
    const camBtn = document.getElementById('tab-camera');
    const manBtn = document.getElementById('tab-manual');
    if (isCamera) {
      camBtn.classList.add('bg-white','dark:bg-slate-700','text-slate-900','dark:text-white','shadow-sm');
      camBtn.classList.remove('text-slate-500','dark:text-slate-400');
      manBtn.classList.remove('bg-white','dark:bg-slate-700','text-slate-900','dark:text-white','shadow-sm');
      manBtn.classList.add('text-slate-500','dark:text-slate-400');
      startCamera();
    } else {
      manBtn.classList.add('bg-white','dark:bg-slate-700','text-slate-900','dark:text-white','shadow-sm');
      manBtn.classList.remove('text-slate-500','dark:text-slate-400');
      camBtn.classList.remove('bg-white','dark:bg-slate-700','text-slate-900','dark:text-white','shadow-sm');
      camBtn.classList.add('text-slate-500','dark:text-slate-400');
      stopCamera();
    }
  };

  // ── Camera with html5-qrcode ──

  function startCamera() {
    if (html5QrCode) return;
    const el = document.getElementById('qr-reader');
    html5QrCode = new Html5Qrcode('qr-reader');
    html5QrCode.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        stopCamera();
        document.getElementById('camera-status').textContent = `Scanned: ${decodedText}`;
        lookupDonation(decodedText.trim());
      },
      () => {}
    ).then(() => {
      document.getElementById('camera-status').textContent = 'Point camera at a QR code…';
    }).catch(err => {
      document.getElementById('camera-status').textContent = 'Camera not available. Use "Enter ID" tab.';
      console.warn('Camera error:', err);
    });
  }

  function stopCamera() {
    if (html5QrCode) {
      try {
        const state = html5QrCode.getState();
        // Only stop if actually scanning (state 2 = SCANNING, state 3 = PAUSED)
        if (state === 2 || state === 3) {
          html5QrCode.stop().catch(() => {});
        }
      } catch (e) { /* getState may throw if not initialized */ }
      try { html5QrCode.clear(); } catch (e) {}
      html5QrCode = null;
    }
  }

  // ── Manual Lookup ──

  window.lookupById = function() {
    const id = document.getElementById('manual-id').value.trim();
    if (!id) return;
    lookupDonation(id);
  };

  document.getElementById('manual-id')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.lookupById();
  });

  // ── Core Lookup ──

  async function lookupDonation(id) {
    let donation = null;
    let warnings = [];

    // Try backend scan endpoint first
    try {
      const res = await fetch(`${pythonURI}/api/donations/scan`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ scan_data: id, scan_type: 'qr' })
      });
      if (res.ok) {
        const data = await res.json();
        donation = data;
        warnings = data.warnings || [];
      }
    } catch (e) {}

    // Fallback: try GET endpoint
    if (!donation) {
      try {
        const res = await fetch(`${pythonURI}/api/donations/${encodeURIComponent(id)}`, fetchOptions);
        if (res.ok) donation = await res.json();
      } catch (e) {}
    }

    // Fallback: localStorage
    if (!donation) {
      const all = JSON.parse(localStorage.getItem('hh_donations') || '[]');
      donation = all.find(d => d.id === id);
      if (donation) {
        // Check expiry locally
        const expiry = new Date(donation.expiry_date);
        const today = new Date(); today.setHours(0,0,0,0);
        if (expiry < today) {
          warnings.push({ type: 'expired', message: `This donation expired on ${donation.expiry_date}` });
          if (donation.status === 'posted') donation.status = 'expired';
        } else {
          const daysLeft = Math.ceil((expiry - today) / 86400000);
          if (daysLeft <= 3) warnings.push({ type: 'expiring_soon', message: `Expires in ${daysLeft} day(s)` });
        }
      }
    }

    if (!donation) {
      alert('Donation not found. Check the ID and try again.');
      return;
    }

    currentDonation = donation;
    showWarnings(warnings);
    showResult(donation);
  }

  // ── Warning Banners ──

  function showWarnings(warnings) {
    const container = document.getElementById('warning-banners');
    if (!warnings.length) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }
    container.classList.remove('hidden');
    container.innerHTML = warnings.map(w => {
      const colors = w.type === 'expired'
        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
        : w.type === 'expiring_soon'
        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400';
      const icon = w.type === 'expired' ? '🚫' : w.type === 'expiring_soon' ? '⚠️' : 'ℹ️';
      return `<div class="flex items-center gap-3 p-4 rounded-2xl border ${colors}">
        <span class="text-xl">${icon}</span>
        <p class="text-sm font-medium">${w.message}</p>
      </div>`;
    }).join('');
  }

  // ── Show Result ──

  function showResult(d) {
    document.getElementById('result-panel').classList.remove('hidden');

    // Status badge
    const statusEl = document.getElementById('result-status');
    statusEl.textContent = STATUS_LABELS[d.status] || d.status;
    statusEl.className = `px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[d.status] || STATUS_COLORS['posted']}`;

    // Food info
    document.getElementById('result-emoji').textContent = CATEGORY_MAP[d.category] || '📦';
    document.getElementById('result-food').textContent = d.food_name;
    document.getElementById('result-meta').textContent = `${d.quantity} ${d.unit} · ${d.category}`;

    // Details grid
    const expiry = new Date(d.expiry_date);
    const daysLeft = Math.ceil((expiry - new Date()) / 86400000);
    const expiryColor = daysLeft < 0 ? 'text-red-500' : daysLeft <= 3 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300';

    document.getElementById('result-grid').innerHTML = `
      <div><p class="text-xs text-slate-400 uppercase">Expires</p><p class="font-semibold ${expiryColor}">${expiry.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} ${daysLeft >= 0 ? `(${daysLeft}d)` : '(expired)'}</p></div>
      <div><p class="text-xs text-slate-400 uppercase">Storage</p><p class="font-semibold text-slate-700 dark:text-slate-300">${d.storage || '—'}</p></div>
      <div><p class="text-xs text-slate-400 uppercase">Donor</p><p class="font-semibold text-slate-700 dark:text-slate-300">${d.donor_name || '—'}</p></div>
      <div><p class="text-xs text-slate-400 uppercase">Zip Code</p><p class="font-semibold text-slate-700 dark:text-slate-300">${d.donor_zip || '—'}</p></div>
      <div><p class="text-xs text-slate-400 uppercase">ID</p><p class="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">${d.id}</p></div>
      <div><p class="text-xs text-slate-400 uppercase">Scanned</p><p class="font-semibold text-slate-700 dark:text-slate-300">${d.scan_count || 0} times</p></div>
    `;

    // Allergens
    const allergensEl = document.getElementById('result-allergens');
    if (d.allergens?.length && d.allergens[0] !== 'none') {
      allergensEl.classList.remove('hidden');
      document.getElementById('result-allergens-list').textContent = d.allergens.join(', ');
    } else {
      allergensEl.classList.add('hidden');
    }

    // Instructions
    const instrEl = document.getElementById('result-instructions');
    if (d.special_instructions) {
      instrEl.classList.remove('hidden');
      document.getElementById('result-instructions-text').textContent = d.special_instructions;
    } else {
      instrEl.classList.add('hidden');
    }

    // Status timeline
    renderTimeline(d);

    // Volunteer section
    renderVolunteerSection(d);

    // Action buttons
    renderActionButtons(d);
  }

  // ── Status Timeline ──

  function renderTimeline(d) {
    const container = document.getElementById('status-timeline');
    const currentIdx = STATUS_FLOW.indexOf(d.status);
    const isTerminal = ['expired','cancelled'].includes(d.status);

    container.innerHTML = STATUS_FLOW.map((s, i) => {
      let state = 'upcoming'; // gray
      if (isTerminal) {
        state = 'disabled';
      } else if (i < currentIdx) {
        state = 'done';
      } else if (i === currentIdx) {
        state = 'current';
      }

      const dotColor = state === 'done' ? 'bg-green-500' :
                        state === 'current' ? 'bg-primary-500 ring-4 ring-primary-500/30' :
                        'bg-slate-300 dark:bg-slate-600';
      const labelColor = state === 'current' ? 'text-primary-600 dark:text-primary-400 font-bold' :
                         state === 'done' ? 'text-green-600 dark:text-green-400' :
                         'text-slate-400 dark:text-slate-500';
      const lineColor = state === 'done' ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700';

      return `
        <div class="flex-1 flex flex-col items-center">
          <div class="w-4 h-4 rounded-full ${dotColor} transition-all"></div>
          <p class="text-[10px] mt-1 ${labelColor} whitespace-nowrap">${STATUS_LABELS[s]}</p>
        </div>
        ${i < STATUS_FLOW.length - 1 ? `<div class="flex-1 h-0.5 ${lineColor} mt-2 -mx-1"></div>` : ''}
      `;
    }).join('');

    // Show terminal status badge if expired/cancelled
    if (isTerminal) {
      container.innerHTML += `
        <div class="flex flex-col items-center ml-2">
          <div class="w-4 h-4 rounded-full ${d.status === 'expired' ? 'bg-red-500' : 'bg-slate-500'}"></div>
          <p class="text-[10px] mt-1 font-bold ${d.status === 'expired' ? 'text-red-500' : 'text-slate-500'}">${STATUS_LABELS[d.status]}</p>
        </div>`;
    }
  }

  // ── Volunteer Section ──

  function renderVolunteerSection(d) {
    const section = document.getElementById('volunteer-section');
    const info = document.getElementById('volunteer-info');
    const form = document.getElementById('volunteer-assign-form');

    if (['expired','cancelled','confirmed'].includes(d.status)) {
      section.classList.add('hidden');
      return;
    }

    section.classList.remove('hidden');

    if (d.volunteer) {
      info.classList.remove('hidden');
      form.classList.add('hidden');
      const initials = (d.volunteer.volunteer_name || 'V').split(' ').map(w => w[0]).join('').toUpperCase();
      document.getElementById('volunteer-avatar').textContent = initials;
      document.getElementById('volunteer-name-display').textContent = d.volunteer.volunteer_name;
      document.getElementById('volunteer-since').textContent = `Assigned ${new Date(d.volunteer.assigned_at).toLocaleDateString()}`;
    } else if (d.status === 'posted') {
      info.classList.add('hidden');
      form.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  }

  // ── Action Buttons ──

  function renderActionButtons(d) {
    const container = document.getElementById('action-buttons');
    const buttons = [];

    if (d.status === 'posted') {
      buttons.push(`<button onclick="transitionStatus('claimed')" class="w-full py-3.5 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        Claim This Donation
      </button>`);
    }

    if (d.status === 'claimed') {
      buttons.push(`<button onclick="transitionStatus('in_transit')" class="w-full py-3.5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        📦 Mark as In Transit
      </button>`);
    }

    if (d.status === 'in_transit') {
      buttons.push(`<button onclick="transitionStatus('delivered')" class="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        ✅ Mark as Delivered
      </button>`);
    }

    if (d.status === 'delivered') {
      buttons.push(`<button onclick="transitionStatus('confirmed')" class="w-full py-3.5 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        🎉 Confirm Delivery
      </button>`);
    }

    // View label button (always, if not expired/cancelled)
    if (!['expired','cancelled'].includes(d.status)) {
      buttons.push(`<a href="{{site.baseurl}}/donate/barcode?id=${encodeURIComponent(d.id)}" onclick="sessionStorage.setItem('hh_current_donation', JSON.stringify(currentDonation))"
        class="block w-full py-3 text-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
        🏷️ View Label
      </a>`);
    }

    container.innerHTML = buttons.join('');
  }

  // ── Status Transition ──

  window.transitionStatus = async function(newStatus) {
    if (!currentDonation) return;
    const id = currentDonation.id;

    // Build request payload — include volunteer info if available
    const payload = { new_status: newStatus };
    if (currentDonation.volunteer && currentDonation.volunteer.volunteer_name) {
      payload.volunteer_name = currentDonation.volunteer.volunteer_name;
    }

    // Try backend
    try {
      const res = await fetch(`${pythonURI}/api/donations/${encodeURIComponent(id)}/status`, {
        ...fetchOptions,
        method: 'PATCH',
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const result = await res.json();
        currentDonation.status = newStatus;
        // Set lifecycle timestamps locally
        const now = new Date().toISOString();
        if (newStatus === 'claimed') { currentDonation.claimed_at = now; }
        if (newStatus === 'in_transit') { currentDonation.in_transit_at = now; }
        if (newStatus === 'delivered') { currentDonation.delivered_at = now; }
        if (newStatus === 'confirmed') { currentDonation.confirmed_at = now; }
        showResult(currentDonation);
        updateLocalStorage(currentDonation);
        return;
      }
      const err = await res.json().catch(() => ({}));
      if (err.message) alert(err.message);
      return;
    } catch (e) {}

    // Fallback: localStorage
    currentDonation.status = newStatus;
    const now = new Date().toISOString();
    if (newStatus === 'claimed') { currentDonation.claimed_at = now; }
    if (newStatus === 'in_transit') { currentDonation.in_transit_at = now; }
    if (newStatus === 'delivered') { currentDonation.delivered_at = now; }
    if (newStatus === 'confirmed') { currentDonation.confirmed_at = now; }
    updateLocalStorage(currentDonation);
    showResult(currentDonation);
  };

  // ── Assign Volunteer ──

  window.assignVolunteer = async function() {
    if (!currentDonation) return;
    const name = document.getElementById('volunteer-name-input').value.trim();
    if (!name) { alert('Please enter your name'); return; }

    // Try backend
    try {
      const res = await fetch(`${pythonURI}/api/donations/${encodeURIComponent(currentDonation.id)}/assign-volunteer`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ volunteer_name: name })
      });
      if (res.ok) {
        const result = await res.json();
        currentDonation.volunteer = result.assignment;
        if (currentDonation.status === 'posted') {
          currentDonation.status = 'claimed';
          currentDonation.claimed_at = new Date().toISOString();
        }
        updateLocalStorage(currentDonation);
        showResult(currentDonation);
        return;
      }
      const err = await res.json().catch(() => ({}));
      if (err.message) alert(err.message);
      return;
    } catch (e) {}

    // Fallback: localStorage
    currentDonation.volunteer = {
      volunteer_name: name,
      assigned_at: new Date().toISOString(),
      picked_up_at: null,
      delivered_at: null
    };
    if (currentDonation.status === 'posted') {
      currentDonation.status = 'claimed';
      currentDonation.claimed_at = new Date().toISOString();
    }
    updateLocalStorage(currentDonation);
    showResult(currentDonation);
  };

  // ── Helpers ──

  function updateLocalStorage(d) {
    const all = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    const idx = all.findIndex(x => x.id === d.id);
    if (idx >= 0) all[idx] = d; else all.push(d);
    localStorage.setItem('hh_donations', JSON.stringify(all));
  }

  window.resetScanner = function() {
    currentDonation = null;
    document.getElementById('result-panel').classList.add('hidden');
    document.getElementById('warning-banners').classList.add('hidden');
    document.getElementById('warning-banners').innerHTML = '';
    document.getElementById('manual-id').value = '';
    if (!document.getElementById('panel-camera').classList.contains('hidden')) {
      startCamera();
    }
  };

  // ── Init ──
  document.addEventListener('DOMContentLoaded', () => {
    startCamera();

    // Auto-cleanup: archive old confirmed/delivered donations from localStorage
    const all = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const cleaned = all.filter(d => {
      if (d.status === 'confirmed' && d.confirmed_at && new Date(d.confirmed_at).getTime() < cutoff) return false;
      if (d.status === 'delivered' && d.delivered_at && new Date(d.delivered_at).getTime() < cutoff) return false;
      return true;
    });
    if (cleaned.length !== all.length) {
      localStorage.setItem('hh_donations', JSON.stringify(cleaned));
    }

    // Check URL params for direct scan
    const params = new URLSearchParams(window.location.search);
    const scanId = params.get('id');
    if (scanId) {
      switchTab('manual');
      document.getElementById('manual-id').value = scanId;
      lookupDonation(scanId);
    }
  });
</script>
