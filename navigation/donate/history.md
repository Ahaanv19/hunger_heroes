---
layout: base
title: My Donations
permalink: /donate/history
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
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
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">My Donations</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Track your food donations and reprint labels</p>
      </div>
      <a href="{{site.baseurl}}/donate/create"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        New Donation
      </a>
    </div>
    <!-- Filter Tabs -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      <button onclick="filterDonations('all')" class="filter-btn active px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="all">
        All
      </button>
      <button onclick="filterDonations('posted')" class="filter-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="posted">
        Posted
      </button>
      <button onclick="filterDonations('claimed')" class="filter-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="claimed">
        Claimed
      </button>
      <button onclick="filterDonations('in_transit')" class="filter-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="in_transit">
        In Transit
      </button>
      <button onclick="filterDonations('delivered')" class="filter-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="delivered">
        Delivered
      </button>
      <button onclick="filterDonations('confirmed')" class="filter-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="confirmed">
        Confirmed
      </button>
      <button onclick="filterDonations('expired')" class="filter-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all" data-filter="expired">
        Expired
      </button>
    </div>
    <!-- Donations List -->
    <div id="donations-list" class="space-y-4">
      <!-- Loading -->
      <div id="loading-state" class="text-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
        <p class="text-slate-400">Loading donations...</p>
      </div>
    </div>
    <!-- Empty State -->
    <div id="empty-state" class="hidden text-center py-16">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
        <svg class="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">No Donations Yet</h3>
      <p class="text-slate-500 dark:text-slate-400 mb-6">Create your first food donation and generate a barcode label!</p>
      <a href="{{site.baseurl}}/donate/create" class="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-lg font-semibold text-sm">
        Create Your First Donation
      </a>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  const CATEGORY_MAP = {
    'canned': '🥫', 'fresh-produce': '🥬', 'dairy': '🧀', 'bakery': '🍞',
    'meat-protein': '🥩', 'grains': '🌾', 'beverages': '🥤', 'frozen': '❄️',
    'snacks': '🍪', 'baby-food': '🍼', 'prepared-meals': '🍱', 'other': '📦'
  };

  let allDonations = [];

  document.addEventListener('DOMContentLoaded', async () => {
    let backendDonations = [];

    // Try backend with a 3-second timeout so the page isn't stuck
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`${pythonURI}/api/donations?mine=true`, {
        ...fetchOptions,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        // Backend may return an array or an object with a donations key
        backendDonations = Array.isArray(data) ? data : (Array.isArray(data.donations) ? data.donations : []);
      }
    } catch(e) {
      console.log('Backend unavailable, using localStorage only');
    }

    // Always load localStorage donations
    const localDonations = JSON.parse(localStorage.getItem('hh_donations') || '[]');

    // Merge: backend wins on duplicates (by id), then append local-only entries
    const backendIds = new Set(backendDonations.map(d => d.id));
    const localOnly = localDonations.filter(d => !backendIds.has(d.id));
    allDonations = [...backendDonations, ...localOnly].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    renderDonations(allDonations);
  });

  function getStatusInfo(d) {
    const expiry = new Date(d.expiry_date);
    const daysLeft = Math.ceil((expiry - new Date()) / (1000*60*60*24));
    const isExpired = daysLeft < 0;
    const status = isExpired && d.status === 'posted' ? 'expired' : (d.status || 'posted');

    const map = {
      'posted':    { badge: 'Posted',     color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      'claimed':   { badge: 'Claimed',    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      'in_transit': { badge: 'In Transit', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      'delivered': { badge: 'Delivered',   color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
      'confirmed': { badge: 'Confirmed',   color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      'expired':   { badge: 'Expired',     color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
    };
    return { ...map[status] || map['posted'], status, daysLeft, isExpired };
  }

  function renderDonations(donations) {
    const container = document.getElementById('donations-list');
    document.getElementById('loading-state').classList.add('hidden');

    if (!donations.length) {
      document.getElementById('empty-state').classList.remove('hidden');
      return;
    }

    container.innerHTML = donations.map(d => {
      const expiry = new Date(d.expiry_date);
      const { badge: statusBadge, color: statusColor, status, daysLeft, isExpired } = getStatusInfo(d);

      // Volunteer info
      const volunteerHTML = d.volunteer_name
        ? `<span class="text-xs text-slate-400"> ${d.volunteer_name}</span>`
        : '';

      // Archive button for confirmed/delivered
      const archiveHTML = (status === 'confirmed' || status === 'delivered')
        ? `<button onclick="archiveDonation('${d.id}')" class="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline ml-2">Archive</button>`
        : '';

      return `
        <div class="donation-card bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 p-5 transition-all duration-200" data-status="${status}" id="card-${d.id}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
              ${CATEGORY_MAP[d.category] || '📦'}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-3 mb-1">
                <h3 class="font-bold text-slate-900 dark:text-white truncate">${d.food_name}</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor} whitespace-nowrap flex-shrink-0">${statusBadge}</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">
                ${d.quantity} ${d.unit} · Expires ${expiry.toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})}
                ${!isExpired && daysLeft <= 7 ? `<span class="text-amber-500 font-semibold">(${daysLeft}d left)</span>` : ''}
                ${isExpired ? '<span class="text-red-500 font-semibold">(expired)</span>' : ''}
              </p>
              <div class="flex items-center flex-wrap gap-2">
                <span class="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">${d.id}</span>
                ${volunteerHTML}
                <a href="{{site.baseurl}}/donate/barcode?id=${encodeURIComponent(d.id)}" 
                  class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                  onclick="sessionStorage.setItem('hh_current_donation', JSON.stringify(${JSON.stringify(d).replace(/"/g, '&quot;')}))">
                  View Label →
                </a>
                ${archiveHTML}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.archiveDonation = async function(id) {
    if (!confirm('Archive this donation? It will be permanently removed.')) return;
    const card = document.getElementById(`card-${id}`);
    if (card) card.style.opacity = '0.5';

    try {
      const res = await fetch(`${pythonURI}/api/donations/${encodeURIComponent(id)}`, {
        ...fetchOptions,
        method: 'DELETE'
      });
      if (res.ok) {
        if (card) card.remove();
        allDonations = allDonations.filter(d => d.id !== id);
        if (!allDonations.length) document.getElementById('empty-state').classList.remove('hidden');
        return;
      }
    } catch(e) {}

    // Fallback: remove from localStorage
    const local = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    localStorage.setItem('hh_donations', JSON.stringify(local.filter(d => d.id !== id)));
    allDonations = allDonations.filter(d => d.id !== id);
    if (card) card.remove();
    if (!allDonations.length) document.getElementById('empty-state').classList.remove('hidden');
  };

  window.filterDonations = function(filter) {
    // Update active tab
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active', 'bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-700', 'dark:text-primary-400');
      btn.classList.add('text-slate-500', 'dark:text-slate-400', 'bg-slate-100', 'dark:bg-slate-700');
    });
    const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
    activeBtn.classList.add('bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-700', 'dark:text-primary-400');
    activeBtn.classList.remove('text-slate-500', 'dark:text-slate-400', 'bg-slate-100', 'dark:bg-slate-700');

    // Filter cards
    document.querySelectorAll('.donation-card').forEach(card => {
      if (filter === 'all' || card.dataset.status === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };
</script>
