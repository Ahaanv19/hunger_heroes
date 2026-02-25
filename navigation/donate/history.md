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
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-medium hover:shadow-large transition-all whitespace-nowrap">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        New Donation
      </a>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button onclick="filterDonations('all')" class="filter-btn active px-4 py-2 rounded-xl text-sm font-semibold transition-all" data-filter="all">
        All
      </button>
      <button onclick="filterDonations('active')" class="filter-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all" data-filter="active">
        🟢 Active
      </button>
      <button onclick="filterDonations('accepted')" class="filter-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all" data-filter="accepted">
        ✅ Accepted
      </button>
      <button onclick="filterDonations('expired')" class="filter-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all" data-filter="expired">
        ⏰ Expired
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
      <a href="{{site.baseurl}}/donate/create" class="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm">
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
    // Try backend first
    try {
      const res = await fetch(`${pythonURI}/api/donation`, fetchOptions);
      if (res.ok) {
        allDonations = await res.json();
        renderDonations(allDonations);
        return;
      }
    } catch(e) {}

    // Fallback: localStorage
    allDonations = JSON.parse(localStorage.getItem('hh_donations') || '[]').reverse();
    renderDonations(allDonations);
  });

  function renderDonations(donations) {
    const container = document.getElementById('donations-list');
    document.getElementById('loading-state').classList.add('hidden');

    if (!donations.length) {
      document.getElementById('empty-state').classList.remove('hidden');
      return;
    }

    container.innerHTML = donations.map(d => {
      const expiry = new Date(d.expiry_date);
      const daysLeft = Math.ceil((expiry - new Date()) / (1000*60*60*24));
      const isExpired = daysLeft < 0;
      const isAccepted = d.status === 'accepted';
      
      let statusBadge, statusColor;
      if (isExpired) {
        statusBadge = '⏰ Expired';
        statusColor = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      } else if (isAccepted) {
        statusBadge = '✅ Accepted';
        statusColor = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      } else {
        statusBadge = '🟢 Active';
        statusColor = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      }

      const statusAttr = isExpired ? 'expired' : isAccepted ? 'accepted' : 'active';

      return `
        <div class="donation-card bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft hover:shadow-medium border border-slate-200/50 dark:border-slate-700/50 p-5 transition-all duration-200" data-status="${statusAttr}">
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
                ${daysLeft >= 0 && daysLeft <= 7 ? `<span class="text-amber-500 font-semibold">(${daysLeft}d left)</span>` : ''}
                ${isExpired ? '<span class="text-red-500 font-semibold">(expired)</span>' : ''}
              </p>
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">${d.id}</span>
                <a href="{{site.baseurl}}/donate/barcode?id=${encodeURIComponent(d.id)}" 
                  class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                  onclick="sessionStorage.setItem('hh_current_donation', JSON.stringify(${JSON.stringify(d).replace(/"/g, '&quot;')}))">
                  View Label →
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

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

<style>
  .filter-btn.active {
    background: rgb(219 234 254);
    color: rgb(29 78 216);
  }
  .dark .filter-btn.active {
    background: rgba(29, 78, 216, 0.2);
    color: rgb(96 165 250);
  }
  .filter-btn:not(.active) {
    background: rgb(241 245 249);
    color: rgb(100 116 139);
  }
  .dark .filter-btn:not(.active) {
    background: rgb(51 65 85);
    color: rgb(148 163 184);
  }
</style>
