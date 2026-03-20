---
layout: base
title: Browse Donations
permalink: /donate/browse
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">

    <!-- Back -->
    <a href="{{site.baseurl}}/donate/" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Donate
    </a>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Browse Donations</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Sort and filter all food donations</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="flex-1">
        <label for="sort-select" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Sort By</label>
        <select id="sort-select"
          class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm">
          <option value="created">Newest First</option>
          <option value="expiry">Expiring Soonest</option>
          <option value="quantity">Most Quantity</option>
        </select>
      </div>
      <div class="flex-1">
        <label for="status-filter" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Filter by Status</label>
        <select id="status-filter"
          class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm">
          <option value="">All Statuses</option>
          <option value="active">📋 Active</option>
          <option value="accepted">🤝 Accepted</option>
          <option value="in-transit">🚚 In Transit</option>
          <option value="delivered">📦 Delivered</option>
          <option value="cancelled">❌ Cancelled</option>
          <option value="expired">⏰ Expired</option>
        </select>
      </div>
    </div>

    <!-- Results count -->
    <p id="results-count" class="text-sm text-slate-400 mb-4"></p>

    <!-- Donation grid -->
    <div id="browse-list">
      <div class="text-center py-16 text-slate-400">
        <svg class="w-8 h-8 animate-spin mx-auto mb-3 text-primary-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Loading donations…
      </div>
    </div>

  </div>
</div>

<script type="module">
  // ============================================
  // SRP IMPORTS: Shared single-responsibility functions
  // ============================================
  import {
    javaURI, pythonURI,
    springFetch, flaskFetch,
    statusBadge, urgencyBadge, sourceBadge,
    sortByUrgency, normalizeDonationList,
    errorPlaceholder, emptyPlaceholder, CATEGORY_EMOJIS
  } from '{{site.baseurl}}/assets/js/api/donationApi.js';

  // ============================================
  // RESPONSIBILITY: Render a single donation card
  // Parameters: d (object) — donation
  // Returns: string — HTML card
  // ============================================
  function renderBrowseCard(d) {
    const dte = d.days_until_expiry ?? null;
    const expiryColor = dte === null ? 'text-slate-500' : dte > 5 ? 'text-green-600 dark:text-green-400' : dte >= 2 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';
    const catEmoji = CATEGORY_EMOJIS[d.category] || '📦';
    return `
    <div class="donation-card glass rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 hover:shadow-large transition-all">
      <div class="flex items-start justify-between mb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-base truncate flex-1">${d.food_name || 'Food Donation'}</h3>
        ${statusBadge(d.status)}
        ${urgencyBadge(d)}
      </div>
      <div class="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
        <div class="flex items-center gap-2">
          <span>${catEmoji} ${d.category || '—'}</span>
          <span class="text-slate-300 dark:text-slate-600">·</span>
          <span>📦 ${d.quantity || '—'} ${d.unit || ''}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="${expiryColor} font-medium">📅 ${d.expiry_date || d.expiration_date || '—'}${dte !== null ? ` (${dte}d)` : ''}</span>
        </div>
        <div class="flex items-center gap-2">
          <span>👤 ${d.donor_name || 'Anonymous'}</span>
          <span class="text-slate-300 dark:text-slate-600">·</span>
          <span>📍 ${d.donor_zip || d.zip_code || '—'}</span>
        </div>
        ${d.allergens && d.allergens.length ? `<div class="flex flex-wrap gap-1 pt-1">${d.allergens.map(a => `<span class="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-xs font-medium">${a}</span>`).join('')}</div>` : ''}
        ${d.dietary_tags && d.dietary_tags.length ? `<div class="flex flex-wrap gap-1 pt-1">${d.dietary_tags.map(t => `<span class="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs font-medium">${t}</span>`).join('')}</div>` : ''}
      </div>
    </div>`;
  }

  // ============================================
  // RESPONSIBILITY: Apply client-side filtering to Flask data
  // Parameters: raw (array), status (string)
  // Returns: array — filtered donations
  // ============================================
  function filterByStatus(raw, status) {
    if (!status) return raw;
    const statusMap = { active: 'posted', accepted: 'claimed', 'in-transit': 'in_transit' };
    const flaskStatus = statusMap[status] || status;
    return raw.filter(d => (d.status || '').toLowerCase() === flaskStatus);
  }

  // ============================================
  // RESPONSIBILITY: Apply client-side sorting to Flask data
  // Parameters: raw (array), sortBy (string)
  // Returns: array — sorted (mutates in place for perf)
  // ============================================
  function sortDonations(raw, sortBy) {
    if (sortBy === 'expiry') raw.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
    else if (sortBy === 'quantity') raw.sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
    else raw.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    return raw;
  }

  // ============================================
  // ORCHESTRATOR: Load and render donations
  // Coordinates: fetch → filter → sort → render
  // ============================================
  async function loadDonations() {
    const sortBy = document.getElementById('sort-select').value;
    const status = document.getElementById('status-filter').value;
    const container = document.getElementById('browse-list');
    const countEl = document.getElementById('results-count');

    let items = [];
    let source = '';

    // Step 1: Try Spring sorted endpoint first (required route)
    try {
      let url = `${javaURI}/api/donations/sorted?sortBy=${sortBy}`;
      if (status) url += `&status=${status}`;
      items = await springFetch(url);
      items = Array.isArray(items) ? items : [];
      source = 'spring';
    } catch (springErr) {
      console.log('Spring sorted unavailable, trying Flask…', springErr.message);
      // Step 2: Fall back to Flask with client-side sort/filter
      try {
        let raw = normalizeDonationList(await flaskFetch(`${pythonURI}/api/donations`));
        raw = filterByStatus(raw, status);
        items = sortDonations(raw, sortBy);
        source = 'flask';
      } catch (flaskErr) {
        countEl.textContent = '';
        container.innerHTML = errorPlaceholder('Neither Spring nor Flask backend could be reached.');
        return;
      }
    }

    // Step 3: Sort urgent items first
    items = sortByUrgency(items);

    countEl.innerHTML = `${sourceBadge(source)} <span class="ml-2">${items.length} donation${items.length !== 1 ? 's' : ''} found</span>`;

    if (items.length === 0) {
      container.innerHTML = emptyPlaceholder('No Donations Found', 'Try changing the filters.');
      return;
    }

    // Step 4: Render cards
    container.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">${items.map(renderBrowseCard).join('')}</div>`;
  }

  document.addEventListener('DOMContentLoaded', loadDonations);
  document.getElementById('sort-select').addEventListener('change', loadDonations);
  document.getElementById('status-filter').addEventListener('change', loadDonations);
</script>
