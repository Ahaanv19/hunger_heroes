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

          <!-- Food Name Dropdown -->
          <div class="mb-5">
            <label for="food-name-select" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Food Name <span class="text-red-500">*</span>
            </label>
            <select id="food-name-select"
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" required>
              <option value="">Select a food item</option>
              <!-- Canned Goods -->
              <optgroup label="🥫 Canned Goods">
                <option value="Canned Tomato Soup">Canned Tomato Soup</option>
                <option value="Canned Chicken Soup">Canned Chicken Soup</option>
                <option value="Canned Vegetables">Canned Vegetables</option>
                <option value="Canned Beans">Canned Beans</option>
                <option value="Canned Tuna">Canned Tuna</option>
                <option value="Canned Fruit">Canned Fruit</option>
                <option value="Canned Corn">Canned Corn</option>
                <option value="Canned Chili">Canned Chili</option>
              </optgroup>
              <!-- Fresh Produce -->
              <optgroup label="🥬 Fresh Produce">
                <option value="Fresh Apples">Fresh Apples</option>
                <option value="Fresh Bananas">Fresh Bananas</option>
                <option value="Fresh Oranges">Fresh Oranges</option>
                <option value="Fresh Carrots">Fresh Carrots</option>
                <option value="Fresh Potatoes">Fresh Potatoes</option>
                <option value="Fresh Tomatoes">Fresh Tomatoes</option>
                <option value="Mixed Salad Greens">Mixed Salad Greens</option>
                <option value="Fresh Onions">Fresh Onions</option>
              </optgroup>
              <!-- Dairy -->
              <optgroup label="🧀 Dairy">
                <option value="Whole Milk">Whole Milk</option>
                <option value="Cheddar Cheese">Cheddar Cheese</option>
                <option value="Yogurt">Yogurt</option>
                <option value="Butter">Butter</option>
                <option value="Eggs">Eggs</option>
                <option value="Cream Cheese">Cream Cheese</option>
              </optgroup>
              <!-- Bakery -->
              <optgroup label="🍞 Bakery / Bread">
                <option value="White Bread">White Bread</option>
                <option value="Whole Wheat Bread">Whole Wheat Bread</option>
                <option value="Bagels">Bagels</option>
                <option value="Tortillas">Tortillas</option>
                <option value="Dinner Rolls">Dinner Rolls</option>
                <option value="Muffins">Muffins</option>
              </optgroup>
              <!-- Meat / Protein -->
              <optgroup label="🥩 Meat / Protein">
                <option value="Chicken Breast">Chicken Breast</option>
                <option value="Ground Beef">Ground Beef</option>
                <option value="Turkey Deli Meat">Turkey Deli Meat</option>
                <option value="Tofu">Tofu</option>
                <option value="Peanut Butter">Peanut Butter</option>
                <option value="Dried Lentils">Dried Lentils</option>
              </optgroup>
              <!-- Grains -->
              <optgroup label="🌾 Grains / Pasta / Rice">
                <option value="White Rice">White Rice</option>
                <option value="Brown Rice">Brown Rice</option>
                <option value="Spaghetti Pasta">Spaghetti Pasta</option>
                <option value="Macaroni">Macaroni</option>
                <option value="Oatmeal">Oatmeal</option>
                <option value="Cereal">Cereal</option>
              </optgroup>
              <!-- Beverages -->
              <optgroup label="🥤 Beverages">
                <option value="Bottled Water">Bottled Water</option>
                <option value="Orange Juice">Orange Juice</option>
                <option value="Apple Juice">Apple Juice</option>
                <option value="Shelf-Stable Milk">Shelf-Stable Milk</option>
              </optgroup>
              <!-- Frozen Foods -->
              <optgroup label="❄️ Frozen Foods">
                <option value="Frozen Vegetables">Frozen Vegetables</option>
                <option value="Frozen Pizza">Frozen Pizza</option>
                <option value="Frozen Chicken Nuggets">Frozen Chicken Nuggets</option>
                <option value="Frozen Fruit">Frozen Fruit</option>
                <option value="Ice Cream">Ice Cream</option>
              </optgroup>
              <!-- Snacks -->
              <optgroup label="🍪 Snacks">
                <option value="Granola Bars">Granola Bars</option>
                <option value="Crackers">Crackers</option>
                <option value="Trail Mix">Trail Mix</option>
                <option value="Chips">Chips</option>
                <option value="Cookies">Cookies</option>
              </optgroup>
              <!-- Baby Food -->
              <optgroup label="🍼 Baby Food">
                <option value="Baby Formula">Baby Formula</option>
                <option value="Baby Cereal">Baby Cereal</option>
                <option value="Baby Food Pouches">Baby Food Pouches</option>
              </optgroup>
              <!-- Prepared Meals -->
              <optgroup label="🍱 Prepared Meals">
                <option value="Boxed Mac & Cheese">Boxed Mac & Cheese</option>
                <option value="Instant Ramen">Instant Ramen</option>
                <option value="Microwavable Meals">Microwavable Meals</option>
                <option value="Canned Ravioli">Canned Ravioli</option>
              </optgroup>
              <!-- Other -->
              <option value="other">📝 Other (type your own)</option>
            </select>
          </div>

          <!-- Custom Food Name (shown when "Other" selected) -->
          <div id="custom-food-name-group" class="mb-5 hidden">
            <label for="food-name-custom" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Custom Food Name <span class="text-red-500">*</span>
            </label>
            <input type="text" id="food-name-custom" placeholder="Type your food item name..."
              class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
          </div>

          <!-- Hidden input that holds the final food name value -->
          <input type="hidden" id="food-name" value="">

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

<!-- Auto-fill Toast -->
<div id="autofill-toast" class="fixed bottom-6 right-6 z-50 hidden">
  <div class="flex items-center gap-3 px-5 py-4 bg-emerald-600 text-white rounded-2xl shadow-large animate-slide-up">
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span id="autofill-toast-msg">Auto-filled fields</span>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  // ---------- FOOD PRESETS: auto-fill category, storage, allergens, dietary ----------
  const foodPresets = {
    // Canned Goods
    'Canned Tomato Soup':      { category: 'canned', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegetarian'] },
    'Canned Chicken Soup':     { category: 'canned', storage: 'room-temp', allergens: ['gluten'], dietary: [] },
    'Canned Vegetables':       { category: 'canned', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Canned Beans':            { category: 'canned', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Canned Tuna':             { category: 'canned', storage: 'room-temp', allergens: ['fish'], dietary: ['gluten-free'] },
    'Canned Fruit':            { category: 'canned', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Canned Corn':             { category: 'canned', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Canned Chili':            { category: 'canned', storage: 'room-temp', allergens: [], dietary: ['gluten-free'] },
    // Fresh Produce
    'Fresh Apples':            { category: 'fresh-produce', storage: 'cool-dry', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free', 'organic'] },
    'Fresh Bananas':           { category: 'fresh-produce', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Fresh Oranges':           { category: 'fresh-produce', storage: 'cool-dry', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Fresh Carrots':           { category: 'fresh-produce', storage: 'refrigerated', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Fresh Potatoes':          { category: 'fresh-produce', storage: 'cool-dry', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Fresh Tomatoes':          { category: 'fresh-produce', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Mixed Salad Greens':      { category: 'fresh-produce', storage: 'refrigerated', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Fresh Onions':            { category: 'fresh-produce', storage: 'cool-dry', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    // Dairy
    'Whole Milk':              { category: 'dairy', storage: 'refrigerated', allergens: ['dairy'], dietary: ['vegetarian', 'gluten-free'] },
    'Cheddar Cheese':          { category: 'dairy', storage: 'refrigerated', allergens: ['dairy'], dietary: ['vegetarian', 'gluten-free'] },
    'Yogurt':                  { category: 'dairy', storage: 'refrigerated', allergens: ['dairy'], dietary: ['vegetarian', 'gluten-free'] },
    'Butter':                  { category: 'dairy', storage: 'refrigerated', allergens: ['dairy'], dietary: ['vegetarian', 'gluten-free'] },
    'Eggs':                    { category: 'dairy', storage: 'refrigerated', allergens: ['eggs'], dietary: ['vegetarian', 'gluten-free'] },
    'Cream Cheese':            { category: 'dairy', storage: 'refrigerated', allergens: ['dairy'], dietary: ['vegetarian', 'gluten-free'] },
    // Bakery
    'White Bread':             { category: 'bakery', storage: 'room-temp', allergens: ['gluten', 'soy'], dietary: ['vegetarian'] },
    'Whole Wheat Bread':       { category: 'bakery', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegetarian'] },
    'Bagels':                  { category: 'bakery', storage: 'room-temp', allergens: ['gluten', 'eggs'], dietary: ['vegetarian'] },
    'Tortillas':               { category: 'bakery', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegetarian', 'vegan'] },
    'Dinner Rolls':            { category: 'bakery', storage: 'room-temp', allergens: ['gluten', 'dairy', 'eggs'], dietary: ['vegetarian'] },
    'Muffins':                 { category: 'bakery', storage: 'room-temp', allergens: ['gluten', 'dairy', 'eggs'], dietary: ['vegetarian'] },
    // Meat / Protein
    'Chicken Breast':          { category: 'meat-protein', storage: 'refrigerated', allergens: [], dietary: ['gluten-free', 'halal'] },
    'Ground Beef':             { category: 'meat-protein', storage: 'refrigerated', allergens: [], dietary: ['gluten-free'] },
    'Turkey Deli Meat':        { category: 'meat-protein', storage: 'refrigerated', allergens: [], dietary: ['gluten-free'] },
    'Tofu':                    { category: 'meat-protein', storage: 'refrigerated', allergens: ['soy'], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Peanut Butter':           { category: 'meat-protein', storage: 'room-temp', allergens: ['nuts'], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Dried Lentils':           { category: 'meat-protein', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    // Grains
    'White Rice':              { category: 'grains', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Brown Rice':              { category: 'grains', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Spaghetti Pasta':         { category: 'grains', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegan', 'vegetarian'] },
    'Macaroni':                { category: 'grains', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegan', 'vegetarian'] },
    'Oatmeal':                 { category: 'grains', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegan', 'vegetarian'] },
    'Cereal':                  { category: 'grains', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegetarian'] },
    // Beverages
    'Bottled Water':           { category: 'beverages', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Orange Juice':            { category: 'beverages', storage: 'refrigerated', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Apple Juice':             { category: 'beverages', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Shelf-Stable Milk':       { category: 'beverages', storage: 'room-temp', allergens: ['dairy'], dietary: ['vegetarian', 'gluten-free'] },
    // Frozen Foods
    'Frozen Vegetables':       { category: 'frozen', storage: 'frozen', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Frozen Pizza':            { category: 'frozen', storage: 'frozen', allergens: ['gluten', 'dairy'], dietary: ['vegetarian'] },
    'Frozen Chicken Nuggets':  { category: 'frozen', storage: 'frozen', allergens: ['gluten'], dietary: [] },
    'Frozen Fruit':            { category: 'frozen', storage: 'frozen', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Ice Cream':               { category: 'frozen', storage: 'frozen', allergens: ['dairy', 'eggs'], dietary: ['vegetarian', 'gluten-free'] },
    // Snacks
    'Granola Bars':            { category: 'snacks', storage: 'room-temp', allergens: ['gluten', 'nuts'], dietary: ['vegetarian'] },
    'Crackers':                { category: 'snacks', storage: 'room-temp', allergens: ['gluten'], dietary: ['vegetarian'] },
    'Trail Mix':               { category: 'snacks', storage: 'room-temp', allergens: ['nuts'], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Chips':                   { category: 'snacks', storage: 'room-temp', allergens: [], dietary: ['vegan', 'vegetarian', 'gluten-free'] },
    'Cookies':                 { category: 'snacks', storage: 'room-temp', allergens: ['gluten', 'dairy', 'eggs'], dietary: ['vegetarian'] },
    // Baby Food
    'Baby Formula':            { category: 'baby-food', storage: 'room-temp', allergens: ['dairy', 'soy'], dietary: [] },
    'Baby Cereal':             { category: 'baby-food', storage: 'room-temp', allergens: [], dietary: ['vegetarian'] },
    'Baby Food Pouches':       { category: 'baby-food', storage: 'room-temp', allergens: [], dietary: ['vegetarian'] },
    // Prepared Meals
    'Boxed Mac & Cheese':      { category: 'prepared-meals', storage: 'room-temp', allergens: ['gluten', 'dairy'], dietary: ['vegetarian'] },
    'Instant Ramen':           { category: 'prepared-meals', storage: 'room-temp', allergens: ['gluten', 'soy'], dietary: ['vegetarian'] },
    'Microwavable Meals':      { category: 'prepared-meals', storage: 'frozen', allergens: ['gluten'], dietary: [] },
    'Canned Ravioli':          { category: 'prepared-meals', storage: 'room-temp', allergens: ['gluten', 'dairy'], dietary: ['vegetarian'] },
  };

  // Apply preset auto-fill or clear for "other"
  function applyFoodPreset(foodName) {
    const preset = foodPresets[foodName];
    const isOther = (foodName === 'other' || !preset);
    const customGroup = document.getElementById('custom-food-name-group');
    const customInput = document.getElementById('food-name-custom');
    const hiddenInput = document.getElementById('food-name');

    if (foodName === 'other') {
      // Show custom input, clear all auto-fill fields
      customGroup.classList.remove('hidden');
      customInput.required = true;
      customInput.focus();
      hiddenInput.value = '';
      clearAutoFillFields();
    } else if (preset) {
      // Hide custom input, set hidden food name, auto-fill fields
      customGroup.classList.add('hidden');
      customInput.required = false;
      customInput.value = '';
      hiddenInput.value = foodName;
      // Category
      document.getElementById('food-category').value = preset.category;
      // Storage
      document.getElementById('storage-type').value = preset.storage;
      // Allergens — uncheck all, then check matching
      document.querySelectorAll('input[name="allergens"]').forEach(cb => { cb.checked = false; });
      if (preset.allergens.length === 0) {
        const noneCb = document.querySelector('input[name="allergens"][value="none"]');
        if (noneCb) noneCb.checked = true;
      } else {
        preset.allergens.forEach(a => {
          const cb = document.querySelector(`input[name="allergens"][value="${a}"]`);
          if (cb) cb.checked = true;
        });
      }
      // Dietary tags — uncheck all, then check matching
      document.querySelectorAll('input[name="dietary"]').forEach(cb => { cb.checked = false; });
      preset.dietary.forEach(d => {
        const cb = document.querySelector(`input[name="dietary"][value="${d}"]`);
        if (cb) cb.checked = true;
      });
      // Flash a brief confirmation
      showAutoFillToast(foodName);
    } else {
      customGroup.classList.add('hidden');
      hiddenInput.value = '';
    }
  }

  function clearAutoFillFields() {
    document.getElementById('food-category').value = '';
    document.getElementById('storage-type').value = '';
    document.querySelectorAll('input[name="allergens"]').forEach(cb => { cb.checked = false; });
    document.querySelectorAll('input[name="dietary"]').forEach(cb => { cb.checked = false; });
  }

  function showAutoFillToast(foodName) {
    const toast = document.getElementById('autofill-toast');
    document.getElementById('autofill-toast-msg').textContent = `Auto-filled fields for "${foodName}"`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
  }

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
        input.addEventListener('change', () => {
          input.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
        }, { once: true });
      }
    });
    // Extra check: ensure food-name hidden input has a value on step 1
    if (step === 1) {
      const foodName = document.getElementById('food-name').value.trim();
      if (!foodName) {
        const sel = document.getElementById('food-name-select');
        const custom = document.getElementById('food-name-custom');
        const target = sel.value === 'other' ? custom : sel;
        target.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        target.addEventListener('input', () => target.classList.remove('ring-2', 'ring-red-500', 'border-red-500'), { once: true });
        target.addEventListener('change', () => target.classList.remove('ring-2', 'ring-red-500', 'border-red-500'), { once: true });
        valid = false;
      }
    }
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

    // Food name dropdown -> auto-fill
    document.getElementById('food-name-select').addEventListener('change', function() {
      applyFoodPreset(this.value);
    });

    // Custom food name input -> sync to hidden input
    document.getElementById('food-name-custom').addEventListener('input', function() {
      document.getElementById('food-name').value = this.value.trim();
    });

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
      const res = await fetch(`${pythonURI}/api/donations`, {
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
    donationData.status = 'posted';

    // Save to localStorage as backup
    const donations = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    donations.push(donationData);
    localStorage.setItem('hh_donations', JSON.stringify(donations));

    // Redirect to barcode page with data
    sessionStorage.setItem('hh_current_donation', JSON.stringify(donationData));
    window.location.href = `{{site.baseurl}}/donate/barcode?id=${encodeURIComponent(donationId)}`;
  };
</script>
