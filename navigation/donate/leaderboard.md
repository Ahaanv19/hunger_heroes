---
layout: base
title: Donor Leaderboard
permalink: /donate/leaderboard
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
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Donor Leaderboard</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">Celebrating our most generous community members</p>
    </div>

    <!-- Stats Summary -->
    <div id="stats-area" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="lb-total" class="text-3xl font-bold gradient-text mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Donations</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="lb-delivered" class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Delivered</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="lb-active" class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="lb-donors" class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiring Soon</p>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div class="glass rounded-3xl shadow-large border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">🏆 Top Donors</h2>
      </div>
      <div id="leaderboard-body" class="divide-y divide-slate-100 dark:divide-slate-700/50">
        <!-- Loading skeleton -->
        <div class="p-6 text-center text-slate-400 dark:text-slate-500">
          <svg class="w-8 h-8 animate-spin mx-auto mb-3 text-primary-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading leaderboard…
        </div>
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
    sourceBadge, normalizeDonationList, errorPlaceholder
  } from '{{site.baseurl}}/assets/js/api/donationApi.js';

  // ============================================
  // RESPONSIBILITY: Animate a counter from 0 to target
  // Parameters: id (string), target (number)
  // ============================================
  function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!target && target !== 0) { el.textContent = '—'; return; }
    if (target === 0) { el.textContent = '0'; return; }
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 40);
  }

  // ============================================
  // RESPONSIBILITY: Generate rank badge HTML
  // Parameters: i (number) — zero-indexed rank
  // Returns: string — HTML
  // ============================================
  function rankBadge(i) {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">${i + 1}</span>`;
  }

  // ============================================
  // RESPONSIBILITY: Fetch stats from backends
  // Returns: { data, source } or null
  // ============================================
  async function fetchStats() {
    try {
      const data = await springFetch(`${javaURI}/api/donations/stats`);
      // Normalize: Spring may return byStatus or by_status
      if (data.byStatus && !data.by_status) data.by_status = data.byStatus;
      return { data, source: 'spring' };
    } catch (e) {
      console.log('Spring stats unavailable');
    }
    try {
      const data = await flaskFetch(`${pythonURI}/api/donations/stats`);
      return { data, source: 'flask' };
    } catch (e) {
      console.log('Flask stats unavailable');
    }
    return null;
  }

  // ============================================
  // RESPONSIBILITY: Fetch leaderboard data
  // Returns: { data, source } or null
  // ============================================
  async function fetchLeaderboard() {
    try {
      let data = await springFetch(`${javaURI}/api/donations/leaderboard?limit=10`);
      // Normalize camelCase keys from Spring
      if (Array.isArray(data)) {
        data = data.map(d => ({
          ...d,
          donor_name: d.donor_name || d.donorName,
          total_donations: d.total_donations || d.totalDonations || d.count || 0,
          email: d.email || d.donor_email || d.donorEmail,
        }));
      }
      return { data, source: 'spring' };
    } catch (e) {
      console.log('Spring leaderboard unavailable');
    }
    // Fallback: build from Flask donations
    try {
      const raw = normalizeDonationList(await flaskFetch(`${pythonURI}/api/donations`));
      const counts = {};
      raw.forEach(d => {
        const name = d.donor_name || 'Anonymous';
        counts[name] = (counts[name] || 0) + 1;
      });
      return { data: counts, source: 'flask' };
    } catch (e) {
      console.log('Flask donations unavailable');
    }
    return null;
  }

  // ============================================
  // RESPONSIBILITY: Render stats counters
  // Parameters: statsData (object or null)
  // ============================================
  function renderStats(statsData) {
    if (!statsData) {
      ['lb-total', 'lb-delivered', 'lb-active', 'lb-donors'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '—';
      });
      return;
    }
    const s = statsData;
    const bs = s.byStatus || s.by_status || {};
    animateCounter('lb-total', s.total || 0);
    animateCounter('lb-delivered', bs.delivered || s.delivered || 0);
    animateCounter('lb-active', bs.active || bs.posted || s.posted || 0);
    animateCounter('lb-donors', s.expiringSoon || s.expiring_soon || 0);
  }

  // ============================================
  // RESPONSIBILITY: Render leaderboard rows
  // Parameters: raw (array|object), body (Element), source (string)
  // ============================================
  function renderLeaderboard(raw, body, source) {
    let items;
    if (Array.isArray(raw)) {
      items = raw;
    } else if (typeof raw === 'object' && raw !== null) {
      items = Object.entries(raw)
        .map(([email, count]) => ({ email, count }))
        .sort((a, b) => b.count - a.count);
    } else {
      items = [];
    }

    if (items.length === 0) {
      body.innerHTML = `<div class="p-12 text-center"><div class="text-5xl mb-3">📊</div><p class="text-slate-500 dark:text-slate-400 font-medium">No donors yet — be the first!</p></div>`;
      return;
    }

    const maxCount = Math.max(...items.map(d => d.count || d.total_donations || 0));
    const badge = `<div class="px-6 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">${sourceBadge(source)}</div>`;

    body.innerHTML = badge + items.map((d, i) => {
      const name = d.email || d.donor_name || d.donorName || 'Anonymous';
      const count = d.count || d.total_donations || d.totalDonations || 0;
      const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
      return `
      <div class="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
        <div class="text-2xl w-10 text-center flex-shrink-0">${rankBadge(i)}</div>
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          ${name.charAt(0).toUpperCase()}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-slate-900 dark:text-white truncate">${name}</p>
          <div class="mt-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-lg font-bold gradient-text">${count}</p>
          <p class="text-xs text-slate-400">${count !== 1 ? 'donations' : 'donation'}</p>
        </div>
      </div>`;
    }).join('');
  }

  // ============================================
  // ORCHESTRATOR: Load stats + leaderboard in parallel, render
  // ============================================
  document.addEventListener('DOMContentLoaded', async () => {
    const body = document.getElementById('leaderboard-body');

    // Fetch stats and leaderboard in parallel (no dependency between them)
    const [statsResult, lbResult] = await Promise.allSettled([
      fetchStats(),
      fetchLeaderboard()
    ]);

    // Render stats
    const statsData = statsResult.status === 'fulfilled' ? statsResult.value : null;
    renderStats(statsData?.data || null);

    // Render leaderboard
    const lbData = lbResult.status === 'fulfilled' ? lbResult.value : null;
    if (lbData) {
      renderLeaderboard(lbData.data, body, lbData.source);
    } else {
      body.innerHTML = errorPlaceholder('Neither Spring nor Flask backend could be reached.');
    }
  });
</script>
