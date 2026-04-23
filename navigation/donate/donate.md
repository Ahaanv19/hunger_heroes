---
layout: base
title: Donate Food
permalink: /donate/
search_exclude: true
menu: nav/home.html
---

<div class="donate-page">
  <div class="donate-page__container">
    <header class="donate-page__hero">
      <div class="donate-page__hero-icon">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
        </svg>
      </div>
      <h1 class="donate-page__title">
        Donate <span class="gradient-text">Food</span>
      </h1>
      <p class="donate-page__lead">
        Create labeled food packages with scannable barcodes — making it easy for shelters and food banks to identify and process your donation.
      </p>
    </header>

    <div class="donation-hub-grid">
      <a href="{{site.baseurl}}/donate/match" class="donation-hub-card donation-hub-card--match">
        <div class="donation-hub-card__overlay"></div>
        <div class="donation-hub-card__content">
          <div class="donation-hub-card__icon">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h3 class="donation-hub-card__title">Find Food Near You</h3>
          <p class="donation-hub-card__description">
            Smart matching for receivers: enter your zip and preferences to find the best food donations for you.
          </p>
          <span class="donation-hub-card__cta">
            Match Me
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <a href="{{site.baseurl}}/donate/manage" class="donation-hub-card donation-hub-card--manage">
        <div class="donation-hub-card__overlay"></div>
        <div class="donation-hub-card__content">
          <div class="donation-hub-card__icon">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="donation-hub-card__title">Manage Donations</h3>
          <p class="donation-hub-card__description">
            Donors and volunteers: update status, mark delivered, or cancel donations.
          </p>
          <span class="donation-hub-card__cta">
            Manage
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <a href="{{site.baseurl}}/donate/create" class="donation-hub-card donation-hub-card--create">
        <div class="donation-hub-card__overlay"></div>
        <div class="donation-hub-card__content">
          <div class="donation-hub-card__icon">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <h3 class="donation-hub-card__title">Create Donation</h3>
          <p class="donation-hub-card__description">
            Fill out food details, allergen info, and donor details. We'll generate a printable barcode label.
          </p>
          <span class="donation-hub-card__cta">
            Get Started
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <a href="{{site.baseurl}}/donate/scan" class="donation-hub-card donation-hub-card--scan">
        <div class="donation-hub-card__overlay"></div>
        <div class="donation-hub-card__content">
          <div class="donation-hub-card__icon">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
            </svg>
          </div>
          <h3 class="donation-hub-card__title">Scan & Verify</h3>
          <p class="donation-hub-card__description">
            Scan the QR code on any food package or enter the donation ID to see full details instantly.
          </p>
          <span class="donation-hub-card__cta">
            Open Scanner
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <a href="{{site.baseurl}}/donate/history" class="donation-hub-card donation-hub-card--history">
        <div class="donation-hub-card__overlay"></div>
        <div class="donation-hub-card__content">
          <div class="donation-hub-card__icon">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
          </div>
          <h3 class="donation-hub-card__title">My Donations</h3>
          <p class="donation-hub-card__description">
            View your donation history, track accepted packages, and reprint labels for past donations.
          </p>
          <span class="donation-hub-card__cta">
            View History
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>

      <a href="{{site.baseurl}}/donate/browse" class="donation-hub-card donation-hub-card--browse">
        <div class="donation-hub-card__overlay"></div>
        <div class="donation-hub-card__content">
          <div class="donation-hub-card__icon">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
            </svg>
          </div>
          <h3 class="donation-hub-card__title">Browse & Sort</h3>
          <p class="donation-hub-card__description">
            Browse all donations with sorting by expiry, date, or quantity, and filter by status.
          </p>
          <span class="donation-hub-card__cta">
            Browse
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
    </div>

    <section class="donate-page__panel donate-page__panel--padded donate-page__section">
      <div class="text-center mb-8">
        <span class="donate-page__section-title mb-3">How It Works</span>
        <h2 class="donate-page__section-heading">Barcode Label System</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-slate-700 dark:text-slate-300">1</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Fill Details</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Enter food name, category, allergens, expiry date & more</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-slate-700 dark:text-slate-300">2</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Generate Label</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">A unique QR code is created with all donation information</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-slate-700 dark:text-slate-300">3</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Print & Attach</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Print the label and stick it on your food package</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 mx-auto rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-slate-700 dark:text-slate-300">4</span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">Scan & Receive</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400">Receiver scans the code to see allergens, expiry, and more</p>
        </div>
      </div>
    </section>

    <div class="donation-stats-grid donation-stats-grid--four mb-6">
      <div class="donation-stat">
        <p id="stat-total" class="donation-stat__value text-primary-600 dark:text-primary-400">0</p>
        <p class="donation-stat__label">Total Donations</p>
      </div>
      <div class="donation-stat">
        <p id="stat-posted" class="donation-stat__value text-secondary-600 dark:text-secondary-400">0</p>
        <p class="donation-stat__label">Posted</p>
      </div>
      <div class="donation-stat">
        <p id="stat-in-transit" class="donation-stat__value text-slate-600 dark:text-slate-400">0</p>
        <p class="donation-stat__label">In Transit</p>
      </div>
      <div class="donation-stat">
        <p id="stat-delivered" class="donation-stat__value text-primary-600 dark:text-primary-400">0</p>
        <p class="donation-stat__label">Delivered</p>
      </div>
    </div>

    <div class="donation-stats-grid donation-stats-grid--three">
      <div class="donation-stat">
        <p id="stat-claimed" class="donation-stat__value text-accent-600 dark:text-accent-500">0</p>
        <p class="donation-stat__label">Claimed</p>
      </div>
      <div class="donation-stat">
        <p id="stat-confirmed" class="donation-stat__value text-primary-600 dark:text-primary-400">0</p>
        <p class="donation-stat__label">Confirmed</p>
      </div>
      <div class="donation-stat">
        <p id="stat-volunteers" class="donation-stat__value text-secondary-600 dark:text-secondary-400">0</p>
        <p class="donation-stat__label">Active Volunteers</p>
      </div>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  document.addEventListener('DOMContentLoaded', async () => {
    // 1. Try Spring stats endpoint first (uses required route)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${javaURI}/api/donations/stats`, {
        ...fetchOptions,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const stats = await res.json();
        const bs = stats.byStatus || stats.by_status || {};
        animateCounter('stat-total', stats.total || 0);
        animateCounter('stat-posted', bs.active || bs.posted || 0);
        animateCounter('stat-claimed', bs.accepted || bs.claimed || 0);
        animateCounter('stat-in-transit', bs['in-transit'] || bs.in_transit || 0);
        animateCounter('stat-delivered', bs.delivered || 0);
        animateCounter('stat-confirmed', bs.confirmed || 0);
        animateCounter('stat-volunteers', stats.expiringSoon || stats.expiring_soon || 0);
        return;
      }
    } catch(e) {
      console.log('Spring stats unavailable, trying Flask…');
    }

    // 2. Fallback: try Flask stats
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
      console.log('Flask stats also unavailable, using localStorage');
    }

    // 3. Last resort: localStorage
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
