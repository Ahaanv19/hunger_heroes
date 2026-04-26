---
layout: base
title: Donate Hub
permalink: /donate/
search_exclude: true
menu: nav/home.html
---

<style>
  .hub { max-width: 1100px; margin: 0 auto; padding: 1.25rem 1rem 3rem; }
  .hub-head { text-align:center; margin-bottom:1rem; }
  .hub-title {
    font-size:2.25rem; font-weight:800; margin:0;
    background: linear-gradient(135deg,#22c55e,#3b82f6,#8b5cf6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hub-sub { color:#64748b; margin-top:.35rem; }

  .roles { display:flex; gap:.5rem; justify-content:center; margin: .75rem 0 1.25rem; flex-wrap:wrap; }
  .role-btn {
    padding:.55rem 1.1rem; border-radius:999px; border:1px solid rgba(100,116,139,.3);
    background:white; color:#0f172a; font-weight:700; font-size:.85rem; cursor:pointer;
  }
  html.dark .role-btn { background:rgba(30,41,59,.7); color:#e2e8f0; }
  .role-btn.active { background: linear-gradient(135deg,#22c55e,#3b82f6); color:white; border-color:transparent; }

  .game-frame { position:relative; border-radius:16px; overflow:hidden; border:2px solid rgba(100,116,139,.3); box-shadow:0 20px 60px rgba(0,0,0,.18); background:#0b1220; }
  #hubCanvas { display:block; width:100%; height:auto; background:#0b1220; }

  .game-hud { display:flex; flex-wrap:wrap; gap:.75rem; align-items:center; justify-content:space-between; padding:.7rem 1rem; background:rgba(15,23,42,.95); color:#e2e8f0; border-top:1px solid rgba(100,116,139,.3); font-size:.85rem; }
  .hud-step { font-weight:700; color:#fbbf24; }
  .hud-key { display:inline-block; padding:.1rem .45rem; border-radius:6px; background:#1e293b; border:1px solid #334155; color:#fbbf24; font-family: ui-monospace,Menlo,monospace; font-weight:700; margin:0 .15rem; }
  .hud-actions { display:flex; gap:.5rem; }
  .hud-btn { padding:.4rem .85rem; border-radius:8px; border:none; color:white; font-weight:700; font-size:.8rem; cursor:pointer; background:linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .hud-btn.alt { background:linear-gradient(135deg,#22c55e,#16a34a); }
  .hud-btn.ghost { background:transparent; border:1px solid #475569; color:#cbd5e1; }
  .hud-btn:disabled { opacity:.4; cursor:not-allowed; }

  .overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(2,6,23,.88); z-index:5; padding:1.5rem; text-align:center; color:#e2e8f0; }
  .overlay-card { max-width:540px; }
  .overlay-card h2 { font-size:1.5rem; margin:0 0 .5rem; background:linear-gradient(135deg,#22c55e,#3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .start-btn { margin-top:.85rem; padding:.65rem 1.4rem; border-radius:10px; border:none; background:linear-gradient(135deg,#22c55e,#16a34a); color:white; font-weight:800; cursor:pointer; }

  .tracker { display:grid; gap:.5rem; margin: 1.25rem 0 .25rem; }
  .tracker.r5 { grid-template-columns: repeat(5, 1fr); }
  .tracker.r4 { grid-template-columns: repeat(4, 1fr); }
  .step { position:relative; padding:.85rem .75rem; border-radius:12px; background:white; border:2px solid rgba(100,116,139,.2); text-align:center; transition: all .25s ease; cursor:pointer; }
  html.dark .step { background:rgba(30,41,59,.7); border-color:rgba(100,116,139,.35); }
  .step .num { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#e2e8f0; color:#475569; font-weight:800; font-size:.85rem; margin-bottom:.35rem; }
  html.dark .step .num { background:#334155; color:#cbd5e1; }
  .step .name { font-weight:700; font-size:.85rem; color:#0f172a; }
  html.dark .step .name { color:#e2e8f0; }
  .step .emoji { font-size:1.2rem; }
  .step.done { border-color:#22c55e; background:rgba(34,197,94,.08); }
  .step.done .num { background:#22c55e; color:white; }
  .step.active { border-color:#fbbf24; background:rgba(251,191,36,.1); box-shadow:0 0 0 4px rgba(251,191,36,.15); transform: translateY(-2px); }
  .step.active .num { background:#fbbf24; color:#1e293b; }

  .progress { height:8px; background:rgba(100,116,139,.2); border-radius:999px; overflow:hidden; margin:.75rem 0 1rem; }
  .progress > div { height:100%; background:linear-gradient(90deg,#22c55e,#3b82f6); width:0%; transition: width .4s ease; }

  .extras-title { margin: 1.5rem 0 .5rem; font-weight:800; color:#475569; font-size:.95rem; text-transform:uppercase; letter-spacing:.05em; }
  html.dark .extras-title { color:#94a3b8; }
  .extras { display:grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap:.6rem; }
  .extra { display:flex; gap:.6rem; align-items:center; padding:.65rem .8rem; border-radius:10px; text-decoration:none; background:white; border:1px solid rgba(100,116,139,.2); color:#0f172a; }
  html.dark .extra { background:rgba(30,41,59,.7); color:#e2e8f0; border-color:rgba(100,116,139,.35); }
  .extra:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.1); }
  .extra .ic { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; background:rgba(59,130,246,.12); font-size:1.1rem; }
  .extra .nm { font-weight:700; font-size:.85rem; }
  .extra .ds { font-size:.7rem; color:#64748b; }
  html.dark .extra .ds { color:#94a3b8; }

  .stats { margin-top:1.5rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:.55rem; }
  .stat-tile { background:white; border:1px solid rgba(100,116,139,.2); border-radius:10px; padding:.75rem; text-align:center; }
  html.dark .stat-tile { background:rgba(30,41,59,.7); border-color:rgba(100,116,139,.35); }
  .stat-num { font-size:1.35rem; font-weight:800; color:#2563eb; }
  .stat-lbl { font-size:.68rem; color:#64748b; text-transform:uppercase; letter-spacing:.05em; font-weight:700; }
</style>

<div class="hub">
  <div class="hub-head">
    <h1 class="hub-title">🎮 Donate Hub</h1>
    <p class="hub-sub">Pick your role, then follow the steps in order. Walk your hero in the game and press <span class="hud-key">E</span> to open each step.</p>
  </div>

  <div class="roles">
    <button class="role-btn active" data-role="donor">🥫 I'm Donating</button>
    <button class="role-btn" data-role="receiver">🤝 I Need Food</button>
    <button class="role-btn" data-role="volunteer">🚚 I'm Volunteering</button>
  </div>

  <div id="stepTracker" class="tracker r5"></div>
  <div class="progress"><div id="progressBar"></div></div>

  <div class="game-frame">
    <canvas id="hubCanvas" width="1080" height="320" tabindex="0" aria-label="Donate hub level"></canvas>
    <div class="overlay" id="helpOverlay">
      <div class="overlay-card">
        <h2>Welcome, Hunger Hero!</h2>
        <p>Pick your role above. Then walk your hero from <b>Step 1</b> to the finish, opening each step in order.</p>
        <div style="margin:.5rem 0; font-size:.9rem; color:#cbd5e1;">
          Move with <span class="hud-key">A</span><span class="hud-key">D</span> or <span class="hud-key">←</span><span class="hud-key">→</span>
          · Open step with <span class="hud-key">E</span> / <span class="hud-key">Enter</span>
        </div>
      </a>
      <!-- Leaderboard Card -->
      <a href="{{site.baseurl}}/donate/leaderboard"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 dark:from-yellow-400/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-accent-600 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Donor Leaderboard</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            See the top donors and stats for the Hunger Heroes community.
          </p>
          <span class="inline-flex items-center gap-1 text-accent-600 dark:text-accent-500 text-sm font-semibold group-hover:gap-2 transition-all">
            View Leaderboard
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Manage Donations Card -->
      <a href="{{site.baseurl}}/donate/manage"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-secondary-600 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Manage Donations</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Donors and volunteers: update status, mark delivered, or cancel donations.
          </p>
          <span class="inline-flex items-center gap-1 text-secondary-600 dark:text-secondary-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Manage
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Create Donation Card -->
      <a href="{{site.baseurl}}/donate/create"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-primary-500 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Create Donation</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Fill out food details, allergen info, and donor details. We'll generate a printable barcode label.
          </p>
          <span class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Get Started
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Scan / Verify Card -->
      <a href="{{site.baseurl}}/donate/scan"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
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
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-slate-600 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">My Donations</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            View your donation history, track accepted packages, and reprint labels for past donations.
          </p>
          <span class="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 text-sm font-semibold group-hover:gap-2 transition-all">
            View History
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Network Analytics Card -->
      <a href="{{site.baseurl}}/donate/network"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-secondary-500 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Donation Network</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Explore donor-receiver connections, community clusters, and network recommendations.
          </p>
          <span class="inline-flex items-center gap-1 text-secondary-600 dark:text-secondary-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Explore
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Categories Card -->
      <a href="{{site.baseurl}}/donate/categories"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-rose-500/5 dark:from-amber-500/10 dark:to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-accent-600 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Food Categories</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Browse the hierarchical food category tree and trace category paths.
          </p>
          <span class="inline-flex items-center gap-1 text-accent-600 dark:text-accent-500 text-sm font-semibold group-hover:gap-2 transition-all">
            Explore
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Browse & Sort Card -->
      <a href="{{site.baseurl}}/donate/browse"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-lime-500/5 dark:from-teal-500/10 dark:to-lime-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-primary-500 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Browse & Sort</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Browse all donations with sorting by expiry, date, or quantity, and filter by status.
          </p>
          <span class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Browse
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
      <!-- Hunger Heroes Game Card -->
      <a href="{{site.baseurl}}/donate/game"
        class="group relative bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 dark:from-green-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
            <span class="text-2xl">🎮</span>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Hunger Heroes Game</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Explore the food bank in a 2D game! Walk around, talk to NPCs, and learn how donations work.
          </p>
          <span class="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Play Now
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
    </div>
    <!-- How It Works -->
    <div class="bg-white dark:bg-slate-800/80 rounded-lg shadow-md border border-slate-200/50 dark:border-slate-700/50 p-8 sm:p-10 mb-12">
      <div class="text-center mb-8">
        <span class="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold mb-3">How It Works</span>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Barcode Label System</h2>
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
    </div>

      </div>
    </div>
  </div>

  <div class="extras-title">Optional Tools</div>
  <div class="extras" id="extrasList"></div>

  <div class="extras-title">Community Stats</div>
  <div class="stats">
    <div class="stat-tile"><div class="stat-num" id="stat-total">0</div><div class="stat-lbl">Total</div></div>
    <div class="stat-tile"><div class="stat-num" id="stat-posted">0</div><div class="stat-lbl">Posted</div></div>
    <div class="stat-tile"><div class="stat-num" id="stat-claimed">0</div><div class="stat-lbl">Claimed</div></div>
    <div class="stat-tile"><div class="stat-num" id="stat-in-transit">0</div><div class="stat-lbl">In Transit</div></div>
    <div class="stat-tile"><div class="stat-num" id="stat-delivered">0</div><div class="stat-lbl">Delivered</div></div>
    <div class="stat-tile"><div class="stat-num" id="stat-confirmed">0</div><div class="stat-lbl">Confirmed</div></div>
  </div>
</div>

<script>
(function () {
  const BASE = '{{site.baseurl}}';
  const FLOWS = {
    donor: [
      { id:'create',  num:1, name:'Create Donation', emoji:'📝', color:'#22c55e', href: BASE + '/donate/create' },
      { id:'barcode', num:2, name:'Print Label',     emoji:'🏷️', color:'#10b981', href: BASE + '/donate/barcode' },
      { id:'manage',  num:3, name:'Manage Status',   emoji:'✅', color:'#0ea5e9', href: BASE + '/donate/manage' },
      { id:'history', num:4, name:'View History',    emoji:'📜', color:'#64748b', href: BASE + '/donate/history' },
      { id:'leaderboard', num:5, name:'Leaderboard', emoji:'🏆', color:'#eab308', href: BASE + '/donate/leaderboard' }
    ],
    receiver: [
      { id:'match',     num:1, name:'Find Food',     emoji:'🤝', color:'#3b82f6', href: BASE + '/donate/match' },
      { id:'browse',    num:2, name:'Browse & Sort', emoji:'📚', color:'#06b6d4', href: BASE + '/donate/browse' },
      { id:'categories',num:3, name:'Pick Category', emoji:'🗂️', color:'#f59e0b', href: BASE + '/donate/categories' },
      { id:'scan',      num:4, name:'Scan & Verify', emoji:'📷', color:'#8b5cf6', href: BASE + '/donate/scan' }
    ],
    volunteer: [
      { id:'browse',  num:1, name:'See Open Donations', emoji:'📚', color:'#06b6d4', href: BASE + '/donate/browse' },
      { id:'scan',    num:2, name:'Scan Pickup',        emoji:'📷', color:'#8b5cf6', href: BASE + '/donate/scan' },
      { id:'manage',  num:3, name:'Update In-Transit',  emoji:'🚚', color:'#0ea5e9', href: BASE + '/donate/manage' },
      { id:'network', num:4, name:'View Network',       emoji:'🌐', color:'#6366f1', href: BASE + '/donate/network' }
    ]
  };
  const EXTRAS = [
    { name:'Hero Game',   emoji:'🎮', href: BASE + '/donate/game',        desc:'2D food bank adventure' },
    { name:'Network',     emoji:'🌐', href: BASE + '/donate/network',     desc:'Community connections' },
    { name:'Leaderboard', emoji:'🏆', href: BASE + '/donate/leaderboard', desc:'Top donors' },
    { name:'Categories',  emoji:'🗂️', href: BASE + '/donate/categories',  desc:'Browse food tree' }
  ];

  let role = 'donor', steps = FLOWS[role], currentIdx = 0, visited = new Set();
  const tracker = document.getElementById('stepTracker');
  const progress = document.getElementById('progressBar');
  const hudStep = document.getElementById('hudStep');
  const enterBtn = document.getElementById('enterBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const resetBtn = document.getElementById('resetBtn');
  const helpOverlay = document.getElementById('helpOverlay');
  const startBtn = document.getElementById('startBtn');
  const canvas = document.getElementById('hubCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const player = { x: 80, y: H - 80, r: 16, speed: 3.4 };
  const keys = Object.create(null);
  let running = false, started = false;

  function buildTracker() {
    tracker.className = 'tracker r' + steps.length;
    tracker.innerHTML = '';
    steps.forEach(function (s, i) {
      const el = document.createElement('div');
      el.className = 'step';
      el.innerHTML = '<div class="num">' + s.num + '</div><div class="emoji">' + s.emoji + '</div><div class="name">' + s.name + '</div>';
      el.addEventListener('click', function () { currentIdx = i; snapPlayerToStep(); refresh(); });
      tracker.appendChild(el);
    });
  }
  function stepPositions() {
    const margin = 110, span = W - margin * 2;
    return steps.map(function (s, i) {
      return Object.assign({}, s, { px: margin + (steps.length === 1 ? span/2 : (span * i)/(steps.length - 1)), py: H - 110 });
    });
  }
  function snapPlayerToStep() {
    const p = stepPositions()[currentIdx];
    if (p) player.x = p.px - 60;
  }
  function refresh() {
    Array.prototype.forEach.call(tracker.children, function (el, i) {
      el.classList.toggle('done', visited.has(steps[i].id));
      el.classList.toggle('active', i === currentIdx);
    });
    progress.style.width = Math.round((currentIdx / Math.max(1, steps.length - 1)) * 100) + '%';
    hudStep.textContent = 'Step ' + steps[currentIdx].num + ' — ' + steps[currentIdx].name;
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === steps.length - 1;
  }
  document.querySelectorAll('.role-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.role-btn').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      role = b.dataset.role; steps = FLOWS[role]; currentIdx = 0; visited = new Set();
      buildTracker(); snapPlayerToStep(); refresh();
    });
  });
  prevBtn.addEventListener('click', function () { if (currentIdx > 0) { currentIdx--; snapPlayerToStep(); refresh(); } });
  nextBtn.addEventListener('click', function () { if (currentIdx < steps.length - 1) { currentIdx++; snapPlayerToStep(); refresh(); } });
  resetBtn.addEventListener('click', function () { currentIdx = 0; visited = new Set(); snapPlayerToStep(); refresh(); });
  enterBtn.addEventListener('click', enterCurrent);
  function showHelp(show) { helpOverlay.style.display = show ? 'flex' : 'none'; running = !show; if (!show) canvas.focus(); }
  startBtn.addEventListener('click', function () { started = true; showHelp(false); });
  function enterCurrent() {
    const s = steps[currentIdx]; if (!s) return;
    visited.add(s.id);
    try { sessionStorage.setItem('hh_donate_flow', JSON.stringify({ role: role, idx: currentIdx, visited: Array.from(visited) })); } catch (_) {}
    window.location.href = s.href;
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem('hh_donate_flow') || 'null');
    if (saved && FLOWS[saved.role]) {
      role = saved.role; steps = FLOWS[role]; visited = new Set(saved.visited || []);
      const si = saved.idx || 0;
      currentIdx = Math.min(steps.length - 1, si + (visited.has(steps[si] && steps[si].id) ? 1 : 0));
      document.querySelectorAll('.role-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.role === role); });
    }
  } catch (_) {}

  window.addEventListener('keydown', function (e) {
    const k = e.key.toLowerCase();
    if (['arrowleft','arrowright','arrowup','arrowdown',' '].indexOf(k) !== -1) e.preventDefault();
    keys[k] = true;
    if ((k === 'e' || k === 'enter') && started && nearCurrent()) enterCurrent();
  });
  window.addEventListener('keyup', function (e) { keys[e.key.toLowerCase()] = false; });
  function nearCurrent() {
    const p = stepPositions()[currentIdx]; if (!p) return false;
    return Math.abs(player.x - p.px) < 50;
  }
  function update() {
    if (!running) return;
    let dx = 0;
    if (keys['a'] || keys['arrowleft']) dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;
    if (dx) player.x += dx * player.speed;
    player.x = Math.max(40, Math.min(W - 40, player.x));
    const positioned = stepPositions();
    let bestIdx = currentIdx, bestDist = Infinity;
    positioned.forEach(function (s, i) { const d = Math.abs(player.x - s.px); if (d < bestDist) { bestDist = d; bestIdx = i; } });
    if (bestIdx !== currentIdx && bestDist < 60) { currentIdx = bestIdx; refresh(); }
    enterBtn.disabled = !nearCurrent();
  }
  function drawBg() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0f172a'); g.addColorStop(1, '#020617');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(34,197,94,.18)'; ctx.fillRect(0, H - 60, W, 60);
    ctx.strokeStyle = 'rgba(148,163,184,.1)';
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, H - 60); ctx.lineTo(x, H); ctx.stroke(); }
  }
  function drawPath(positioned) {
    ctx.strokeStyle = 'rgba(251,191,36,.5)'; ctx.lineWidth = 4; ctx.setLineDash([12, 8]);
    ctx.beginPath();
    positioned.forEach(function (s, i) { const y = H - 80; if (i === 0) ctx.moveTo(s.px, y); else ctx.lineTo(s.px, y); });
    ctx.stroke(); ctx.setLineDash([]);
    if (currentIdx > 0) {
      ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 5; ctx.beginPath();
      ctx.moveTo(positioned[0].px, H - 80);
      for (let i = 1; i <= currentIdx; i++) ctx.lineTo(positioned[i].px, H - 80);
      ctx.stroke();
    }
  }
  function drawStation(s, i) {
    const isCurrent = i === currentIdx, isDone = visited.has(s.id);
    const x = s.px, y = H - 80;
    if (isCurrent) { ctx.beginPath(); ctx.arc(x, y, 50, 0, Math.PI * 2); ctx.fillStyle = 'rgba(251,191,36,.18)'; ctx.fill(); }
    ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fillStyle = isDone ? '#22c55e' : (isCurrent ? '#fbbf24' : s.color); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.stroke();
    ctx.fillStyle = isCurrent ? '#1e293b' : 'white';
    ctx.font = '800 16px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(isDone ? '✓' : s.num, x, y + 1);
    ctx.font = '24px system-ui, "Apple Color Emoji", "Segoe UI Emoji"';
    ctx.fillText(s.emoji, x, y - 50);
    ctx.font = '700 12px system-ui, sans-serif';
    ctx.fillStyle = isCurrent ? '#fbbf24' : '#e2e8f0';
    ctx.fillText('Step ' + s.num, x, y + 50);
    ctx.font = '600 11px system-ui, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(s.name, x, y + 66);
    if (isCurrent && nearCurrent()) {
      ctx.font = '700 11px system-ui, sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('Press E', x, y - 78);
    }
  }
  function drawPlayer() {
    const y = H - 80;
    ctx.beginPath(); ctx.ellipse(player.x, y + 18, 14, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fill();
    ctx.beginPath(); ctx.arc(player.x, y, player.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24'; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = '#92400e'; ctx.stroke();
    ctx.font = '16px system-ui, "Apple Color Emoji"';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🦸', player.x, y - 26);
  }
  function render() { const p = stepPositions(); drawBg(); drawPath(p); p.forEach(drawStation); drawPlayer(); }
  function loop() { update(); render(); requestAnimationFrame(loop); }

  canvas.addEventListener('click', function (e) {
    if (!started) { started = true; showHelp(false); }
    const rect = canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * (W / rect.width);
    const positioned = stepPositions();
    for (let i = 0; i < positioned.length; i++) {
      if (Math.abs(sx - positioned[i].px) < 36) {
        currentIdx = i; snapPlayerToStep(); refresh();
        if (nearCurrent()) enterCurrent();
        return;
      }
    player.x = Math.max(40, Math.min(W - 40, sx));
  });

  const extrasEl = document.getElementById('extrasList');
  EXTRAS.forEach(function (e) {
    const a = document.createElement('a');
    a.className = 'extra'; a.href = e.href;
    a.innerHTML = '<div class="ic">' + e.emoji + '</div><div><div class="nm">' + e.name + '</div><div class="ds">' + e.desc + '</div></div>';
    extrasEl.appendChild(a);
  });

  buildTracker(); snapPlayerToStep(); refresh(); render(); loop();

  function animate(id, target) {
    const el = document.getElementById(id); if (!el) return;
    if (!target) { el.textContent = '0'; return; }
    let cur = 0; const step = Math.max(1, Math.ceil(target / 30));
    const t = setInterval(function () { cur += step; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur.toLocaleString(); }, 35);
  }
  (async function loadStats() {
    try {
      const m = await import(BASE + '/assets/js/api/config.js');
      const pythonURI = m.pythonURI, javaURI = m.javaURI, fetchOptions = m.fetchOptions;
      try {
        const ctrl = new AbortController(); const t = setTimeout(function () { ctrl.abort(); }, 4000);
        const r = await fetch(javaURI + '/api/donations/stats', Object.assign({}, fetchOptions, { signal: ctrl.signal }));
        clearTimeout(t);
        if (r.ok) {
          const s = await r.json(); const bs = s.byStatus || s.by_status || {};
          animate('stat-total', s.total || 0);
          animate('stat-posted', bs.active || bs.posted || 0);
          animate('stat-claimed', bs.accepted || bs.claimed || 0);
          animate('stat-in-transit', bs['in-transit'] || bs.in_transit || 0);
          animate('stat-delivered', bs.delivered || 0);
          animate('stat-confirmed', bs.confirmed || 0);
          return;
        }
      } catch (_) {}
      try {
        const ctrl = new AbortController(); const t = setTimeout(function () { ctrl.abort(); }, 3000);
        const r = await fetch(pythonURI + '/api/donations/stats', Object.assign({}, fetchOptions, { signal: ctrl.signal }));
        clearTimeout(t);
        if (r.ok) {
          const s = await r.json();
          animate('stat-total', s.total || 0);
          animate('stat-posted', s.posted || 0);
          animate('stat-claimed', s.claimed || 0);
          animate('stat-in-transit', s.in_transit || 0);
          animate('stat-delivered', s.delivered || 0);
          animate('stat-confirmed', s.confirmed || 0);
          return;
        }
      } catch (_) {}
    } catch (_) {}
    const ds = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    const c = { posted:0, claimed:0, in_transit:0, delivered:0, confirmed:0 };
    ds.forEach(function (d) { if (c[d.status] !== undefined) c[d.status]++; });
    animate('stat-total', ds.length);
    animate('stat-posted', c.posted);
    animate('stat-claimed', c.claimed);
    animate('stat-in-transit', c.in_transit);
    animate('stat-delivered', c.delivered);
    animate('stat-confirmed', c.confirmed);
  })();
})();
</script>