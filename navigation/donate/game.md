---
layout: base
title: Hunger Heroes Game
permalink: /donate/game
search_exclude: true
menu: nav/home.html
---

<style>
  #gameArea {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 1rem;
    border: 2px solid rgba(100, 116, 139, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    background: #1e293b;
  }
  #gameContainer {
    position: relative;
    width: 100%;
    height: 500px;
  }
  #gameContainer canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
  #promptDropDown {
    position: absolute;
    z-index: 9999;
  }
  .game-controls-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: rgba(15, 23, 42, 0.9);
    border-top: 1px solid rgba(100, 116, 139, 0.3);
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .game-controls-bar button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    color: white;
  }
  .game-controls-bar button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .btn-primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
  .btn-success { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); }
  .btn-info { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
  .game-stats {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .game-stat {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 600;
  }
  .game-stat-value {
    color: #fbbf24;
    font-weight: 700;
  }
  .game-help-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.92);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 2rem;
  }
  .help-card {
    max-width: 500px;
    text-align: center;
  }
  .help-card h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #22c55e, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .help-card .controls-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin: 1.5rem 0;
    text-align: left;
  }
  .control-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(255,255,255,0.05);
    border-radius: 0.5rem;
    font-size: 0.85rem;
  }
  .control-item kbd {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 0.25rem;
    padding: 0.15rem 0.4rem;
    font-family: monospace;
    font-size: 0.75rem;
    min-width: 1.5rem;
    text-align: center;
  }
</style>

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
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
        🦸 Hunger Heroes <span class="gradient-text">Game</span>
      </h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">
        Explore the food bank, talk to NPCs, and learn how the donation system works!
      </p>
    </div>

    <!-- Game Area -->
    <div id="gameArea">
      <div id="gameContainer">
        <div id="promptDropDown" class="promptDropDown"></div>
        <canvas id="gameCanvas"></canvas>
      </div>

      <!-- Help Overlay (shown initially) -->
      <div id="helpOverlay" class="game-help-overlay">
        <div class="help-card">
          <h2>🦸 Hunger Heroes</h2>
          <p style="color: #94a3b8; margin-bottom: 0.5rem;">Walk around the food bank and interact with donation station NPCs!</p>
          <div class="controls-grid">
            <div class="control-item"><kbd>W</kbd> Move Up</div>
            <div class="control-item"><kbd>S</kbd> Move Down</div>
            <div class="control-item"><kbd>A</kbd> Move Left</div>
            <div class="control-item"><kbd>D</kbd> Move Right</div>
            <div class="control-item"><kbd>E</kbd> Interact</div>
            <div class="control-item"><kbd>Esc</kbd> Pause</div>
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 1.5rem;">
            Walk up to each NPC and press <kbd style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.25rem; padding: 0.1rem 0.3rem; font-family: monospace;">E</kbd> to hear about each donation feature.
          </p>
          <button onclick="startGame()" class="btn-success" style="padding: 0.75rem 2rem; font-size: 1rem; border-radius: 0.75rem;">
            🎮 Start Game
          </button>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="game-controls-bar">
        <div class="game-stats">
          <div class="game-stat">🦸 <span class="game-stat-value" id="stat-level">Food Bank</span></div>
          <div class="game-stat">💬 <span class="game-stat-value" id="stat-npcs">0/5 NPCs</span></div>
          <div class="game-stat">⏱️ <span class="game-stat-value" id="stat-time">0:00</span></div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn-info" onclick="showHelp()">❓ Help</button>
          <button class="btn-primary" onclick="submitGameScore()" id="submitScoreBtn">🏆 Submit Score</button>
          <button class="btn-primary" onclick="window.location.href='{{site.baseurl}}/donate/create'">📦 Create</button>
          <button class="btn-success" onclick="window.location.href='{{site.baseurl}}/donate/browse'">🔍 Browse</button>
          <button class="btn-danger" onclick="window.location.href='{{site.baseurl}}/donate/scan'">📱 Scan</button>
        </div>
      </div>
    </div>

    <!-- Info Cards Below Game -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5">
        <div class="text-2xl mb-2">🎮</div>
        <h3 class="font-bold text-slate-900 dark:text-white mb-1">Explore</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Walk around with WASD and discover all 5 donation stations in the food bank.</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5">
        <div class="text-2xl mb-2">💬</div>
        <h3 class="font-bold text-slate-900 dark:text-white mb-1">Interact</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Press E near NPCs to learn about creating, browsing, matching, delivering, and scanning donations.</p>
      </div>
      <div class="bg-white dark:bg-slate-800/80 rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 p-5">
        <div class="text-2xl mb-2">🏆</div>
        <h3 class="font-bold text-slate-900 dark:text-white mb-1">Powered by OCS</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Built with the Open Coding Society GameEngine v1.1 from the nightmare project directory.</p>
      </div>
    </div>

  </div>
</div>

<script type="module">
  // ============================================
  // GAME ENGINE IMPORTS — Open Coding Society GameEngine v1.1
  // Ported from nightmare repo: /nighthawk/nightmare/assets/js/GameEnginev1.1/
  // ============================================
  import { GameCore } from '{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/Game.js';
  import GameControl from '{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/GameControl.js';
  import GameLevelHungerHeroes from '{{site.baseurl}}/assets/js/projects/hunger-heroes-game/levels/GameLevelHungerHeroes.js';
  import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  let gameInstance = null;
  let gameStartTime = null;
  const visitedNpcs = new Set();
  let dialoguesCompleted = 0;

  // ============================================
  // Track NPC interactions (listen for dialogue events)
  // ============================================
  function setupNpcTracking() {
    // DialogueSystem elements are created once during NPC construction and toggled via display.
    // We poll for visibility changes on dialogue boxes to detect interactions.
    const npcIds = ['CreateStation', 'BrowseStation', 'MatchStation', 'DeliverStation', 'ScanStation'];
    const wasOpen = {};

    setInterval(() => {
      // Scan all dialogue boxes in the DOM
      const dialogueBoxes = document.querySelectorAll('[id^="custom-dialogue-box-"]');
      for (const box of dialogueBoxes) {
        const isVisible = box.style.display !== 'none' && box.style.display !== '';
        const boxId = box.id;

        if (isVisible && !wasOpen[boxId]) {
          // Dialogue just opened — count it
          dialoguesCompleted++;
          for (const npcId of npcIds) {
            if (boxId.includes(npcId)) {
              visitedNpcs.add(npcId);
              break;
            }
          }
          updateStats();
        }
        wasOpen[boxId] = isVisible;
      }
    }, 300);
  }

  function updateStats() {
    const npcsEl = document.getElementById('stat-npcs');
    if (npcsEl) npcsEl.textContent = `${visitedNpcs.size}/5 NPCs`;
  }

  // ============================================
  // Submit score to backend (dual-backend: Spring first, Flask fallback)
  // ============================================
  async function submitScore() {
    if (!gameStartTime) return;
    const elapsed = Math.round((Date.now() - gameStartTime) / 1000);
    const playerName = localStorage.getItem('username') || 'HungerHero';

    const scorePayload = {
      playerName: playerName,
      npcsVisited: visitedNpcs.size,
      dialoguesCompleted: dialoguesCompleted,
      timePlayedSeconds: elapsed,
      levelId: 'hunger-heroes-foodbank',
      // Spring expects 'details' (JSON string), Flask expects 'payload' (JSON object) — send both
      details: JSON.stringify({ npcsFound: Array.from(visitedNpcs) }),
      payload: { npcsFound: Array.from(visitedNpcs) },
    };

    // Spring-first, Flask-fallback (matching Hunger Heroes dual-backend pattern)
    let submitted = false;
    try {
      const springRes = await fetch(`${javaURI}/api/hunger-heroes/leaderboard`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify(scorePayload),
      });
      if (springRes.ok) {
        const result = await springRes.json();
        console.log('✅ Score submitted to Spring:', result.score || result);
        submitted = true;
      }
    } catch (e) {
      console.log('Spring score submit unavailable:', e.message);
    }

    if (!submitted) {
      try {
        const flaskRes = await fetch(`${pythonURI}/api/hunger-heroes/leaderboard`, {
          ...fetchOptions,
          method: 'POST',
          body: JSON.stringify(scorePayload),
        });
        if (flaskRes.ok) {
          const result = await flaskRes.json();
          console.log('✅ Score submitted to Flask:', result);
          submitted = true;
        }
      } catch (e) {
        console.log('Flask score submit also unavailable:', e.message);
      }
    }

    return submitted;
  }

  // ============================================
  // Load and display leaderboard
  // ============================================
  async function loadLeaderboard() {
    let scores = [];
    // Try Spring first (use query params — Spring security passes /leaderboard but blocks /leaderboard/top/N)
    try {
      const res = await fetch(`${javaURI}/api/hunger-heroes/leaderboard?limit=10`, fetchOptions);
      if (res.ok) scores = await res.json();
    } catch (e) {
      console.log('Spring leaderboard unavailable, trying Flask…');
    }
    // Fallback to Flask
    if (scores.length === 0) {
      try {
        const res = await fetch(`${pythonURI}/api/hunger-heroes/leaderboard?limit=10`, fetchOptions);
        if (res.ok) scores = await res.json();
      } catch (e) {
        console.log('Flask leaderboard also unavailable');
      }
    }
    return scores;
  }

  // ============================================
  // Start the game — called from the overlay button
  // ============================================
  window.startGame = function () {
    // Hide the help overlay
    const overlay = document.getElementById('helpOverlay');
    if (overlay) overlay.style.display = 'none';

    // Only start once
    if (gameInstance) return;

    // Start tracking
    gameStartTime = Date.now();
    visitedNpcs.clear();
    dialoguesCompleted = 0;
    updateStats();
    setupNpcTracking();

    const environment = {
      path: '{{site.baseurl}}',
      pythonURI: pythonURI,
      javaURI: javaURI,
      fetchOptions: fetchOptions,
      gameContainer: document.getElementById('gameContainer'),
      gameCanvas: document.getElementById('gameCanvas'),
      gameLevelClasses: [GameLevelHungerHeroes],
      // Disable features that require additional files we don't have
      disablePauseMenu: true,
      disableContainerAdjustment: true,
    };

    gameInstance = GameCore.main(environment, GameControl);
    console.log('🦸 Hunger Heroes Game started!');

    // Start the elapsed-time display
    setInterval(() => {
      if (!gameStartTime) return;
      const elapsed = Math.round((Date.now() - gameStartTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = String(elapsed % 60).padStart(2, '0');
      const timeEl = document.getElementById('stat-time');
      if (timeEl) timeEl.textContent = `${mins}:${secs}`;
    }, 1000);
  };

  // ============================================
  // Show help overlay
  // ============================================
  window.showHelp = function () {
    const overlay = document.getElementById('helpOverlay');
    if (overlay) overlay.style.display = 'flex';
  };

  // ============================================
  // Submit score button handler
  // ============================================
  window.submitGameScore = async function () {
    if (!gameStartTime) {
      alert('Start the game first before submitting a score!');
      return;
    }
    const btn = document.getElementById('submitScoreBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ Submitting…';
    }
    const success = await submitScore();
    if (btn) {
      btn.textContent = success ? '✅ Score Saved!' : '⚠️ Backend Offline';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = '🏆 Submit Score'; }, 3000);
    }
    if (success) {
      const elapsed = Math.round((Date.now() - gameStartTime) / 1000);
      const npcPoints = visitedNpcs.size * 100;
      const dialoguePoints = dialoguesCompleted * 25;
      const timeBonus = Math.max(0, 300 - elapsed);
      const totalScore = npcPoints + dialoguePoints + timeBonus;
      alert(`🏆 Score submitted!\n\nNPCs visited: ${visitedNpcs.size}/5 (${npcPoints} pts)\nDialogues: ${dialoguesCompleted} (${dialoguePoints} pts)\nTime bonus: ${timeBonus} pts\n\nTotal: ${totalScore} points`);
    }
  };
</script>
