---
layout: base
title: Donate Food
permalink: /donate/
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">

    <!-- Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl mb-6">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
        </svg>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
        Donate <span class="gradient-text">Food</span>
      </h1>
      <p class="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        Create labeled food packages with scannable barcodes — making it easy for shelters and food banks to identify and process your donation.
      </p>
    </div>

    <!-- Feature Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

      <!-- Create Donation Card -->
      <a href="{{site.baseurl}}/donate/create"
        class="group relative bg-white dark:bg-slate-800/80 rounded-3xl shadow-soft hover:shadow-large border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Create Donation</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Fill out food details, allergen info, and donor details. We'll generate a printable barcode label.
          </p>
          <span class="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Get Started
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <!-- Scan / Verify Card -->
      <a href="{{site.baseurl}}/donate/scan"
        class="group relative bg-white dark:bg-slate-800/80 rounded-3xl shadow-soft hover:shadow-large border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-primary-500/10 dark:to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Scan & Verify</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Scan the QR code on any food package or enter the donation ID to see full details instantly.
          </p>
          <span class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Open Scanner
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <!-- My Donations Card -->
      <a href="{{site.baseurl}}/donate/history"
        class="group relative bg-white dark:bg-slate-800/80 rounded-3xl shadow-soft hover:shadow-large border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">My Donations</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            View your donation history, track accepted packages, and reprint labels for past donations.
          </p>
          <span class="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-semibold group-hover:gap-2 transition-all">
            View History
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
    </div>

    <!-- How It Works -->
    <div class="bg-white dark:bg-slate-800/80 rounded-3xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-8 sm:p-10 mb-12">
      <div class="text-center mb-8">
        <span class="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-3">How It Works</span>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Barcode Label System</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-green-600 dark:text-green-400">1</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Fill Details</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Enter food name, category, allergens, expiry date & more</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Generate Label</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">A unique QR code is created with all donation information</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Print & Attach</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Print the label and stick it on your food package</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-amber-600 dark:text-amber-400">4</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Scan & Receive</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Receiver scans the code to see allergens, expiry, and more</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-total" class="text-3xl font-bold gradient-text mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Donations</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-posted" class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Posted</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-in-transit" class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Transit</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-delivered" class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Delivered</p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-claimed" class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Claimed</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-confirmed" class="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirmed</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="stat-volunteers" class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">0</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Volunteers</p>
      </div>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  document.addEventListener('DOMContentLoaded', async () => {
    // Try backend stats with a 3-second timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`${pythonURI}/api/donations/stats`, {
        ...fetchOptions,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const stats = await res.json();
        animateCounter('stat-total', stats.total || 0);
        animateCounter('stat-posted', stats.posted || 0);
        animateCounter('stat-claimed', stats.claimed || 0);
        animateCounter('stat-in-transit', stats.in_transit || 0);
        animateCounter('stat-delivered', stats.delivered || 0);
        animateCounter('stat-confirmed', stats.confirmed || 0);
        animateCounter('stat-volunteers', stats.volunteers_active || 0);
        return;
      }
    } catch(e) {
      console.log('Backend unavailable, using localStorage stats');
    }

    // Fallback: localStorage
    const donations = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    const counts = { posted: 0, claimed: 0, in_transit: 0, delivered: 0, confirmed: 0 };
    donations.forEach(d => { if (counts[d.status] !== undefined) counts[d.status]++; });
    animateCounter('stat-total', donations.length);
    animateCounter('stat-posted', counts.posted);
    animateCounter('stat-claimed', counts.claimed);
    animateCounter('stat-in-transit', counts.in_transit);
    animateCounter('stat-delivered', counts.delivered);
    animateCounter('stat-confirmed', counts.confirmed);
    animateCounter('stat-volunteers', 0);
  });

  function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    if (target === 0) { el.textContent = '0'; return; }
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 40);
  }
</script>
