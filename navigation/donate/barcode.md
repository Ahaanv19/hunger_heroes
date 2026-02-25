---
layout: base
title: Barcode Label
permalink: /donate/barcode
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-2xl mx-auto">

    <!-- Back -->
    <a href="{{site.baseurl}}/donate/create" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Create Another Donation
    </a>

    <!-- SUCCESS HEADER -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg mb-4 animate-scale-in">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 animate-fade-in">Label Ready!</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg animate-fade-in">Print this label and stick it on your food package</p>
    </div>

    <!-- ==================== PRINTABLE LABEL ==================== -->
    <div id="barcode-label-container">
      <div id="barcode-label" class="bg-white rounded-3xl shadow-large border-2 border-slate-200 p-0 overflow-hidden">
        
        <!-- Label Header -->
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-bold">HUNGER HEROES</h2>
                <p class="text-green-100 text-xs font-medium">FOOD DONATION LABEL</p>
              </div>
            </div>
            <div class="text-right">
              <p id="label-id" class="font-mono font-bold text-sm bg-white/20 px-3 py-1 rounded-lg">---</p>
            </div>
          </div>
        </div>

        <!-- Label Body -->
        <div class="p-6">
          <!-- Food Name Row -->
          <div class="mb-4 pb-4 border-b border-slate-200">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Food Item</p>
            <p id="label-food-name" class="text-2xl font-bold text-slate-900">---</p>
            <div class="flex items-center gap-3 mt-2">
              <span id="label-category" class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">---</span>
              <span id="label-quantity" class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">---</span>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Expires</p>
              <p id="label-expiry" class="text-base font-bold text-red-600">---</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Storage</p>
              <p id="label-storage" class="text-base font-bold text-slate-700">---</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Donated By</p>
              <p id="label-donor" class="text-base font-semibold text-slate-700">---</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Zip Code</p>
              <p id="label-zip" class="text-base font-semibold text-slate-700">---</p>
            </div>
          </div>

          <!-- Allergens -->
          <div class="mb-4 pb-4 border-b border-slate-200">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">⚠️ Allergen Warning</p>
            <div id="label-allergens" class="flex flex-wrap gap-2">
              <span class="text-sm text-slate-500">None listed</span>
            </div>
          </div>

          <!-- Dietary Tags -->
          <div class="mb-4 pb-4 border-b border-slate-200">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dietary Info</p>
            <div id="label-dietary" class="flex flex-wrap gap-2">
              <span class="text-sm text-slate-500">No dietary tags</span>
            </div>
          </div>

          <!-- Special Instructions -->
          <div id="label-instructions-block" class="mb-5 hidden">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Special Instructions</p>
            <p id="label-instructions" class="text-sm text-slate-600 italic">---</p>
          </div>

          <!-- Barcode + QR Code -->
          <div class="flex flex-col items-center pt-2">
            <!-- Code 128 Barcode -->
            <div class="mb-4">
              <svg id="barcode-svg"></svg>
            </div>
            <!-- QR Code -->
            <div id="qr-code" class="mb-3 p-3 bg-white rounded-2xl shadow-soft border border-slate-100"></div>
            <p class="text-xs text-slate-400 font-medium">Scan barcode or QR code to verify donation details</p>
          </div>
        </div>

        <!-- Label Footer -->
        <div class="bg-slate-50 px-6 py-3 text-center border-t border-slate-200">
          <p class="text-xs text-slate-400">
            <span id="label-date">---</span> · hungerheroes.org · City of San Diego
          </p>
        </div>
      </div>
    </div>

    <!-- ACTION BUTTONS -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <button onclick="printLabel()" 
        class="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-medium hover:shadow-large transition-all w-full sm:w-auto justify-center">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
        </svg>
        Print Label
      </button>
      <button onclick="downloadLabel()" 
        class="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-primary-500 hover:text-primary-600 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Download as Image
      </button>
      <a href="{{site.baseurl}}/donate/scan" 
        class="inline-flex items-center gap-2 px-8 py-3.5 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
        </svg>
        Go to Scanner
      </a>
    </div>

    <!-- Info -->
    <div class="mt-10 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
      <div class="flex gap-3">
        <svg class="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h3 class="font-semibold text-blue-900 dark:text-blue-300 mb-1">How to use this label</h3>
          <ol class="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
            <li>Print this label or save as an image</li>
            <li>Cut along the edges and attach to your food package</li>
            <li>When the food arrives, the receiver scans the QR code</li>
            <li>All donation details are instantly displayed — no guessing!</li>
          </ol>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- html2canvas for image download -->
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  const CATEGORY_MAP = {
    'canned': '🥫 Canned Goods',
    'fresh-produce': '🥬 Fresh Produce',
    'dairy': '🧀 Dairy',
    'bakery': '🍞 Bakery / Bread',
    'meat-protein': '🥩 Meat / Protein',
    'grains': '🌾 Grains / Pasta / Rice',
    'beverages': '🥤 Beverages',
    'frozen': '❄️ Frozen Foods',
    'snacks': '🍪 Snacks',
    'baby-food': '🍼 Baby Food',
    'prepared-meals': '🍱 Prepared Meals',
    'other': '📦 Other'
  };

  const STORAGE_MAP = {
    'room-temp': '🌡️ Room Temp',
    'refrigerated': '❄️ Refrigerate',
    'frozen': '🧊 Keep Frozen',
    'cool-dry': '📦 Cool & Dry'
  };

  const ALLERGEN_COLORS = {
    'gluten': 'bg-amber-100 text-amber-800',
    'dairy': 'bg-blue-100 text-blue-800',
    'nuts': 'bg-orange-100 text-orange-800',
    'soy': 'bg-yellow-100 text-yellow-800',
    'eggs': 'bg-pink-100 text-pink-800',
    'shellfish': 'bg-red-100 text-red-800',
    'fish': 'bg-cyan-100 text-cyan-800',
    'none': 'bg-green-100 text-green-800'
  };

  document.addEventListener('DOMContentLoaded', async () => {
    // Try to get data from sessionStorage first, then from URL + backend
    let donation = null;
    const sessionData = sessionStorage.getItem('hh_current_donation');
    
    if (sessionData) {
      donation = JSON.parse(sessionData);
    } else {
      // Try backend lookup via URL param
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        try {
          const res = await fetch(`${pythonURI}/api/donation/${encodeURIComponent(id)}`, fetchOptions);
          if (res.ok) donation = await res.json();
        } catch (e) { console.log('Backend fetch failed'); }
        
        // Fallback: localStorage
        if (!donation) {
          const local = JSON.parse(localStorage.getItem('hh_donations') || '[]');
          donation = local.find(d => d.id === id);
        }
      }
    }

    if (!donation) {
      document.getElementById('barcode-label').innerHTML = `
        <div class="p-12 text-center">
          <svg class="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-xl font-bold text-slate-900 dark:text-slate-200 mb-2">No Donation Data Found</h3>
          <p class="text-slate-500 dark:text-slate-400 mb-6">Create a donation first to generate a barcode label.</p>
          <a href="{{site.baseurl}}/donate/create" class="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm">
            Create Donation
          </a>
        </div>`;
      return;
    }

    // Populate label
    populateLabel(donation);
    generateBarcode(donation);
    generateQR(donation);
  });

  function populateLabel(d) {
    document.getElementById('label-id').textContent = d.id;
    document.getElementById('label-food-name').textContent = d.food_name;
    document.getElementById('label-category').textContent = CATEGORY_MAP[d.category] || d.category;
    document.getElementById('label-quantity').textContent = `${d.quantity} ${d.unit}`;
    
    // Expiry - highlight red if within 3 days
    const expiryEl = document.getElementById('label-expiry');
    const expiryDate = new Date(d.expiry_date);
    const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
    expiryEl.textContent = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (daysLeft <= 3) expiryEl.classList.add('text-red-600');
    else if (daysLeft <= 7) expiryEl.classList.replace('text-red-600', 'text-amber-600');
    
    document.getElementById('label-storage').textContent = STORAGE_MAP[d.storage] || d.storage;
    document.getElementById('label-donor').textContent = d.donor_name;
    document.getElementById('label-zip').textContent = d.donor_zip;
    document.getElementById('label-date').textContent = new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Allergens
    const allergenContainer = document.getElementById('label-allergens');
    if (d.allergens && d.allergens.length > 0 && !d.allergens.includes('none')) {
      allergenContainer.innerHTML = d.allergens.map(a => 
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${ALLERGEN_COLORS[a] || 'bg-slate-100 text-slate-700'}">${a.charAt(0).toUpperCase() + a.slice(1)}</span>`
      ).join('');
    } else {
      allergenContainer.innerHTML = '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">✅ No Known Allergens</span>';
    }

    // Dietary
    const dietaryContainer = document.getElementById('label-dietary');
    if (d.dietary_tags && d.dietary_tags.length > 0) {
      dietaryContainer.innerHTML = d.dietary_tags.map(t => 
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">${t.charAt(0).toUpperCase() + t.slice(1)}</span>`
      ).join('');
    }

    // Special instructions
    if (d.special_instructions) {
      document.getElementById('label-instructions-block').classList.remove('hidden');
      document.getElementById('label-instructions').textContent = d.special_instructions;
    }
  }

  function generateBarcode(donation) {
    const barcodeSvg = document.getElementById('barcode-svg');
    try {
      if (typeof window.JsBarcode !== 'undefined') {
        window.JsBarcode(barcodeSvg, donation.id, {
          format: 'CODE128',
          width: 2,
          height: 60,
          displayValue: true,
          font: 'monospace',
          fontSize: 14,
          fontOptions: 'bold',
          textMargin: 6,
          margin: 10,
          background: '#ffffff',
          lineColor: '#1e293b'
        });
      } else {
        barcodeSvg.outerHTML = '<p class="text-red-500 text-sm">Barcode library not loaded</p>';
      }
    } catch (e) {
      console.error('Barcode generation error:', e);
      barcodeSvg.outerHTML = '<p class="text-red-500 text-sm">Barcode generation failed</p>';
    }
  }

  function generateQR(donation) {
    const scanUrl = `${window.location.origin}{{site.baseurl}}/donate/scan?id=${encodeURIComponent(donation.id)}`;
    const qrContainer = document.getElementById('qr-code');
    
    if (typeof window.QRCode !== 'undefined') {
      const canvas = document.createElement('canvas');
      window.QRCode.toCanvas(canvas, scanUrl, {
        width: 150,
        margin: 2,
        color: { dark: '#1e293b', light: '#ffffff' },
        errorCorrectionLevel: 'H'
      }, (err) => {
        if (err) {
          console.error('QR generation error:', err);
          qrContainer.innerHTML = '<p class="text-red-500 text-sm">QR generation failed</p>';
          return;
        }
        canvas.style.borderRadius = '12px';
        qrContainer.appendChild(canvas);
      });
    } else {
      qrContainer.innerHTML = '<p class="text-amber-500 text-sm">QR code unavailable — use barcode above</p>';
    }
  }

  // ---------- PRINT ----------
  window.printLabel = function() {
    const labelHtml = document.getElementById('barcode-label').outerHTML;
    const win = window.open('', '_blank', 'width=600,height=800');
    win.document.write(`
      <!DOCTYPE html><html><head><title>Hunger Heroes Label</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <style>
        @media print { body { margin: 0; } @page { size: auto; margin: 10mm; } }
        body { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif; display:flex; justify-content:center; padding:20px; }
        svg { max-width: 100%; height: auto; }
      </style>
      </head><body>${labelHtml}</body></html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  };

  // ---------- DOWNLOAD AS IMAGE ----------
  window.downloadLabel = async function() {
    const label = document.getElementById('barcode-label');
    try {
      const canvas = await html2canvas(label, { 
        scale: 3, 
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true 
      });
      const link = document.createElement('a');
      link.download = `hunger-heroes-label-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Download failed:', e);
      alert('Image download failed. Try printing instead.');
    }
  };
</script>
