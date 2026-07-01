---
layout: base
title: Login
permalink: /login
search_exclude: true
---

<main class="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">

  <!-- Background Glow Blob -->
  <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-300 dark:bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>

  <!-- Login & Signup Forms -->
  <div class="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center items-stretch">
    
    <!-- Login Form -->
    <div class="flex-1 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">User Login</h2>
      <form id="pythonForm" onsubmit="pythonLogin(); return false;" class="space-y-6">
        <div>
          <label for="uid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input type="text" id="uid" name="uid" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" id="password" name="password" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <p id="message" class="text-sm text-red-500 font-medium"></p>
        <button type="submit"
          class="w-full py-2 px-4 bg-primary hover:bg-secondary text-black font-semibold rounded-lg shadow-md transition transform hover:scale-105 duration-300">
          Login 🚀
        </button>
      </form>
    </div>

    <!-- Signup Form -->
    <div class="flex-1 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">Sign Up: Create an Account for Free!</h2>
      <form id="signupForm" onsubmit="signup(); return false;" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input type="text" id="name" name="name" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <div>
          <label for="signupUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input type="text" id="signupUid" name="signupUid" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <div>
          <label for="signupPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" id="signupPassword" name="signupPassword" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <p id="signupMessage" class="text-sm text-green-500 font-medium"></p>
        <button type="submit"
          class="w-full py-2 px-4 bg-primary hover:bg-secondary text-black font-semibold rounded-lg shadow-md transition transform hover:scale-105 duration-300">
          Sign Up 📝
        </button>
      </form>
    </div>
  </div>
</main>

<script type="module">
  import { login, pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  // ── Login to BOTH Flask and Spring simultaneously ──
  window.pythonLogin = function() {
    const uid = document.getElementById("uid").value;
    const password = document.getElementById("password").value;

    document.getElementById("message").textContent = "Logging in…";

    // Wrap both logins in Promises, redirect after both finish
    const flaskPromise = new Promise((resolve) => {
      const options = {
        URL: `${pythonURI}/api/authenticate`,
        callback: () => { console.log('✅ Flask login success'); resolve('flask-ok'); },
        message: "message",
        method: "POST",
        cache: "no-cache",
        body: { uid, password }
      };
      login(options);
      // login() may not call callback on failure, so set a timeout fallback
      setTimeout(() => resolve('flask-timeout'), 5000);
    });

    const springPromise = fetch(`${javaURI}/authenticate`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({ uid, password })
    })
    .then(response => {
      if (!response.ok) {
        // If Spring login fails, try auto-creating the account, then retry login
        console.log('Spring login failed, attempting auto-signup…');
        return fetch(`${javaURI}/api/person/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: uid,
            sid: "0000000",
            email: uid + "@gmail.com",
            dob: "01-01-2000",
            name: uid,
            password: password,
            kasmServerNeeded: false
          })
        })
        .then(() => fetch(`${javaURI}/authenticate`, {
          ...fetchOptions,
          method: "POST",
          body: JSON.stringify({ uid, password })
        }))
        .then(retryRes => {
          if (retryRes.ok) console.log('✅ Spring login success (after auto-signup)');
          else console.warn('⚠️ Spring login failed even after signup');
          return retryRes;
        });
      }
      console.log('✅ Spring login success');
      return response;
    })
    .catch(err => {
      console.warn('⚠️ Spring unavailable:', err.message);
    });

    Promise.allSettled([flaskPromise, springPromise]).then(() => {
      window.location.href = '{{site.baseurl}}/profile';
    });
  }

  // ── Signup to BOTH backends ──
  window.signup = function() {
    const signupButton = document.querySelector("#signupForm button");
    signupButton.disabled = true;
    signupButton.style.backgroundColor = '#d3d3d3';

    const name = document.getElementById("name").value;
    const uid = document.getElementById("signupUid").value;
    const password = document.getElementById("signupPassword").value;

    // Flask signup
    const flaskPromise = fetch(`${pythonURI}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, uid, password })
    })
    .then(response => {
      if (!response.ok) throw new Error(`Flask: ${response.status}`);
      return response.json();
    })
    .then(() => console.log('✅ Flask signup success'))
    .catch(err => console.warn('⚠️ Flask signup failed:', err.message));

    // Spring signup
    const springPromise = fetch(`${javaURI}/api/person/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: uid,
        sid: "0000000",
        email: uid + "@gmail.com",
        dob: "01-01-2000",
        name: name,
        password: password,
        kasmServerNeeded: false
      })
    })
    .then(response => {
      if (!response.ok) throw new Error(`Spring: ${response.status}`);
      return response.json();
    })
    .then(() => console.log('✅ Spring signup success'))
    .catch(err => console.warn('⚠️ Spring signup failed:', err.message));

    Promise.allSettled([flaskPromise, springPromise]).then(results => {
      const anySuccess = results.some(r => r.status === 'fulfilled');
      if (anySuccess) {
        document.getElementById("signupMessage").textContent = "Signup successful! You can now login.";
        document.getElementById("signupMessage").style.color = '#22c55e';
      } else {
        document.getElementById("signupMessage").textContent = "Signup failed on both backends. Please try again.";
        document.getElementById("signupMessage").style.color = '#ef4444';
      }
      signupButton.disabled = false;
      signupButton.style.backgroundColor = '';
    });
  }

  window.onload = function() {
    const isAuthenticated = document.cookie.includes('auth_token');
    if (isAuthenticated) {
      fetch(`${pythonURI}/api/user`, fetchOptions)
        .then(response => {
          if (!response.ok) throw new Error(`${response.status}`);
          return response.json();
        })
        .then(() => { window.location.href = '{{site.baseurl}}/profile'; })
        .catch(() => {});
    }
  };
</script>
