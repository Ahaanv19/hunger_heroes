---
layout: base
title: Donation Tracker Game
permalink: /donate/tracker
search_exclude: true
menu: nav/home.html
---

<style>
  /* ── Game Container ── */
  #game-wrapper {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,.25);
    background: #0f172a;
  }
  #game-container {
    position: relative;
    width: 100%;
    height: 420px;
    overflow: hidden;
  }
  #game-container canvas {
    image-rendering: pixelated;
  }

  /* ── HUD overlay ── */
  #game-hud {
    position: absolute;
    top: 10px;
    left: 12px;
    right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    pointer-events: none;
    z-index: 200;
  }
  .hud-box {
    background: rgba(15,23,42,0.82);
    backdrop-filter: blur(6px);
    color: #e2e8f0;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-family: 'Inter', system-ui, sans-serif;
    pointer-events: auto;
    border: 1px solid rgba(255,255,255,.08);
  }
  .hud-box strong { color: #38bdf8; }
  #hud-controls span {
    display: inline-block;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 4px;
    padding: 1px 7px;
    margin: 0 2px;
    font-family: monospace;
    font-size: 12px;
  }

  /* ── Status step bar ── */
  #step-bar {
    display: flex;
    gap: 0;
    background: #1e293b;
    border-top: 1px solid #334155;
    padding: 0;
  }
  .step-pill {
    flex: 1;
    text-align: center;
    padding: 10px 4px;
    font-size: 12px;
    font-family: 'Inter', system-ui, sans-serif;
    color: #64748b;
    background: #1e293b;
    transition: all .3s ease;
    border-bottom: 3px solid transparent;
    cursor: default;
    position: relative;
  }
  .step-pill.active {
    color: #f8fafc;
    background: #0f172a;
    border-bottom-color: #38bdf8;
  }
  .step-pill.completed {
    color: #4ade80;
    background: #0f172a;
    border-bottom-color: #4ade80;
  }
  .step-pill .step-emoji { font-size: 20px; display: block; margin-bottom: 2px; }
  .step-pill .step-label { display: block; font-weight: 600; }

  /* ── Detail panel ── */
  #detail-panel {
    background: #1e293b;
    padding: 16px 20px;
    font-family: 'Inter', system-ui, sans-serif;
    color: #cbd5e1;
    font-size: 14px;
    min-height: 80px;
    border-top: 1px solid #334155;
  }
  #detail-panel h3 { color: #f1f5f9; margin: 0 0 6px; font-size: 16px; }
  #detail-panel p { margin: 0 0 10px; }
  #action-btn {
    display: none;
    padding: 8px 24px;
    border-radius: 8px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(135deg,#3b82f6,#2563eb);
    transition: transform .15s ease, box-shadow .15s ease;
  }
  #action-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(59,130,246,.45); }
  #action-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; box-shadow: none; }

  /* ── Toast ── */
  .game-toast {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    background: #0f172a;
    border: 1px solid #334155;
    color: #e2e8f0;
    padding: 12px 20px;
    border-radius: 10px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,.4);
    animation: slideIn .3s ease;
  }
  @keyframes slideIn { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
</style>

<!-- ── Back link ── -->
<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <a href="{{site.baseurl}}/donate/" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Donate
    </a>

    <!-- Header -->
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md mb-3">
        <span class="text-2xl">🎮</span>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-1">Donation Tracker</h1>
      <p class="text-slate-500 dark:text-slate-400">Walk your hero to each station and advance the donation!</p>
      <p class="text-xs text-slate-400 mt-1" id="donation-id-display"></p>
    </div>

    <!-- Game Area -->
    <div id="game-wrapper">
      <div id="game-container"></div>

      <!-- HUD overlay -->
      <div id="game-hud">
        <div class="hud-box" id="hud-controls">
          Move: <span>W</span><span>A</span><span>S</span><span>D</span> &nbsp; Interact: <span>E</span>
        </div>
        <div class="hud-box" id="hud-status">
          Status: <strong id="hud-status-text">—</strong>
        </div>
      </div>

      <!-- Step bar -->
      <div id="step-bar"></div>

      <!-- Detail panel -->
      <div id="detail-panel">
        <h3 id="detail-title">Walk to a station to begin!</h3>
        <p id="detail-desc">Use <strong>WASD</strong> to move your hero and <strong>E</strong> to interact with each building.</p>
        <button id="action-btn">Advance Status</button>
      </div>
    </div>

    <!-- Donation loader (if no id in URL) -->
    <div id="no-id-card" class="mt-8 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-center" style="display:none;">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Load a Donation</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Enter a Donation ID to track it in the game:</p>
      <div class="flex gap-2 justify-center">
        <input id="manual-id" type="text" placeholder="Donation ID" class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none w-56">
        <button id="load-btn" class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors">Load</button>
      </div>
    </div>
  </div>
</div>

<script type="module">
  import GameCore from '{{site.baseurl}}/assets/js/GameEngine/GameCore.js';
  import DonationTrackerLevel, { STEPS } from '{{site.baseurl}}/assets/js/GameEngine/DonationTrackerLevel.js';
  import { patchStatus, setLoading, dualFetch } from '{{site.baseurl}}/assets/js/api/donationApi.js';
  import { javaURI, pythonURI } from '{{site.baseurl}}/assets/js/api/config.js';

  /* ─── status maps (same as scan.md) ─── */
  const FROM_BACKEND = { active: 'posted', accepted: 'claimed', 'in-transit': 'in_transit', delivered: 'delivered', confirmed: 'confirmed', posted: 'posted', claimed: 'claimed', in_transit: 'in_transit' };
  const TO_BACKEND   = { posted: 'active', claimed: 'accepted', in_transit: 'in-transit', delivered: 'delivered', confirmed: 'confirmed' };

  /* ─── DOM refs ─── */
  const container    = document.getElementById('game-container');
  const stepBar      = document.getElementById('step-bar');
  const detailTitle  = document.getElementById('detail-title');
  const detailDesc   = document.getElementById('detail-desc');
  const actionBtn    = document.getElementById('action-btn');
  const hudStatus    = document.getElementById('hud-status-text');
  const idDisplay    = document.getElementById('donation-id-display');
  const noIdCard     = document.getElementById('no-id-card');

  /* ─── state ─── */
  let donationId    = null;
  let donationData  = null;
  let currentStep   = 0; // which step the donation is actually at
  let game          = null;

  /* ─── build step bar pills ─── */
  STEPS.forEach((s, i) => {
    const pill = document.createElement('div');
    pill.className = 'step-pill';
    pill.id = `step-${i}`;
    pill.innerHTML = `<span class="step-emoji">${s.emoji}</span><span class="step-label">${s.label}</span>`;
    stepBar.appendChild(pill);
  });

  function updateStepBar(activeIdx) {
    STEPS.forEach((_, i) => {
      const el = document.getElementById(`step-${i}`);
      el.classList.remove('active', 'completed');
      if (i < activeIdx) el.classList.add('completed');
      else if (i === activeIdx) el.classList.add('active');
    });
    hudStatus.textContent = STEPS[activeIdx]?.label || '—';
  }

  /* ─── toast helper ─── */
  function toast(msg, duration = 3000) {
    const t = document.createElement('div');
    t.className = 'game-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 400); }, duration);
  }

  /* ─── fetch donation from backend ─── */
  async function loadDonation(id) {
    try {
      const { data } = await dualFetch(
        `${javaURI}/api/donations/${encodeURIComponent(id)}`,
        `${pythonURI}/api/donations/${encodeURIComponent(id)}`
      );
      donationData = data;
      const rawStatus = data.status || data.donation_status || 'posted';
      const normStatus = FROM_BACKEND[rawStatus] || rawStatus;
      currentStep = STEPS.findIndex(s => s.key === normStatus);
      if (currentStep < 0) currentStep = 0;
      idDisplay.textContent = `Donation: ${id}`;
      updateStepBar(currentStep);
      toast(`Loaded donation — ${STEPS[currentStep].label}`);
    } catch (e) {
      console.warn('Could not load donation:', e);
      toast('⚠️ Could not load donation from backend. Playing in demo mode.');
    }
  }

  /* ─── advance status on backend ─── */
  async function advanceStatus() {
    const nextIdx = currentStep + 1;
    if (nextIdx >= STEPS.length) { toast('Donation already confirmed!'); return; }
    const nextStep = STEPS[nextIdx];
    actionBtn.disabled = true;
    actionBtn.textContent = 'Updating…';
    if (donationId) {
      try {
        await patchStatus(donationId, { status: TO_BACKEND[nextStep.key] || nextStep.key });
        currentStep = nextIdx;
        updateStepBar(currentStep);
        toast(`✅ Status → ${nextStep.label}`);
      } catch (e) {
        toast('⚠️ Backend update failed — status advanced locally.');
        currentStep = nextIdx;
        updateStepBar(currentStep);
      }
    } else {
      // demo mode
      currentStep = nextIdx;
      updateStepBar(currentStep);
      toast(`${nextStep.emoji} Status → ${nextStep.label} (demo mode)`);
    }
    actionBtn.disabled = false;
    actionBtn.textContent = 'Advance Status';
    showStepDetail(currentStep);
  }

  /* ─── show detail panel for a step ─── */
  function showStepDetail(idx) {
    const s = STEPS[idx];
    if (!s) return;
    detailTitle.innerHTML = `${s.emoji} ${s.label}`;
    detailDesc.textContent = s.desc;
    // show advance button only if at current step and not yet confirmed
    if (idx === currentStep && idx < STEPS.length - 1) {
      actionBtn.style.display = 'inline-block';
      actionBtn.textContent = `Advance to ${STEPS[idx + 1].label}`;
    } else if (idx < currentStep) {
      actionBtn.style.display = 'none';
      detailDesc.textContent = '✔ This step has been completed.';
    } else if (idx === STEPS.length - 1 && idx === currentStep) {
      actionBtn.style.display = 'none';
      detailDesc.textContent = '🎉 Donation journey complete! Thank you, hero!';
    } else {
      actionBtn.style.display = 'none';
    }
  }

  actionBtn.addEventListener('click', advanceStatus);

  /* ─── create a patched level class ─── */
  function makeTrackerLevel() {
    // We return a class so GameControl can `new` it
    return class extends DonationTrackerLevel {
      constructor(gc) {
        super(gc);
        this.onStepReached = (idx, step) => {
          showStepDetail(idx);
          updateStepBar(Math.max(idx, currentStep));
        };
      }
    };
  }

  /* ─── Boot ─── */
  (async () => {
    // Check URL params for donation id
    const params = new URLSearchParams(window.location.search);
    donationId = params.get('id') || params.get('donationId') || null;

    if (donationId) {
      await loadDonation(donationId);
    } else {
      noIdCard.style.display = 'block';
    }

    // Wire manual loader
    document.getElementById('load-btn')?.addEventListener('click', async () => {
      const val = document.getElementById('manual-id').value.trim();
      if (!val) return;
      donationId = val;
      noIdCard.style.display = 'none';
      await loadDonation(val);
    });

    updateStepBar(currentStep);

    // Start game
    const TrackerLevel = makeTrackerLevel();
    game = new GameCore(container, [TrackerLevel]);
    game.start();
  })();
</script>
