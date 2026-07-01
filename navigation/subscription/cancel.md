---
layout: base
title: Payment Cancelled
permalink: /subscription/cancel
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto text-center py-20">
    
    <!-- Cancel Icon -->
    <div class="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
      <svg class="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
    </div>
    
    <h1 class="text-4xl font-bold text-white mb-4">Payment Cancelled</h1>
    <p class="text-gray-400 text-lg mb-4">Your payment was cancelled. No charges were made.</p>
    <p class="text-gray-500 mb-8">Redirecting you back to pricing in <span id="countdown" class="text-white font-semibold">3</span> seconds...</p>
    
    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="{{site.baseurl}}/pricing" class="py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30">
        Back to Pricing
      </a>
      <a href="{{site.baseurl}}/" class="py-3 px-8 rounded-xl bg-gray-700 text-white font-semibold transition-all duration-300 hover:bg-gray-600">
        Go Home
      </a>
    </div>
    
  </div>
</div>

<script>
  // Countdown and redirect
  let seconds = 3;
  const countdownEl = document.getElementById('countdown');
  
  const interval = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = '{{site.baseurl}}/pricing';
    }
  }, 1000);
</script>
