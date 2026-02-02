---
layout: base
title: Home
search_exclude: true
nav: true
hide: true
menu: nav/home.html
---

<!-- Hero Section with Sliding Images -->
<section class="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <!-- Decorative Elements -->
  <div class="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
  <div class="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style="animation-delay: 2s;"></div>
  
  <div class="container mx-auto px-6 py-16 lg:py-24">
    <div class="flex flex-col lg:flex-row items-center gap-12">
      <!-- Left Content -->
      <div class="flex-1 text-center lg:text-left animate-fade-in">
        <span class="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-6">
          🌱 Fighting Food Waste, Feeding Hope
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          Turn Surplus Food Into 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Second Chances</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Connecting donors with shelters and food banks across San Diego. Together, we're reducing waste and ensuring no one goes hungry.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a href="{{site.baseurl}}/donate" class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Donate Now
            <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
          <a href="{{site.baseurl}}/opportunities" class="group inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 font-semibold rounded-2xl shadow-lg border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            View Donation Opportunities
          </a>
        </div>
      </div>
      
      <!-- Right Side - Image Slider -->
      <div class="flex-1 w-full max-w-xl animate-slide-up">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-1">
          <div class="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
            <!-- Slider Container -->
            <div id="heroSlider" class="relative h-80 md:h-96">
              <div class="slider-item absolute inset-0 opacity-100 transition-opacity duration-700 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                <div class="text-center p-8">
                  <div class="text-6xl mb-4">🍎</div>
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Fresh Produce</h3>
                  <p class="text-gray-600 dark:text-gray-300">Fruits & vegetables from local farms</p>
                </div>
              </div>
              <div class="slider-item absolute inset-0 opacity-0 transition-opacity duration-700 flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                <div class="text-center p-8">
                  <div class="text-6xl mb-4">🍞</div>
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Bakery Items</h3>
                  <p class="text-gray-600 dark:text-gray-300">Fresh bread & pastries daily</p>
                </div>
              </div>
              <div class="slider-item absolute inset-0 opacity-0 transition-opacity duration-700 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                <div class="text-center p-8">
                  <div class="text-6xl mb-4">🍲</div>
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Prepared Meals</h3>
                  <p class="text-gray-600 dark:text-gray-300">From restaurants & events</p>
                </div>
              </div>
              <div class="slider-item absolute inset-0 opacity-0 transition-opacity duration-700 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <div class="text-center p-8">
                  <div class="text-6xl mb-4">🥫</div>
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Pantry Staples</h3>
                  <p class="text-gray-600 dark:text-gray-300">Non-perishable essentials</p>
                </div>
              </div>
            </div>
            <!-- Slider Dots -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <button class="slider-dot w-3 h-3 rounded-full bg-green-600 transition-all duration-300" data-index="0"></button>
              <button class="slider-dot w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-green-400 transition-all duration-300" data-index="1"></button>
              <button class="slider-dot w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-green-400 transition-all duration-300" data-index="2"></button>
              <button class="slider-dot w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-green-400 transition-all duration-300" data-index="3"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Mission Statement Section -->
<section class="py-20 bg-white dark:bg-gray-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-8">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
      <blockquote class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed italic">
        "To bridge the gap between food surplus and food insecurity in San Diego by creating a seamless connection between donors and those in need. Every meal saved is a life touched."
      </blockquote>
      <div class="mt-8 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold">
        <span class="w-12 h-0.5 bg-green-600 dark:bg-green-400"></span>
        Hunger Heroes
        <span class="w-12 h-0.5 bg-green-600 dark:bg-green-400"></span>
      </div>
    </div>
  </div>
</section>

<!-- Statistics Section -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Food Waste Crisis</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Understanding the scale of the problem helps us work toward a solution</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Stat 1 -->
      <div class="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-green-400">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500">
            <svg class="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <div class="text-4xl md:text-5xl font-bold text-green-600 group-hover:text-white mb-2 transition-colors duration-500">30-40%</div>
          <p class="text-gray-600 dark:text-gray-300 group-hover:text-white/90 font-medium transition-colors duration-500">of all food in the USA ends up in the trash</p>
        </div>
      </div>
      
      <!-- Stat 2 -->
      <div class="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-green-400">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500">
            <svg class="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="text-4xl md:text-5xl font-bold text-green-600 group-hover:text-white mb-2 transition-colors duration-500">$40B</div>
          <p class="text-gray-600 dark:text-gray-300 group-hover:text-white/90 font-medium transition-colors duration-500">worth of food thrown away annually by businesses</p>
        </div>
      </div>
      
      <!-- Stat 3 -->
      <div class="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-green-400">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500">
            <svg class="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <div class="text-4xl md:text-5xl font-bold text-green-600 group-hover:text-white mb-2 transition-colors duration-500">$1,866</div>
          <p class="text-gray-600 dark:text-gray-300 group-hover:text-white/90 font-medium transition-colors duration-500">wasted per year by the average American family</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- How It Works Section -->
<section class="py-20 bg-white dark:bg-gray-900">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
        Simple Process
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Whether you're donating or receiving, our platform makes it easy</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      <!-- For Donors -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 md:p-10">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">For Donors</h3>
        </div>
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Register Your Account</h4>
              <p class="text-gray-600 dark:text-gray-400">Sign up as an individual, group, or business</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">List Your Excess Food</h4>
              <p class="text-gray-600 dark:text-gray-400">Add details and your zip code for local matching</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Get Matched</h4>
              <p class="text-gray-600 dark:text-gray-400">Connect with nearby shelters and food banks</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Choose Delivery Option</h4>
              <p class="text-gray-600 dark:text-gray-400">Select delivery or pick-up preference</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- For Receivers -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 md:p-10">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">For Receivers</h3>
        </div>
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Register Your Organization</h4>
              <p class="text-gray-600 dark:text-gray-400">Sign up as a shelter or food bank</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Review Donations</h4>
              <p class="text-gray-600 dark:text-gray-400">Browse available donations within 24 hours</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Accept or Decline</h4>
              <p class="text-gray-600 dark:text-gray-400">Choose donations that fit your needs</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Rate & Review</h4>
              <p class="text-gray-600 dark:text-gray-400">Maintain quality standards in our community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Impact Section -->
<section class="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Expected Impact</h2>
      <p class="text-lg text-green-100 max-w-2xl mx-auto">Every connection we make creates a ripple effect of positive change</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-300">
        <div class="text-5xl mb-4">🌍</div>
        <h3 class="text-xl font-bold mb-2">Reduce Waste</h3>
        <p class="text-green-100">Divert food from landfills to those who need it</p>
      </div>
      <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-300">
        <div class="text-5xl mb-4">🥗</div>
        <h3 class="text-xl font-bold mb-2">Fresh Food</h3>
        <p class="text-green-100">Provide nutritious options, not just canned goods</p>
      </div>
      <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-300">
        <div class="text-5xl mb-4">👨‍👩‍👧‍👦</div>
        <h3 class="text-xl font-bold mb-2">Serve More</h3>
        <p class="text-green-100">Help more families facing food insecurity</p>
      </div>
      <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-300">
        <div class="text-5xl mb-4">💚</div>
        <h3 class="text-xl font-bold mb-2">Build Community</h3>
        <p class="text-green-100">Encourage giving over disposing</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-white dark:bg-gray-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 shadow-xl border border-green-100 dark:border-gray-600">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Make a Difference?</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Join Hunger Heroes today and be part of the solution. Whether you have food to donate or need support, we're here to help.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="{{site.baseurl}}/login" class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Get Started Today
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
        <a href="{{site.baseurl}}/about" class="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 font-semibold rounded-2xl shadow-lg border-2 border-green-200 dark:border-gray-600 hover:border-green-400 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Learn More About Us
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Footer Links Section -->
<section class="py-12 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
  <div class="container mx-auto px-6">
    <div class="flex flex-wrap justify-center gap-8 text-center">
      <a href="{{site.baseurl}}/about" class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-300">About Us</a>
      <a href="{{site.baseurl}}/contact" class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-300">Contact Us</a>
      <a href="{{site.baseurl}}/partners" class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-300">Business Partners</a>
      <a href="{{site.baseurl}}/complaint" class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-300">File a Complaint</a>
    </div>
    <div class="text-center mt-8 text-gray-500 dark:text-gray-500 text-sm">
      <p>© 2026 Hunger Heroes. Fighting food waste, feeding hope in San Diego.</p>
    </div>
  </div>
</section>

<!-- Slider Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slider-item');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        dot.classList.add('bg-green-600');
      } else {
        dot.classList.remove('bg-green-600');
        dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
      }
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(index);
      startAutoSlide();
    });
  });

  // Start auto-sliding
  startAutoSlide();
});
</script>
