---
layout: base
title: Food Categories
permalink: /donate/categories
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
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Food Categories</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">Explore the full food category hierarchy</p>
    </div>

    <!-- Find Path -->
    <div class="glass rounded-3xl shadow-large border border-slate-200/50 dark:border-slate-700/50 p-6 sm:p-8 mb-8">
      <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-3">🔍 Trace Category Path</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Type a category name to see its full path from leaf to root.</p>
      <form id="path-form" class="flex flex-col sm:flex-row gap-3 mb-4">
        <input id="path-input" type="text" required placeholder="e.g. dairy"
          class="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
        <button type="submit" id="path-btn"
          class="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl font-semibold shadow-medium hover:shadow-large transition-all whitespace-nowrap">
          Trace Path
        </button>
      </form>
      <div id="path-result"></div>
    </div>

    <!-- Category Tree -->
    <div class="glass rounded-3xl shadow-large border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">🌳 Category Tree</h2>
      </div>
      <div id="tree-area" class="p-6">
        <div class="text-center py-8 text-slate-400">
          <svg class="w-7 h-7 animate-spin mx-auto mb-2 text-primary-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Loading categories…
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
    CATEGORY_EMOJIS, sourceBadge, errorPlaceholder,
    normalizeDonationList, getErrorMessage
  } from '{{site.baseurl}}/assets/js/api/donationApi.js';

  // ============================================
  // RESPONSIBILITY: Recursively render tree using <details>
  // Parameters: node (object) — { name, children }
  // Returns: string — HTML
  // ============================================
  function renderTree(node) {
    const emoji = CATEGORY_EMOJIS[node.name] || '📁';
    const children = node.children || [];

    if (children.length === 0) {
      return `<li class="py-1.5 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm text-slate-700 dark:text-slate-300">${emoji} ${node.name}</li>`;
    }

    return `
      <li>
        <details open class="group">
          <summary class="cursor-pointer py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-400 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            ${emoji} ${node.name}
            <span class="text-xs font-normal text-slate-400">(${children.length})</span>
          </summary>
          <ul class="ml-6 border-l-2 border-slate-200 dark:border-slate-700 pl-4 mt-1 space-y-0.5">
            ${children.map(c => renderTree(c)).join('')}
          </ul>
        </details>
      </li>`;
  }

  // ============================================
  // WORKER: Fetch category tree from Spring
  // Returns: tree object
  // ============================================
  async function fetchSpringTree() {
    return springFetch(`${javaURI}/api/donations/categories/tree`);
  }

  // ============================================
  // WORKER: Build category tree from Flask donations (fallback)
  // Returns: tree object
  // ============================================
  async function buildFlaskTree() {
    const raw = await flaskFetch(`${pythonURI}/api/donations`);
    const donations = normalizeDonationList(raw);

    const categories = {};
    donations.forEach(d => {
      const cat = d.category || 'other';
      if (!categories[cat]) categories[cat] = new Set();
      if (d.food_name) categories[cat].add(d.food_name);
    });

    return {
      name: 'All Food',
      children: Object.entries(categories).map(([cat, foods]) => ({
        name: cat,
        children: [...foods].map(f => ({ name: f, children: [] }))
      }))
    };
  }

  // ============================================
  // WORKER: Fetch category path (Spring → Flask fallback)
  // Parameters: cat (string)
  // Returns: array
  // ============================================
  async function fetchCategoryPath(cat) {
    // Step 1: Try Spring
    try {
      return await springFetch(`${javaURI}/api/donations/categories/path?category=${encodeURIComponent(cat)}`);
    } catch (springErr) {
      console.log('Spring path unavailable, building from Flask…', springErr.message);
    }
    // Step 2: Flask fallback — build a simple path from the tree
    try {
      const tree = await buildFlaskTree();
      const path = [];
      function findPath(node, target) {
        path.push(node.name);
        if (node.name.toLowerCase() === target.toLowerCase()) return true;
        for (const child of (node.children || [])) {
          if (findPath(child, target)) return true;
        }
        path.pop();
        return false;
      }
      if (findPath(tree, cat)) return path;
      return [cat]; // category not found, return as-is
    } catch (flaskErr) {
      throw flaskErr;
    }
  }

  // ============================================
  // RESPONSIBILITY: Render category path breadcrumbs
  // Parameters: items (array), container (Element)
  // ============================================
  function renderPath(items, container) {
    if (items.length === 0) {
      container.innerHTML = '<p class="text-slate-500 dark:text-slate-400 text-sm">Category not found.</p>';
      return;
    }
    container.innerHTML = `
      <div class="flex items-center flex-wrap gap-2">
        ${items.map((p, i) => {
          const emoji = CATEGORY_EMOJIS[p] || '📁';
          const isLast = i === items.length - 1;
          return `<span class="px-3 py-1.5 rounded-lg text-sm font-semibold ${isLast ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}">${emoji} ${p}</span>${!isLast ? '<svg class="w-4 h-4 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>' : ''}`;
        }).join('')}
      </div>`;
  }

  // ============================================
  // ORCHESTRATOR: Load tree on page load — Spring → Flask fallback
  // ============================================
  document.addEventListener('DOMContentLoaded', async () => {
    const area = document.getElementById('tree-area');
    let tree = null;
    let source = '';

    // Step 1: Try Spring
    try {
      tree = await fetchSpringTree();
      source = 'spring';
    } catch (springErr) {
      console.log('Spring categories unavailable, building from Flask…', springErr.message);
      // Step 2: Flask fallback
      try {
        tree = await buildFlaskTree();
        source = 'flask';
      } catch (flaskErr) {
        console.log('Flask also unavailable');
      }
    }

    if (!tree || !tree.children) {
      area.innerHTML = errorPlaceholder('Could not load categories from either backend.');
      return;
    }

    // Step 3: Render
    area.innerHTML = `<div class="mb-4">${sourceBadge(source)}</div>` + `<ul class="space-y-1">${renderTree(tree)}</ul>`;
  });

  // ============================================
  // ORCHESTRATOR: Handle path trace form
  // ============================================
  document.getElementById('path-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cat = document.getElementById('path-input').value.trim();
    if (!cat) return;

    const btn = document.getElementById('path-btn');
    const result = document.getElementById('path-result');
    btn.disabled = true;
    btn.textContent = 'Tracing…';

    fetchCategoryPath(cat)
      .then(path => {
        const items = Array.isArray(path) ? path : [];
        renderPath(items, result);
      })
      .catch(err => {
        result.innerHTML = `<p class="text-red-600 dark:text-red-400 text-sm">Error: ${getErrorMessage(err)}</p>`;
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Trace Path';
      });
  });
</script>
