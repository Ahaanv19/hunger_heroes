---
layout: base
title: Create Donation
permalink: /donate/create
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">

    <!-- Back Link -->
    <a href="{{site.baseurl}}/" class="inline-flex items-center text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 transition-colors group">
      <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Home
    </a>

    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Create a Donation</h1>
      <p class="text-slate-500 dark:text-slate-400 text-lg">Fill in the details, then generate a barcode label for your food package</p>
    </div>

    <!-- Progress Bar -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-3">
        <span id="step-label" class="text-sm font-semibold text-primary-600 dark:text-primary-400">Step 1 of 3 — Food Details</span>
        <span id="step-percent" class="text-sm font-medium text-slate-500 dark:text-slate-400">33%</span>
      </div>
      <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div id="progress-bar" class="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 ease-out" style="width: 33%"></div>
      </div>
    </div>

    <!-- Form Card -->
    <div class="glass rounded-3xl shadow-large p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50">
      <form id="donation-form" novalidate>

        <!-- ==================== STEP 1: FOOD DETAILS ==================== -->
        <div id="step-1" class="donation-step">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Food Details</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">What are you donating?</p>
            </div>
          </div>

          <!-- Food Name -->
          <div class="mb-5">
            <label for="food-name" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Food Name <span class="text-red-500">*</span>
            </label>
            <input type="text" id="food-name" placeholder="e.g. Canned Tomato Soup, Fresh Bread"
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
          </div>

          <!-- Category -->
          <div class="mb-5">
            <label for="food-category" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Category <span class="text-red-500">*</span>
            </label>
            <select id="food-category"
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
              <option value="">Select a category</option>
              <option value="canned">🥫 Canned Goods</option>
              <option value="fresh-produce">🥬 Fresh Produce</option>
              <option value="dairy">🧀 Dairy</option>
              <option value="bakery">🍞 Bakery / Bread</option>
              <option value="meat-protein">🥩 Meat / Protein</option>
              <option value="grains">🌾 Grains / Pasta / Rice</option>
              <option value="beverages">🥤 Beverages</option>
              <option value="frozen">❄️ Frozen Foods</option>
              <option value="snacks">🍪 Snacks</option>
              <option value="baby-food">🍼 Baby Food</option>
              <option value="prepared-meals">🍱 Prepared Meals</option>
              <option value="other">📦 Other</option>
            </select>
          </div>

          <!-- Quantity & Unit -->
          <div class="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label for="food-quantity" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Quantity <span class="text-red-500">*</span>
              </label>
              <input type="number" id="food-quantity" min="1" placeholder="e.g. 5"
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
            </div>
            <div>
              <label for="food-unit" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Unit <span class="text-red-500">*</span>
              </label>
              <select id="food-unit"
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
                <option value="">Select unit</option>
                <option value="items">Items</option>
                <option value="lbs">Pounds (lbs)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="oz">Ounces (oz)</option>
                <option value="cans">Cans</option>
                <option value="boxes">Boxes</option>
                <option value="bags">Bags</option>
                <option value="trays">Trays</option>
                <option value="servings">Servings</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-5">
            <label for="food-description" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Description <span class="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea id="food-description" rows="3" placeholder="Additional details about the food item..."
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"></textarea>
          </div>

          <div class="flex justify-end pt-4">
            <button type="button" onclick="nextStep(2)"
              class="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm shadow-medium hover:shadow-large transition-all">
              Continue
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- ==================== STEP 2: SAFETY & HANDLING ==================== -->
        <div id="step-2" class="donation-step hidden">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Safety & Handling</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Important safety information</p>
            </div>
          </div>

          <!-- Expiry Date -->
          <div class="mb-5">
            <label for="food-expiry" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Expiration Date <span class="text-red-500">*</span>
            </label>
            <input type="date" id="food-expiry"
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
          </div>

          <!-- Storage Instructions -->
          <div class="mb-5">
            <label for="storage-type" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Storage Requirements <span class="text-red-500">*</span>
            </label>
            <select id="storage-type"
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
              <option value="">Select storage type</option>
              <option value="room-temp">🌡️ Room Temperature</option>
              <option value="refrigerated">❄️ Refrigerated (32–40°F)</option>
              <option value="frozen">🧊 Frozen (0°F or below)</option>
              <option value="cool-dry">📦 Cool & Dry Place</option>
            </select>
          </div>

          <!-- Allergens -->
          <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Allergen Information <span class="text-slate-400 font-normal">(check all that apply)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="gluten" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🌾 Gluten
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="dairy" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🥛 Dairy
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="nuts" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🥜 Nuts
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="soy" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🫘 Soy
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="eggs" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🥚 Eggs
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="shellfish" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🦐 Shellfish
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="fish" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/20 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🐟 Fish
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="allergens" value="none" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  ✅ None
                </span>
              </label>
            </div>
          </div>

          <!-- Dietary Info -->
          <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Dietary Tags <span class="text-slate-400 font-normal">(optional)</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <label class="allergen-chip">
                <input type="checkbox" name="dietary" value="vegetarian" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🥕 Vegetarian
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="dietary" value="vegan" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🌱 Vegan
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="dietary" value="halal" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  ☪️ Halal
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="dietary" value="kosher" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  ✡️ Kosher
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="dietary" value="gluten-free" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🚫🌾 Gluten-Free
                </span>
              </label>
              <label class="allergen-chip">
                <input type="checkbox" name="dietary" value="organic" class="hidden peer">
                <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-400 transition-all hover:border-slate-300 dark:hover:border-slate-500 w-full">
                  🌿 Organic
                </span>
              </label>
            </div>
          </div>

          <div class="flex justify-between pt-4">
            <button type="button" onclick="prevStep(1)"
              class="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl font-semibold text-sm transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <button type="button" onclick="nextStep(3)"
              class="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold text-sm shadow-medium hover:shadow-large transition-all">
              Continue
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- ==================== STEP 3: DONOR INFO & REVIEW ==================== -->
        <div id="step-3" class="donation-step hidden">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Donor Info & Review</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Your contact information</p>
            </div>
          </div>

          <!-- Donor Name -->
          <div class="mb-5">
            <label for="donor-name" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Your Name / Organization <span class="text-red-500">*</span>
            </label>
            <input type="text" id="donor-name" placeholder="e.g. John Doe, Local Bakery Co."
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
          </div>

          <!-- Contact -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label for="donor-email" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input type="email" id="donor-email" placeholder="you@example.com"
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
            </div>
            <div>
              <label for="donor-phone" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Phone <span class="text-slate-400 font-normal">(optional)</span>
              </label>
              <input type="tel" id="donor-phone" placeholder="(619) 555-0123"
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
            </div>
          </div>

          <!-- Zip Code -->
          <div class="mb-5">
            <label for="donor-zip" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Zip Code <span class="text-red-500">*</span>
            </label>
            <input type="text" id="donor-zip" placeholder="92101" maxlength="10"
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
          </div>

          <!-- Special Instructions -->
          <div class="mb-5">
            <label for="special-instructions" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Special Instructions <span class="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea id="special-instructions" rows="2" placeholder="Handling notes, pick-up window, etc."
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"></textarea>
          </div>

          <!-- Summary Preview -->
          <div class="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
              Quick Summary
            </h3>
            <div id="form-summary" class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <!-- Populated by JS -->
            </div>
          </div>

          <div class="flex justify-between pt-4">
            <button type="button" onclick="prevStep(2)"
              class="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl font-semibold text-sm transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <button type="button" onclick="submitDonation()"
              class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-medium hover:shadow-large transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
              </svg>
              Generate Barcode Label
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Error Toast -->
<div id="error-toast" class="fixed bottom-6 right-6 z-50 hidden">
  <div class="flex items-center gap-3 px-5 py-4 bg-red-600 text-white rounded-2xl shadow-large animate-slide-up">
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span id="error-toast-msg">Please fill in all required fields.</span>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  // ---------- STEP NAVIGATION ----------
  let currentStep = 1;
  const totalSteps = 3;
  const stepLabels = {
    1: 'Food Details',
    2: 'Safety & Handling',
    3: 'Donor Info & Review'
  };

  window.nextStep = function(step) {
    if (!validateStep(currentStep)) return;
    showStep(step);
  };
  window.prevStep = function(step) {
    showStep(step);
  };

  function showStep(step) {
    document.querySelectorAll('.donation-step').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
    currentStep = step;
    // Update progress
    const pct = Math.round((step / totalSteps) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('step-percent').textContent = pct + '%';
    document.getElementById('step-label').textContent = `Step ${step} of ${totalSteps} — ${stepLabels[step]}`;
    // Update summary on step 3
    if (step === 3) updateSummary();
    // Scroll to top of form
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  function validateStep(step) {
    let valid = true;
    const required = document.querySelectorAll(`#step-${step} [required]`);
    required.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        valid = false;
        input.addEventListener('input', () => {
          input.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
        }, { once: true });
      }
    });
    if (!valid) showError('Please fill in all required fields.');
    return valid;
  }

  function showError(msg) {
    const toast = document.getElementById('error-toast');
    document.getElementById('error-toast-msg').textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3500);
  }

  function updateSummary() {
    const name = document.getElementById('food-name').value;
    const cat = document.getElementById('food-category');
    const catText = cat.options[cat.selectedIndex]?.text || '';
    const qty = document.getElementById('food-quantity').value;
    const unit = document.getElementById('food-unit');
    const unitText = unit.options[unit.selectedIndex]?.text || '';
    const expiry = document.getElementById('food-expiry').value;
    const storage = document.getElementById('storage-type');
    const storageText = storage.options[storage.selectedIndex]?.text || '';
    const allergens = [...document.querySelectorAll('input[name="allergens"]:checked')].map(c => c.value).join(', ') || 'None selected';
    const dietary = [...document.querySelectorAll('input[name="dietary"]:checked')].map(c => c.value).join(', ') || 'None';

    document.getElementById('form-summary').innerHTML = `
      <div class="grid grid-cols-2 gap-x-4 gap-y-2">
        <span class="text-slate-500 dark:text-slate-500">Food:</span><span class="font-medium text-slate-800 dark:text-slate-200">${name}</span>
        <span class="text-slate-500 dark:text-slate-500">Category:</span><span class="font-medium text-slate-800 dark:text-slate-200">${catText}</span>
        <span class="text-slate-500 dark:text-slate-500">Quantity:</span><span class="font-medium text-slate-800 dark:text-slate-200">${qty} ${unitText}</span>
        <span class="text-slate-500 dark:text-slate-500">Expires:</span><span class="font-medium text-slate-800 dark:text-slate-200">${expiry}</span>
        <span class="text-slate-500 dark:text-slate-500">Storage:</span><span class="font-medium text-slate-800 dark:text-slate-200">${storageText}</span>
        <span class="text-slate-500 dark:text-slate-500">Allergens:</span><span class="font-medium text-slate-800 dark:text-slate-200">${allergens}</span>
        <span class="text-slate-500 dark:text-slate-500">Dietary:</span><span class="font-medium text-slate-800 dark:text-slate-200">${dietary}</span>
      </div>
    `;
  }

  // ---------- AUTO-FILL DONOR INFO FROM AUTH ----------
  document.addEventListener('DOMContentLoaded', async () => {
    // Set min date for expiry to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('food-expiry').setAttribute('min', today);

    try {
      const res = await fetch(`${pythonURI}/api/user`, fetchOptions);
      if (res.ok) {
        const user = await res.json();
        if (user.name) document.getElementById('donor-name').value = user.name;
        if (user.email) document.getElementById('donor-email').value = user.email;
      }
    } catch (e) {
      console.log('Not logged in or fetch failed');
    }
  });

  // ---------- SUBMIT -> Generate Barcode ----------
  window.submitDonation = async function() {
    if (!validateStep(3)) return;

    const donationData = {
      food_name:     document.getElementById('food-name').value.trim(),
      category:      document.getElementById('food-category').value,
      quantity:       parseInt(document.getElementById('food-quantity').value),
      unit:          document.getElementById('food-unit').value,
      description:   document.getElementById('food-description').value.trim(),
      expiry_date:   document.getElementById('food-expiry').value,
      storage:       document.getElementById('storage-type').value,
      allergens:     [...document.querySelectorAll('input[name="allergens"]:checked')].map(c => c.value),
      dietary_tags:  [...document.querySelectorAll('input[name="dietary"]:checked')].map(c => c.value),
      donor_name:    document.getElementById('donor-name').value.trim(),
      donor_email:   document.getElementById('donor-email').value.trim(),
      donor_phone:   document.getElementById('donor-phone').value.trim(),
      donor_zip:     document.getElementById('donor-zip').value.trim(),
      special_instructions: document.getElementById('special-instructions').value.trim(),
      created_at:    new Date().toISOString()
    };

    // Try to POST to backend; if it fails, use a client-side ID
    let donationId = null;
    try {
      const res = await fetch(`${pythonURI}/api/donation`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify(donationData)
      });
      if (res.ok) {
        const result = await res.json();
        donationId = result.id || result.donation_id;
      }
    } catch (e) {
      console.log('Backend unavailable, generating client-side barcode');
    }

    // Fallback: client-side ID
    if (!donationId) {
      donationId = 'HH-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    }

    donationData.id = donationId;

    // Save to localStorage as backup
    const donations = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    donations.push(donationData);
    localStorage.setItem('hh_donations', JSON.stringify(donations));

    // Redirect to barcode page with data
    sessionStorage.setItem('hh_current_donation', JSON.stringify(donationData));
    window.location.href = `{{site.baseurl}}/donate/barcode?id=${encodeURIComponent(donationId)}`;
  };
</script>
