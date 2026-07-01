---
toc: true
layout: post
title: SRP & API Chaining — Frontend Architecture
permalink: /srp_api_chaining/
comments: true
categories: [Design / Architecture]
---

## Introduction — Why Refactor?

Hunger Heroes started as a rapid prototype — every page had its own copy of fetch logic, error handling, and UI helpers. As the platform grew to **8 feature pages** connecting to **two backends** (Flask + Spring Boot), duplicated code became a maintenance nightmare. One bug fix required editing the same function in 8 different files.

We adopted two core principles to fix this:

1. **Single Responsibility Principle (SRP)** — every function does exactly one thing
2. **API Chaining** — dual-backend calls follow a clear fallback pipeline

This post explains the architecture, shows real code, and maps it to **AP Computer Science Principles (APCSP)** Big Ideas.

---

## Architecture Overview

### The 5-Layer Pattern

Every page in Hunger Heroes follows the same 5-layer structure:

```
┌───────────────────────────────────────┐
│  1. ERROR CONFIG                      │  ← Constants, error messages
├───────────────────────────────────────┤
│  2. API WORKERS                       │  ← One fetch = one function
├───────────────────────────────────────┤
│  3. DATA TRANSFORMERS                 │  ← Normalize, compute, sort
├───────────────────────────────────────┤
│  4. UI RENDERERS                      │  ← Build HTML, update DOM
├───────────────────────────────────────┤
│  5. ORCHESTRATORS                     │  ← Wire layers together
└───────────────────────────────────────┘
```

**Layer 1 — Error Config**: Centralized error types and human-readable messages. No magic strings scattered in catch blocks.

**Layer 2 — API Workers**: Each worker does exactly one API call. `postToSpring()` posts to Spring. `postToFlask()` posts to Flask. That's it. No UI, no branching, no side effects.

**Layer 3 — Data Transformers**: Pure functions. Input → computation → output. `computeUrgency(donation)` calculates time remaining and returns a typed urgency object. `normalizeStatus(raw)` cleans up backend-inconsistent status strings.

**Layer 4 — UI Renderers**: Take data, produce HTML. `renderDonationCard(donation)` builds a card. `showToast(msg, type)` shows a notification. They don't fetch; they don't decide.

**Layer 5 — Orchestrators**: The conductors. They call workers, pass results to transformers, then hand off to renderers. This is the only layer with control flow and branching logic.

---

## Shared Module — `donationApi.js`

Instead of copy-pasting utility functions into each page, we created a single shared module:

```
assets/js/api/donationApi.js  (~290 lines)
```

Every page imports what it needs:

```javascript
import {
  javaURI, pythonURI, fetchOptions,
  springFetch, flaskFetch, dualFetch, dualPost,
  computeUrgency, urgencyBadge, sortByUrgency,
  normalizeStatus, statusBadge, sourceBadge,
  normalizeDonationList, generateLocalId,
  getLocalDonations, saveLocalDonation, cleanupLocalDonations,
  showToast, errorPlaceholder, emptyPlaceholder,
  CATEGORY_EMOJIS, ERROR_TYPES, ERROR_MESSAGES, getErrorMessage
} from '{{site.baseurl}}/assets/js/api/donationApi.js';
```

### Key Exports Explained

| Export | Layer | Purpose |
|--------|-------|---------|
| `springFetch(url, opts)` | Worker | 8s timeout, typed error handling |
| `flaskFetch(url, opts)` | Worker | 5s timeout, typed error handling |
| `dualFetch(springUrl, flaskUrl, opts, transformFlask)` | Worker | Spring → Flask fallback pipeline |
| `dualPost(endpoint, body)` | Worker | POST to both backends |
| `computeUrgency(donation)` | Transformer | Returns `{level, label, emoji, color, cssClass, hoursLeft}` |
| `urgencyBadge(donation)` | Transformer | HTML badge string |
| `sortByUrgency(donations)` | Transformer | Sort by expiration (most urgent first) |
| `normalizeStatus(raw)` | Transformer | Cleans inconsistent status strings |
| `statusBadge(raw)` | Renderer | Colored status HTML badge |
| `sourceBadge(source)` | Renderer | ☕ Java Spring / 🐍 Flask badge |
| `showToast(msg, type)` | Renderer | Auto-dismissing notification |

---

## API Chaining — The Dual-Backend Pattern

### The Problem

We have two independent backends:
- **Spring Boot** (primary) — `localhost:8286` / `hungerherosspring.opencodingsociety.com`
- **Flask** (fallback) — `localhost:8288` / `hungerheros.opencodingsociety.com`

If Spring is down, we still want the app to work. If both are down, we fall back to localStorage.

### The Solution — `dualFetch()`

```javascript
// ── API Worker: Dual Fetch (Spring → Flask fallback) ──
async function dualFetch(springUrl, flaskUrl, opts = {}, transformFlask = d => d) {
  try {
    const data = await springFetch(springUrl, opts);
    return { data, source: 'spring' };
  } catch {
    const data = await flaskFetch(flaskUrl, opts);
    return { data: transformFlask(data), source: 'flask' };
  }
}
```

Every page uses this same pattern. The orchestrator doesn't know or care which backend answered:

```javascript
// ── Orchestrator: Load Donations ──
async function loadDonations() {
  try {
    const { data, source } = await dualFetch(
      `${javaURI}/api/donations`,
      `${pythonURI}/api/donations`,
      fetchOptions,
      normalizeDonationList        // transform Flask array format
    );
    const sorted = sortByUrgency(data);  // Transformer
    render(sorted, source);              // Renderer
  } catch (err) {
    container.innerHTML = errorPlaceholder(getErrorMessage(err));
  }
}
```

### Three-Tier Fallback on Scan

The scan page has the most complex chain — **Spring → Flask → localStorage**:

```
User scans QR code
  ├── Try Spring:  POST /api/donations/scan  ── success → show result
  ├── Try Flask:   POST /api/donations/scan  ── success → show result
  └── Try Local:   localStorage.getItem()    ── success → show result (offline mode)
```

Each tier is its own worker function (`trySpringScan()`, `tryFlaskScan()`, `tryLocalStorage()`), and the orchestrator (`lookupDonation()`) chains them with try/catch.

---

## Urgency System

### How It Works

Every donation has a `prepared_at` timestamp. The frontend computes urgency in real-time:

```javascript
function computeUrgency(donation) {
  const created = new Date(donation.prepared_at || donation.created_at || donation.timeCreated);
  const hoursElapsed = (Date.now() - created.getTime()) / 3600000;
  const shelfLife = donation.shelf_life_hours || 4;
  const hoursLeft = Math.max(0, shelfLife - hoursElapsed);

  if (hoursLeft <= 0) return { level: 'expired', emoji: '⚫', label: 'Expired', ... };
  if (hoursLeft < 1)  return { level: 'urgent',  emoji: '🔴', label: 'Urgent',  ... };
  if (hoursLeft <= 3) return { level: 'expiring', emoji: '🟡', label: 'Expiring Soon', ... };
  return                      { level: 'fresh',   emoji: '🟢', label: 'Fresh',   ... };
}
```

### Visual Indicators

| Level | Emoji | Badge Color | Meaning |
|-------|-------|-------------|---------|
| Fresh | 🟢 | Green | More than 3 hours left |
| Expiring Soon | 🟡 | Orange | 1–3 hours remaining |
| Urgent | 🔴 | Red | Less than 1 hour |
| Expired | ⚫ | Gray | Time's up |

Urgency badges appear on:
- **Browse** page — every donation card
- **Manage** page — donor's own donations
- **Match** page — search result cards
- **Scan** page — urgent warnings banner after scanning

### Auto-Sorting

`sortByUrgency(donations)` places the most urgent items first, so volunteers see the items that need immediate pickup at the top.

---

## SRP in Action — Real Examples

### ❌ Before (Everything in One Function)

```javascript
async function loadAndRenderDonations() {
  try {
    let response = await fetch(javaURI + '/api/donations', fetchOptions);
    if (!response.ok) {
      response = await fetch(pythonURI + '/api/donations', fetchOptions);
    }
    const data = await response.json();
    let html = '';
    data.forEach(d => {
      const status = d.status || d.donation_status || 'unknown';
      const badge = status === 'posted' ? '<span class="badge green">Active</span>' : '...';
      html += `<div class="card">${d.food_name} ${badge}</div>`;
    });
    document.getElementById('container').innerHTML = html;
  } catch (err) {
    document.getElementById('container').innerHTML = '<p>Error loading</p>';
  }
}
```

**Problems**: Fetching + fallback + normalization + rendering + error handling all in one block. Impossible to test, reuse, or debug.

### ✅ After (SRP)

```javascript
// ── Worker ──
// dualFetch() handles Spring → Flask fallback

// ── Transformer ──
// normalizeStatus() cleans status strings
// sortByUrgency() orders by expiration

// ── Renderer ──
function renderDonationCard(donation, source) {
  return `
    <div class="card">
      ${donation.food_name}
      ${urgencyBadge(donation)}
      ${statusBadge(donation.status)}
      ${sourceBadge(source)}
    </div>`;
}

// ── Orchestrator ──
async function loadDonations() {
  const { data, source } = await dualFetch(springUrl, flaskUrl, opts, normalizeDonationList);
  const sorted = sortByUrgency(data);
  container.innerHTML = sorted.map(d => renderDonationCard(d, source)).join('');
}
```

**Result**: Each function can be tested, reused, and debugged independently.

---

## APCSP Big Ideas Mapping

### Big Idea 1 — Creative Development
- **CRD-2.B**: We developed the urgency system iteratively — first a simple timer, then a 4-tier color system with auto-sorting
- **CRD-2.G**: The shared `donationApi.js` module was created to eliminate code duplication across 8 pages

### Big Idea 2 — Data
- **DAT-2.A**: Donations are stored as structured objects with typed fields (`food_name`, `category`, `status`, `prepared_at`)
- **DAT-2.E**: `computeUrgency()` transforms raw timestamps into meaningful urgency classifications

### Big Idea 3 — Algorithms and Programming
- **AAP-2.A**: Every function follows SRP — `fetchSpringMatches()` only fetches, `renderMatchCard()` only renders
- **AAP-2.M**: The dual-fetch pattern uses **algorithmic fallback**: try primary → catch → try secondary → catch → local fallback
- **AAP-3.A**: `dualFetch()` is a **procedural abstraction** — 8 pages call it without knowing the internal retry logic

### Big Idea 4 — Computing Systems and Networks
- **CSN-1.B**: The app works across two independent backend servers with graceful degradation
- **CSN-1.D**: API calls use CORS, credentials, timeouts, and error classification for robust networking

### Big Idea 5 — Impact of Computing
- **IOC-1.A**: The platform addresses food waste and hunger — computing used for social good
- **IOC-1.B**: The urgency system prioritizes perishable food, reducing waste in real-time

---

## Pages Refactored

| Page | File | Key SRP Functions | Lines Saved |
|------|------|-------------------|-------------|
| Create | `create.md` | `collectDonationData()`, `postToSpring()`, `postToFlask()` | ~40 |
| Scan | `scan.md` | `trySpringScan()`, `tryFlaskScan()`, `tryLocalStorage()`, `buildUrgencyWarnings()` | ~60 |
| Browse | `browse.md` | `renderBrowseCard()`, `filterByStatus()`, `sortDonations()` | ~50 |
| Manage | `manage.md` | `renderDonationCard()`, `executeDonationAction()`, `filterManage()` | ~50 |
| Match | `match.md` | `fetchSpringMatches()`, `fetchFlaskMatches()`, `renderMatchCard()` | ~45 |
| Leaderboard | `leaderboard.md` | `fetchStats()`, `fetchLeaderboard()`, `animateCounter()` | ~35 |
| Network | `network.md` | `fetchSpringGraph()`, `buildFlaskGraph()`, `renderCommunities()` | ~40 |
| Categories | `categories.md` | `fetchSpringTree()`, `buildFlaskTree()`, `renderTree()` | ~35 |

**Total**: ~355 lines of duplicated code eliminated via shared `donationApi.js` module.

---

## Conclusion

The SRP + API Chaining refactor transformed Hunger Heroes from a working prototype into a maintainable, testable architecture. Every function has one job, every API call has a fallback, and every user sees urgency indicators that help save food before it expires.

The shared module pattern means new pages can be added in minutes — just import the workers and transformers you need, write page-specific renderers, and connect them with an orchestrator.
