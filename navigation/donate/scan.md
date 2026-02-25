---
layout: base
title: Scan Donation
permalink: /donate/scan
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-2xl mx-auto">

    <!-- Back -->
    <a href="{{site.baseurl}}/" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Home
    </a>

    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Scan Donation Label</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">Scan a QR code or enter the donation ID to view package details</p>
    </div>

    <!-- SCAN OPTIONS -->
    <div class="glass rounded-3xl shadow-large p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 mb-8">
      
      <!-- Tab Switcher -->
      <div class="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-6">
        <button id="tab-camera" onclick="switchTab('camera')"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Camera Scan
        </button>
        <button id="tab-manual" onclick="switchTab('manual')"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-500 dark:text-slate-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
          Enter ID
        </button>
      </div>

      <!-- Camera Scanner -->
      <div id="panel-camera">
        <div class="relative rounded-2xl overflow-hidden bg-black aspect-video mb-4">
          <video id="scanner-video" class="w-full h-full object-cover" playsinline></video>
          <!-- Scanner overlay -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-56 h-56 border-2 border-white/60 rounded-3xl relative">
              <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-2xl"></div>
              <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-2xl"></div>
              <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-2xl"></div>
              <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-2xl"></div>
              <!-- Scanning line animation -->
              <div class="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan"></div>
            </div>
          </div>
          <!-- Status overlay -->
          <div id="camera-status" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
            <svg class="w-12 h-12 text-slate-400 mb-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p class="text-slate-300 text-sm font-medium">Click below to start camera</p>
          </div>
        </div>
        <button id="start-camera-btn" onclick="startCamera()"
          class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm shadow-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          Start Camera
        </button>
        <p class="text-xs text-slate-400 dark:text-slate-500 text-center mt-3">Requires camera permission. Point camera at the QR code on the food label.</p>
      </div>

      <!-- Manual ID Entry -->
      <div id="panel-manual" class="hidden">
        <div class="mb-4">
          <label for="donation-id-input" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Donation ID
          </label>
          <div class="flex gap-3">
            <input type="text" id="donation-id-input" placeholder="e.g. HH-M3X7K9-AB2F"
              class="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
            <button onclick="lookupById()"
              class="px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm shadow-medium whitespace-nowrap">
              Look Up
            </button>
          </div>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-500">Enter the ID printed on the barcode label (top right corner)</p>
      </div>
    </div>

    <!-- RESULTS AREA -->
    <div id="scan-result" class="hidden">
      
      <!-- Success State -->
      <div id="result-success" class="hidden">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Donation Found!</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Here are the package details</p>
          </div>
        </div>

        <!-- Result Card -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-large border border-slate-200 dark:border-slate-700 overflow-hidden">
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
            <div class="flex items-center justify-between">
              <h3 id="result-food-name" class="text-xl font-bold">---</h3>
              <span id="result-id" class="font-mono text-sm bg-white/20 px-3 py-1 rounded-lg">---</span>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <!-- Tags row -->
            <div class="flex flex-wrap gap-2">
              <span id="result-category" class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">---</span>
              <span id="result-quantity" class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">---</span>
              <span id="result-storage" class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold">---</span>
            </div>

            <!-- Expiry warning -->
            <div id="result-expiry-block" class="flex items-center gap-3 p-4 rounded-xl">
              <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="text-sm font-semibold">Expires: <span id="result-expiry">---</span></p>
                <p id="result-expiry-status" class="text-xs">---</p>
              </div>
            </div>

            <!-- Details grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Donated By</p>
                <p id="result-donor" class="text-sm font-bold text-slate-900 dark:text-white">---</p>
              </div>
              <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact</p>
                <p id="result-email" class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">---</p>
              </div>
              <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Zip Code</p>
                <p id="result-zip" class="text-sm font-bold text-slate-900 dark:text-white">---</p>
              </div>
              <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Created</p>
                <p id="result-date" class="text-sm font-medium text-slate-700 dark:text-slate-300">---</p>
              </div>
            </div>

            <!-- Allergens -->
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">⚠️ Allergens</p>
              <div id="result-allergens" class="flex flex-wrap gap-2">---</div>
            </div>

            <!-- Dietary -->
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dietary Info</p>
              <div id="result-dietary" class="flex flex-wrap gap-2">---</div>
            </div>

            <!-- Description -->
            <div id="result-desc-block" class="hidden">
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p id="result-description" class="text-sm text-slate-600 dark:text-slate-400">---</p>
            </div>

            <!-- Special Instructions -->
            <div id="result-instructions-block" class="hidden p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <p class="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">📋 Special Instructions</p>
              <p id="result-instructions" class="text-sm text-amber-800 dark:text-amber-300">---</p>
            </div>
          </div>
        </div>

        <!-- Actions after scan -->
        <div class="flex flex-col sm:flex-row gap-3 mt-6">
          <button onclick="resetScanner()"
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl font-semibold text-sm transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Scan Another
          </button>
          <button id="accept-btn" onclick="acceptDonation()"
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-medium transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Accept Donation
          </button>
          <button id="deliver-btn" onclick="markAsDelivered()"
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-medium transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Mark as Delivered
          </button>
        </div>

        <!-- Delivered confirmation (hidden by default) -->
        <div id="delivered-confirmation" class="hidden mt-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-3">
              <svg class="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-1">Marked as Delivered!</h3>
            <p class="text-sm text-blue-700 dark:text-blue-400">This donation has been delivered successfully. It will be automatically removed from the system in 24 hours.</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div id="result-error" class="hidden text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Donation Not Found</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">The ID or QR code didn't match any donation in our system.</p>
        <button onclick="resetScanner()"
          class="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm">
          Try Again
        </button>
      </div>
    </div>

  </div>
</div>

<!-- jsQR for camera scanning -->
<script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js"></script>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  const CATEGORY_MAP = {
    'canned': '🥫 Canned Goods', 'fresh-produce': '🥬 Fresh Produce', 'dairy': '🧀 Dairy',
    'bakery': '🍞 Bakery', 'meat-protein': '🥩 Meat/Protein', 'grains': '🌾 Grains',
    'beverages': '🥤 Beverages', 'frozen': '❄️ Frozen', 'snacks': '🍪 Snacks',
    'baby-food': '🍼 Baby Food', 'prepared-meals': '🍱 Prepared Meals', 'other': '📦 Other'
  };
  const STORAGE_MAP = {
    'room-temp': '🌡️ Room Temp', 'refrigerated': '❄️ Refrigerate',
    'frozen': '🧊 Keep Frozen', 'cool-dry': '📦 Cool & Dry'
  };
  const ALLERGEN_COLORS = {
    'gluten': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    'dairy': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'nuts': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'soy': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'eggs': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    'shellfish': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'fish': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    'none': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
  };

  let videoStream = null;
  let scanInterval = null;
  let currentDonation = null;

  // ---------- AUTO-CLEANUP: Remove donations older than 24 hours ----------
  (function cleanupExpiredDonations() {
    try {
      const local = JSON.parse(localStorage.getItem('hh_donations') || '[]');
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const filtered = local.filter(d => {
        // Remove if delivered more than 24h ago
        if (d.status === 'delivered' && d.delivered_at) {
          return (now - new Date(d.delivered_at).getTime()) < twentyFourHours;
        }
        // Remove if created more than 24h ago and already delivered/accepted
        if ((d.status === 'delivered' || d.status === 'accepted') && d.created_at) {
          return (now - new Date(d.created_at).getTime()) < twentyFourHours;
        }
        return true;
      });
      if (filtered.length !== local.length) {
        localStorage.setItem('hh_donations', JSON.stringify(filtered));
        console.log(`Auto-cleaned ${local.length - filtered.length} old donation(s)`);
      }
    } catch (e) { console.log('Cleanup skipped'); }
  })();

  // Check for URL param on load (from QR code redirect)
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      document.getElementById('donation-id-input').value = id;
      switchTab('manual');
      lookupById();
    }
  });

  // ---------- TAB SWITCHING ----------
  window.switchTab = function(tab) {
    const cameraTab = document.getElementById('tab-camera');
    const manualTab = document.getElementById('tab-manual');
    const cameraPanel = document.getElementById('panel-camera');
    const manualPanel = document.getElementById('panel-manual');
    
    const active = 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm';
    const inactive = 'text-slate-500 dark:text-slate-400';
    
    if (tab === 'camera') {
      cameraTab.className = `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${active}`;
      manualTab.className = `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${inactive}`;
      cameraPanel.classList.remove('hidden');
      manualPanel.classList.add('hidden');
    } else {
      manualTab.className = `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${active}`;
      cameraTab.className = `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${inactive}`;
      manualPanel.classList.remove('hidden');
      cameraPanel.classList.add('hidden');
      stopCamera();
    }
  };

  // ---------- CAMERA SCANNING ----------
  window.startCamera = async function() {
    try {
      const video = document.getElementById('scanner-video');
      const status = document.getElementById('camera-status');
      
      videoStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      video.srcObject = videoStream;
      await video.play();
      status.classList.add('hidden');
      
      document.getElementById('start-camera-btn').innerHTML = `
        <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        Scanning... Point at QR Code
      `;
      document.getElementById('start-camera-btn').disabled = true;
      document.getElementById('start-camera-btn').classList.add('opacity-60');

      // Scan loop
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      scanInterval = setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          if (typeof jsQR !== 'undefined') {
            const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
            if (code && code.data) {
              // Extract ID from URL or use raw data
              let scannedId = code.data;
              try {
                const url = new URL(code.data);
                scannedId = url.searchParams.get('id') || code.data;
              } catch(e) { /* not a URL, use raw */ }
              
              stopCamera();
              document.getElementById('donation-id-input').value = scannedId;
              lookupDonation(scannedId);
            }
          }
        }
      }, 250);

    } catch (e) {
      console.error('Camera error:', e);
      document.getElementById('camera-status').innerHTML = `
        <svg class="w-12 h-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
        </svg>
        <p class="text-red-300 text-sm font-medium">Camera access denied or not available</p>
        <p class="text-slate-400 text-xs mt-1">Try the "Enter ID" tab instead</p>
      `;
    }
  };

  function stopCamera() {
    if (scanInterval) { clearInterval(scanInterval); scanInterval = null; }
    if (videoStream) { videoStream.getTracks().forEach(t => t.stop()); videoStream = null; }
    const btn = document.getElementById('start-camera-btn');
    if (btn) {
      btn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        Start Camera
      `;
      btn.disabled = false;
      btn.classList.remove('opacity-60');
    }
  }

  // ---------- LOOKUP ----------
  window.lookupById = function() {
    const id = document.getElementById('donation-id-input').value.trim();
    if (!id) return;
    lookupDonation(id);
  };

  // Enter key support
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('donation-id-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') lookupById();
      });
    }
  });

  async function lookupDonation(id) {
    document.getElementById('scan-result').classList.remove('hidden');
    document.getElementById('result-success').classList.add('hidden');
    document.getElementById('result-error').classList.add('hidden');

    let donation = null;

    // 1. Try backend
    try {
      const res = await fetch(`${pythonURI}/api/donation/${encodeURIComponent(id)}`, fetchOptions);
      if (res.ok) donation = await res.json();
    } catch (e) { console.log('Backend unavailable'); }

    // 2. Fallback: localStorage
    if (!donation) {
      const local = JSON.parse(localStorage.getItem('hh_donations') || '[]');
      donation = local.find(d => d.id === id);
    }

    if (donation) {
      currentDonation = donation;
      showResult(donation);
    } else {
      document.getElementById('result-error').classList.remove('hidden');
    }
  }

  function showResult(d) {
    document.getElementById('result-success').classList.remove('hidden');
    document.getElementById('result-food-name').textContent = d.food_name;
    document.getElementById('result-id').textContent = d.id;
    document.getElementById('result-category').textContent = CATEGORY_MAP[d.category] || d.category;
    document.getElementById('result-quantity').textContent = `${d.quantity} ${d.unit}`;
    document.getElementById('result-storage').textContent = STORAGE_MAP[d.storage] || d.storage;
    document.getElementById('result-donor').textContent = d.donor_name;
    document.getElementById('result-email').textContent = d.donor_email;
    document.getElementById('result-zip').textContent = d.donor_zip;
    document.getElementById('result-date').textContent = new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Expiry
    const expiryDate = new Date(d.expiry_date);
    const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('result-expiry').textContent = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const expiryBlock = document.getElementById('result-expiry-block');
    const expiryStatus = document.getElementById('result-expiry-status');
    
    if (daysLeft < 0) {
      expiryBlock.className = 'flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      expiryStatus.textContent = '⚠️ EXPIRED — Do not consume!';
    } else if (daysLeft <= 3) {
      expiryBlock.className = 'flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      expiryStatus.textContent = `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} — Use soon!`;
    } else if (daysLeft <= 7) {
      expiryBlock.className = 'flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400';
      expiryStatus.textContent = `${daysLeft} days remaining`;
    } else {
      expiryBlock.className = 'flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      expiryStatus.textContent = `${daysLeft} days remaining — Fresh!`;
    }

    // Allergens
    const allergenContainer = document.getElementById('result-allergens');
    if (d.allergens && d.allergens.length > 0 && !d.allergens.includes('none')) {
      allergenContainer.innerHTML = d.allergens.map(a =>
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${ALLERGEN_COLORS[a] || 'bg-slate-100 text-slate-700'}">${a.charAt(0).toUpperCase() + a.slice(1)}</span>`
      ).join('');
    } else {
      allergenContainer.innerHTML = '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ No Known Allergens</span>';
    }

    // Dietary
    const dietaryContainer = document.getElementById('result-dietary');
    if (d.dietary_tags && d.dietary_tags.length > 0) {
      dietaryContainer.innerHTML = d.dietary_tags.map(t =>
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">${t.charAt(0).toUpperCase() + t.slice(1)}</span>`
      ).join('');
    } else {
      dietaryContainer.innerHTML = '<span class="text-sm text-slate-400">No dietary tags</span>';
    }

    // Description
    if (d.description) {
      document.getElementById('result-desc-block').classList.remove('hidden');
      document.getElementById('result-description').textContent = d.description;
    }

    // Special Instructions
    if (d.special_instructions) {
      document.getElementById('result-instructions-block').classList.remove('hidden');
      document.getElementById('result-instructions').textContent = d.special_instructions;
    }

    // Scroll to result
    document.getElementById('scan-result').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Handle status-aware button states
    const acceptBtn = document.getElementById('accept-btn');
    const deliverBtn = document.getElementById('deliver-btn');
    if (d.status === 'delivered') {
      acceptBtn.classList.add('hidden');
      deliverBtn.innerHTML = '📦 Already Delivered';
      deliverBtn.disabled = true;
      deliverBtn.className = deliverBtn.className.replace('from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700', 'from-slate-400 to-slate-500');
    } else if (d.status === 'accepted') {
      acceptBtn.innerHTML = '✅ Already Accepted';
      acceptBtn.disabled = true;
      acceptBtn.className = acceptBtn.className.replace('from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700', 'from-slate-400 to-slate-500');
    }
  }

  // ---------- ACTIONS ----------
  window.resetScanner = function() {
    document.getElementById('scan-result').classList.add('hidden');
    document.getElementById('result-success').classList.add('hidden');
    document.getElementById('result-error').classList.add('hidden');
    document.getElementById('delivered-confirmation').classList.add('hidden');
    document.getElementById('donation-id-input').value = '';
    currentDonation = null;
    // Reset buttons
    const acceptBtn = document.getElementById('accept-btn');
    acceptBtn.classList.remove('hidden');
    acceptBtn.disabled = false;
    acceptBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Accept Donation';
    acceptBtn.className = 'flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-medium transition-all';
    const deliverBtn = document.getElementById('deliver-btn');
    deliverBtn.disabled = false;
    deliverBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Mark as Delivered';
    deliverBtn.className = 'flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-medium transition-all';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.acceptDonation = async function() {
    if (!currentDonation) return;
    const btn = document.getElementById('accept-btn');
    btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Processing...';
    btn.disabled = true;

    try {
      const res = await fetch(`${pythonURI}/api/donation/${encodeURIComponent(currentDonation.id)}/accept`, {
        ...fetchOptions,
        method: 'POST'
      });
      if (res.ok) {
        btn.innerHTML = '✅ Accepted!';
        btn.className = btn.className.replace('from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700', 'from-slate-400 to-slate-500');
      } else {
        throw new Error('Accept failed');
      }
    } catch (e) {
      // Offline mode: mark locally
      btn.innerHTML = '✅ Accepted (offline)';
      btn.className = btn.className.replace('from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700', 'from-slate-400 to-slate-500');
      // Update localStorage
      const local = JSON.parse(localStorage.getItem('hh_donations') || '[]');
      const idx = local.findIndex(d => d.id === currentDonation.id);
      if (idx !== -1) { local[idx].status = 'accepted'; localStorage.setItem('hh_donations', JSON.stringify(local)); }
    }
  };

  window.markAsDelivered = async function() {
    if (!currentDonation) return;
    const btn = document.getElementById('deliver-btn');
    const acceptBtn = document.getElementById('accept-btn');
    btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Processing...';
    btn.disabled = true;

    try {
      const res = await fetch(`${pythonURI}/api/donation/${encodeURIComponent(currentDonation.id)}/deliver`, {
        ...fetchOptions,
        method: 'POST'
      });
      if (res.ok) {
        btn.innerHTML = '📦 Delivered!';
        btn.className = btn.className.replace('from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700', 'from-slate-400 to-slate-500');
        acceptBtn.classList.add('hidden');
      } else {
        throw new Error('Deliver failed');
      }
    } catch (e) {
      // Offline mode: mark locally
      btn.innerHTML = '📦 Delivered (offline)';
      btn.className = btn.className.replace('from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700', 'from-slate-400 to-slate-500');
      acceptBtn.classList.add('hidden');
      const local = JSON.parse(localStorage.getItem('hh_donations') || '[]');
      const idx = local.findIndex(d => d.id === currentDonation.id);
      if (idx !== -1) {
        local[idx].status = 'delivered';
        local[idx].delivered_at = new Date().toISOString();
        localStorage.setItem('hh_donations', JSON.stringify(local));
      }
    }

    // Show confirmation
    document.getElementById('delivered-confirmation').classList.remove('hidden');
    document.getElementById('delivered-confirmation').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
</script>

<style>
  @keyframes scan {
    0% { top: 10%; }
    50% { top: 85%; }
    100% { top: 10%; }
  }
  .animate-scan {
    animation: scan 2.5s ease-in-out infinite;
    position: absolute;
  }
</style>
