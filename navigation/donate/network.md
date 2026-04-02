---
layout: base
title: Donation Network
permalink: /donate/network
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
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Donation Network</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">Explore donor-receiver connections and community insights</p>
    </div>

    <!-- Network Summary -->
    <div class="grid grid-cols-3 gap-4 mb-10">
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="net-nodes" class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Users</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="net-edges" class="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Connections</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5 text-center">
        <p id="net-communities" class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">—</p>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Communities</p>
      </div>
    </div>

    <!-- Communities & Influence — side by side -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

      <!-- Communities -->
      <div class="glass rounded-3xl shadow-large border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">🏘️ Communities</h2>
        </div>
        <div id="communities-area" class="p-6">
          <div class="text-center py-8 text-slate-400">
            <svg class="w-7 h-7 animate-spin mx-auto mb-2 text-primary-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Loading…
          </div>
        </div>
      </div>

      <!-- Influence Ranking -->
      <div class="glass rounded-3xl shadow-large border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">⭐ Influence Ranking</h2>
        </div>
        <div id="influence-area" class="divide-y divide-slate-100 dark:divide-slate-700/50">
          <div class="p-6 text-center text-slate-400">Loading…</div>
        </div>
      </div>
    </div>

    <!-- Recommendation Search -->
    <div class="glass rounded-3xl shadow-large border border-slate-200/50 dark:border-slate-700/50 p-6 sm:p-8">
      <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">🔍 Find Connections</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Enter a user's email to discover nearby connections within 2 hops in the donation network.</p>
      <form id="rec-form" class="flex flex-col sm:flex-row gap-3 mb-6">
        <input id="rec-email" type="email" required placeholder="alice@example.com"
          class="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
        <button type="submit" id="rec-btn"
          class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-medium hover:shadow-large transition-all whitespace-nowrap">
          Find Connections
        </button>
      </form>
      <div id="rec-results"></div>
    </div>

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
    showToast, errorPlaceholder, sourceBadge, getErrorMessage,
    normalizeDonationList
  } from '{{site.baseurl}}/assets/js/api/donationApi.js';

  // ============================================
  // CONFIGURATION: Community color palette
  // ============================================
  const COMMUNITY_COLORS = [
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  ];

  // ============================================
  // WORKER: Fetch graph data from Spring
  // Returns: graphData object
  // ============================================
  async function fetchSpringGraph() {
    return springFetch(`${javaURI}/api/donations/graph`);
  }

  // ============================================
  // WORKER: Build graph data from Flask donations (fallback)
  // Returns: graphData object
  // ============================================
  async function buildFlaskGraph() {
    const raw = await flaskFetch(`${pythonURI}/api/donations`);
    const donations = normalizeDonationList(raw);

    const donors = new Set();
    const volunteers = new Set();
    const edges = [];
    donations.forEach(d => {
      const donor = d.donor_name || d.donorName || 'anonymous';
      donors.add(donor);
      if (d.volunteer_name) {
        volunteers.add(d.volunteer_name);
        edges.push([donor, d.volunteer_name]);
      }
    });

    const allUsers = [...new Set([...donors, ...volunteers])];

    // Build simple communities (donors and their connected volunteers)
    const communities = [];
    const assigned = new Set();
    allUsers.forEach(u => {
      if (assigned.has(u)) return;
      const group = [u];
      assigned.add(u);
      edges.forEach(([a, b]) => {
        if (a === u && !assigned.has(b)) { group.push(b); assigned.add(b); }
        if (b === u && !assigned.has(a)) { group.push(a); assigned.add(a); }
      });
      communities.push(group);
    });

    // Build influence ranking (count connections)
    const influence = {};
    allUsers.forEach(u => { influence[u] = 0; });
    edges.forEach(([a, b]) => { influence[a] = (influence[a] || 0) + 1; influence[b] = (influence[b] || 0) + 1; });

    return {
      summary: { nodes: allUsers.length, edges: edges.length, communities: communities.length },
      communities: communities.filter(g => g.length > 1),
      influenceRanking: influence
    };
  }

  // ============================================
  // RESPONSIBILITY: Render summary counters
  // Parameters: summary (object)
  // ============================================
  function renderSummary(summary) {
    document.getElementById('net-nodes').textContent = summary.nodes ?? '—';
    document.getElementById('net-edges').textContent = summary.edges ?? '—';
    document.getElementById('net-communities').textContent = summary.communities ?? '—';
  }

  // ============================================
  // RESPONSIBILITY: Render communities list
  // Parameters: communities (array), source (string), container (Element)
  // ============================================
  function renderCommunities(communities, source, container) {
    const badge = `<div class="mb-4">${sourceBadge(source)}</div>`;
    if (communities.length === 0) {
      container.innerHTML = badge + '<p class="text-slate-400 text-sm text-center">No communities detected yet.</p>';
      return;
    }
    container.innerHTML = badge + communities.map((group, i) => {
      const color = COMMUNITY_COLORS[i % COMMUNITY_COLORS.length];
      return `
        <div class="mb-4">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Community ${i + 1} — ${group.length} member${group.length !== 1 ? 's' : ''}</p>
          <div class="flex flex-wrap gap-2">
            ${group.map(email => `<span class="px-3 py-1 rounded-lg text-xs font-semibold ${color}">${email}</span>`).join('')}
          </div>
        </div>`;
    }).join('');
  }

  // ============================================
  // RESPONSIBILITY: Render influence ranking
  // Parameters: influence (object), container (Element)
  // ============================================
  function renderInfluence(influence, container) {
    const entries = Object.entries(influence).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
      container.innerHTML = '<div class="p-6 text-center text-slate-400 text-sm">No influence data yet.</div>';
      return;
    }
    container.innerHTML = entries.map(([email, score], i) => `
      <div class="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
        <span class="w-8 text-center font-bold text-slate-400">${i + 1}</span>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">${email.charAt(0).toUpperCase()}</div>
        <div class="flex-1 min-w-0"><p class="font-medium text-slate-900 dark:text-white truncate text-sm">${email}</p></div>
        <span class="text-sm font-bold gradient-text">${score}</span>
      </div>
    `).join('');
  }

  // ============================================
  // WORKER: Fetch recommendations (Spring → Flask fallback)
  // Parameters: email (string)
  // Returns: array
  // ============================================
  async function fetchRecommendations(email) {
    // Step 1: Try Spring graph recommendations
    try {
      return await springFetch(`${javaURI}/api/donations/graph/recommendations?email=${encodeURIComponent(email)}&maxDepth=2`);
    } catch (springErr) {
      console.log('Spring recommendations unavailable, building from Flask…', springErr.message);
    }
    // Step 2: Flask fallback — find connected donors/volunteers
    try {
      const raw = await flaskFetch(`${pythonURI}/api/donations`);
      const donations = normalizeDonationList(raw);
      const connected = new Set();
      donations.forEach(d => {
        const donor = (d.donor_email || d.donor_name || '').toLowerCase();
        const vol = (d.volunteer_name || '').toLowerCase();
        const target = email.toLowerCase();
        if (donor === target && vol) connected.add(vol);
        if (vol === target && donor) connected.add(donor);
      });
      return [...connected];
    } catch (flaskErr) {
      throw flaskErr;
    }
  }

  // ============================================
  // RESPONSIBILITY: Render recommendation results
  // Parameters: list (array), email (string), container (Element)
  // ============================================
  function renderRecommendations(list, email, container) {
    if (list.length === 0) {
      container.innerHTML = `
        <div class="text-center py-6">
          <p class="text-slate-500 dark:text-slate-400 text-sm">No connections found within 2 hops for <strong>${email}</strong>.</p>
        </div>`;
      return;
    }
    container.innerHTML = `
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">${list.length} connection${list.length !== 1 ? 's' : ''} found for <strong class="text-slate-700 dark:text-slate-300">${email}</strong>:</p>
      <div class="flex flex-wrap gap-2">
        ${list.map(u => `<span class="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm font-medium">${u}</span>`).join('')}
      </div>`;
  }

  // ============================================
  // ORCHESTRATOR: Load graph on page load — Spring → Flask fallback
  // ============================================
  document.addEventListener('DOMContentLoaded', async () => {
    const commArea = document.getElementById('communities-area');
    const infArea = document.getElementById('influence-area');
    let graphData = null;
    let source = '';

    // Step 1: Try Spring graph endpoint
    try {
      graphData = await fetchSpringGraph();
      source = 'spring';
    } catch (springErr) {
      console.log('Spring graph unavailable, building from Flask…', springErr.message);
      // Step 2: Fallback — build graph from Flask
      try {
        graphData = await buildFlaskGraph();
        source = 'flask';
      } catch (flaskErr) {
        console.log('Flask also unavailable');
      }
    }

    if (!graphData) {
      commArea.innerHTML = errorPlaceholder('Neither Spring nor Flask backend could be reached.');
      infArea.innerHTML = errorPlaceholder('Server unavailable');
      return;
    }

    // Step 3: Render all sections
    try {
      renderSummary(graphData.summary || {});
      renderCommunities(graphData.communities || [], source, commArea);
      renderInfluence(graphData.influenceRanking || {}, infArea);
    } catch (err) {
      commArea.innerHTML = errorPlaceholder(err.message);
      infArea.innerHTML = errorPlaceholder(err.message);
    }
  });

  // ============================================
  // ORCHESTRATOR: Handle recommendation search form
  // ============================================
  document.getElementById('rec-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('rec-email').value.trim();
    if (!email) return;

    const btn = document.getElementById('rec-btn');
    const results = document.getElementById('rec-results');
    btn.disabled = true;
    btn.textContent = 'Searching…';

    fetchRecommendations(email)
      .then(recs => {
        const list = Array.isArray(recs) ? recs : [];
        renderRecommendations(list, email, results);
      })
      .catch(err => {
        results.innerHTML = `<p class="text-red-600 dark:text-red-400 text-sm">Error: ${getErrorMessage(err)}</p>`;
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Find Connections';
      });
  });
</script>
