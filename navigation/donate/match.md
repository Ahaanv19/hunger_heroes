---
layout: base
title: Find Food Near You
permalink: /donate/match
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">

    <!-- Back -->
    <a href="{{site.baseurl}}/donate/" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Donate
    </a>

    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Find Food Near You</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">Enter your zip code and preferences to find available donations</p>
    </div>

    <!-- Search Form -->
    <div class="glass rounded-3xl shadow-large p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 mb-8">
      <form id="match-form" class="space-y-6">

        <!-- Zip Code -->
        <div>
          <label for="zip" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Zip Code</label>
          <input id="zip" type="text" maxlength="5" pattern="[0-9]{5}" required
            class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="e.g. 92127">
        </div>

        <!-- Dietary Preferences -->
        <fieldset>
          <legend class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Dietary Preferences</legend>
          <div class="flex flex-wrap gap-3">
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="vegetarian" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🥬 Vegetarian</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="vegan" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🌱 Vegan</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="halal" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🍖 Halal</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="kosher" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">✡️ Kosher</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="gluten-free" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🌾 Gluten-Free</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="dairy-free" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🥛 Dairy-Free</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="nut-free" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🥜 Nut-Free</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-500">
              <input type="checkbox" name="dietary" value="organic" class="accent-green-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🌿 Organic</span>
            </label>
          </div>
        </fieldset>

        <!-- Allergen Exclusions -->
        <fieldset>
          <legend class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Exclude Allergens</legend>
          <div class="flex flex-wrap gap-3">
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="peanuts" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🥜 Peanuts</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="tree-nuts" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🌰 Tree Nuts</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="dairy" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🥛 Dairy</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="eggs" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🥚 Eggs</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="soy" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🫘 Soy</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="shellfish" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🦐 Shellfish</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="wheat" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🌾 Wheat</span>
            </label>
            <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-400 dark:has-[:checked]:bg-red-900/20 dark:has-[:checked]:border-red-500">
              <input type="checkbox" name="allergen_exclude" value="fish" class="accent-red-600 w-4 h-4">
              <span class="text-sm text-slate-700 dark:text-slate-300">🐟 Fish</span>
            </label>
          </div>
        </fieldset>

        <!-- Submit -->
        <button type="submit" id="match-btn"
          class="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-xl font-semibold shadow-medium hover:shadow-large transition-all flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Find Matching Donations
        </button>
      </form>
    </div>

    <!-- Results -->
    <div id="results-area"></div>

  </div>
</div>

<!-- Toast -->
<div id="toast" class="fixed bottom-6 right-6 z-50 hidden">
  <div id="toast-inner" class="px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-large flex items-center gap-2"></div>
</div>

<script type="module">
  // ============================================
  // SRP IMPORTS: Shared single-responsibility functions
  // ============================================
  import {
    javaURI, pythonURI,
    springFetch, flaskFetch,
    statusBadge, urgencyBadge, sourceBadge,
    normalizeDonationList, showToast,
    emptyPlaceholder, ERROR_TYPES, getErrorMessage
  } from '{{site.baseurl}}/assets/js/api/donationApi.js';

  // ============================================
  // RESPONSIBILITY: Extract form values from the match form
  // Returns: { zip, dietary, allergenExclude }
  // ============================================
  function getFormValues() {
    return {
      zip: document.getElementById('zip').value.trim(),
      dietary: [...document.querySelectorAll('input[name="dietary"]:checked')].map(c => c.value),
      allergenExclude: [...document.querySelectorAll('input[name="allergen_exclude"]:checked')].map(c => c.value),
    };
  }

  // ============================================
  // RESPONSIBILITY: Validate zip code format
  // Parameters: zip (string)
  // Returns: boolean
  // ============================================
  function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
  }

  // ============================================
  // RESPONSIBILITY: Client-side filter donations by zip, allergens, status
  // Parameters: donations (array), zip (string), allergenExclude (array)
  // Returns: array — filtered donations
  // ============================================
  function filterDonationsClientSide(donations, zip, allergenExclude) {
    let result = donations;

    // Zip filter (match first 3 digits)
    result = result.filter(d => {
      const donorZip = d.donor_zip || d.zip_code || '';
      return donorZip.startsWith(zip.substring(0, 3));
    });

    // Allergen exclusion
    if (allergenExclude.length) {
      result = result.filter(d => {
        const dAllergens = (d.allergens || []).map(a => a.toLowerCase());
        return !allergenExclude.some(ex => dAllergens.includes(ex.toLowerCase()));
      });
    }

    // Only active/posted donations
    result = result.filter(d => {
      const s = (d.status || '').toLowerCase();
      return s === 'posted' || s === 'active';
    });

    return result;
  }

  // ============================================
  // RESPONSIBILITY: Render a single match result card
  // Parameters: d (object) — donation
  // Returns: string — HTML card
  // ============================================
  function renderMatchCard(d) {
    const dte = d.days_until_expiry ?? d.daysUntilExpiry ?? null;
    const expiryColor = dte === null ? 'text-slate-400' : dte > 5 ? 'text-green-600 dark:text-green-400' : dte >= 2 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';
    const allergens = (d.allergens || []).map(a => `<span class="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-xs font-medium">${a}</span>`).join(' ');
    const tags = (d.dietary_tags || []).map(t => `<span class="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md text-xs font-medium">${t}</span>`).join(' ');
    return `
    <div class="glass rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 hover:shadow-large transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="font-bold text-slate-900 dark:text-white text-lg">${d.food_name || 'Food Donation'}</h3>
            ${statusBadge(d.status)}
            ${urgencyBadge(d)}
          </div>
          <div class="flex flex-wrap gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
            <span>📍 ${d.donor_zip || d.zip_code || '—'}</span>
            <span>📂 ${d.category || '—'}</span>
            <span>📦 ${d.quantity || '—'} ${d.unit || ''}</span>
            <span>🗄️ ${d.storage || '—'}</span>
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-2 text-sm">
            <span class="${expiryColor} font-semibold">📅 ${d.expiry_date || d.expiration_date || '—'}${dte !== null ? ` (${dte}d left)` : ''}</span>
          </div>
          ${allergens ? `<div class="flex flex-wrap gap-1 mt-2"><span class="text-xs text-slate-400 mr-1">Allergens:</span>${allergens}</div>` : ''}
          ${tags ? `<div class="flex flex-wrap gap-1 mt-2"><span class="text-xs text-slate-400 mr-1">Diet:</span>${tags}</div>` : ''}
        </div>
        <button data-accept-id="${d.id}" class="accept-btn px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-medium hover:shadow-large transition-all whitespace-nowrap mt-2 sm:mt-0">
          ✋ Accept
        </button>
      </div>
    </div>`;
  }

  // ============================================
  // RESPONSIBILITY: Render all match results
  // Parameters: items (array), source (string), container (Element)
  // ============================================
  function renderResults(items, source, container) {
    if (items.length === 0) {
      container.innerHTML = emptyPlaceholder(
        'No Matches Found',
        'Try adjusting your filters or check back later for new donations.',
        '🔍'
      );
      return;
    }

    container.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">${items.length} Match${items.length !== 1 ? 'es' : ''} Found</h2>
        ${sourceBadge(source)}
      </div>
      <div class="space-y-4">${items.map(renderMatchCard).join('')}</div>`;
  }

  // ============================================
  // WORKER: Fetch matches from Spring backend
  // Parameters: zip, dietary, allergenExclude
  // Returns: array — matched donations
  // ============================================
  async function fetchSpringMatches(zip, dietary, allergenExclude) {
    return springFetch(`${javaURI}/api/donations/match`, {
      method: 'POST',
      body: JSON.stringify({ zip, dietary_prefs: dietary, allergen_exclusions: allergenExclude })
    });
  }

  // ============================================
  // WORKER: Fetch and filter donations from Flask (fallback)
  // Parameters: zip, allergenExclude
  // Returns: array — filtered donations
  // ============================================
  async function fetchFlaskMatches(zip, allergenExclude) {
    const raw = normalizeDonationList(await flaskFetch(`${pythonURI}/api/donations`));
    return filterDonationsClientSide(raw, zip, allergenExclude);
  }

  // ============================================
  // WORKER: Accept a donation via Spring
  // Parameters: id (string)
  // ============================================
  async function acceptDonation(id) {
    return springFetch(`${javaURI}/api/donations/${id}/accept`, { method: 'POST' });
  }

  // ============================================
  // ORCHESTRATOR: Handle form submit — coordinates validation → fetch → render
  // ============================================
  document.getElementById('match-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const { zip, dietary, allergenExclude } = getFormValues();
    if (!isValidZip(zip)) { showToast('Please enter a valid 5-digit zip code', 'error'); return; }

    const btn = document.getElementById('match-btn');
    const results = document.getElementById('results-area');

    // UI: disable button
    btn.disabled = true;
    btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Searching…';

    try {
      let items = [];
      let source = '';

      // Step 1: Try Spring smart-match
      try {
        const data = await fetchSpringMatches(zip, dietary, allergenExclude);
        items = Array.isArray(data) ? data : [];
        source = 'spring';
      } catch (springErr) {
        console.log('Spring match unavailable, trying Flask…', springErr.message);
        // Step 2: Fall back to Flask with client-side filtering
        items = await fetchFlaskMatches(zip, allergenExclude);
        source = 'flask';
      }

      // Step 3: Render results
      renderResults(items, source, results);
    } catch (err) {
      const msg = err.message === ERROR_TYPES.AUTHENTICATION_REQUIRED
        ? 'Login required — please log in first.'
        : getErrorMessage(err);
      results.innerHTML = `
        <div class="text-center py-16">
          <div class="text-6xl mb-4">⚠️</div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Could Not Reach Server</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto">${msg}</p>
          ${err.message === ERROR_TYPES.AUTHENTICATION_REQUIRED ? `<a href="{{site.baseurl}}/login" class="inline-flex mt-4 px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold transition-colors">Log In</a>` : ''}
        </div>`;
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> Find Matching Donations';
    }
  });

  // ============================================
  // ORCHESTRATOR: Handle accept button clicks
  // ============================================
  document.getElementById('results-area').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-accept-id]');
    if (!btn) return;
    const id = btn.dataset.acceptId;

    btn.disabled = true;
    btn.textContent = 'Accepting…';

    acceptDonation(id)
      .then(() => {
        btn.textContent = '✅ Accepted';
        btn.classList.replace('from-green-500', 'from-gray-400');
        btn.classList.replace('to-emerald-600', 'to-gray-500');
        showToast('Donation accepted successfully!');
      })
      .catch(err => {
        btn.disabled = false;
        btn.textContent = '✋ Accept';
        showToast(getErrorMessage(err), 'error');
      });
  });
</script>
