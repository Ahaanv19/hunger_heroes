# Hunger Heroes — Frontend

This repository is the Jekyll-based frontend for the Hunger Heroes food donation platform. It connects to two backends (primary: Java Spring Boot, fallback: Flask) and provides donation creation, scanning, matching, and volunteer workflows.

## Quick setup (macOS)

1. Install Ruby & Bundler (recommended: rbenv or asdf). The site requires Bundler >= 2.7.2 (see Gemfile.lock).

```bash
# Using system ruby (may require sudo for gem install)
gem install bundler:2.7.2
bundle install
```

2. Install Python dependencies (for scripts in `scripts/`):

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Run Jekyll locally:

```bash
bundle exec jekyll serve -H 127.0.0.1 -P 4887
# site will be available at http://127.0.0.1:4887/hunger_heroes/
```

## Environment / API endpoints

The frontend expects two backends. Configure `assets/js/api/config.js` with your local dev addresses:

- `javaURI` — primary Spring Boot backend (e.g. http://localhost:8286)
- `pythonURI` — fallback Flask backend (e.g. http://localhost:8288)

Fetch options (CORS/credentials) are defined in `assets/js/api/config.js` and re-exported by `assets/js/api/donationApi.js`.

## New features in Week 4

- Create flow posts to `/api/donations` (Spring → Flask fallback)
- Barcode page attempts server-side label download (`GET /api/donations/{id}/label`) and falls back to client-side image capture
- Scan page status updates and volunteer assignments use shared helpers with backend fallback
- Loading indicators and toasts wired in for create/scan flows

## Running tests

This project does not currently include an automated E2E suite in-repo. For full E2E tests we recommend using Playwright or Cypress. Example Playwright commands:

```bash
# install locally and run tests (example)
npm init -y
npm i -D @playwright/test
npx playwright test
```

(If you want, I can add a minimal Playwright test suite next.)

## Notes

- If you see a Bundler error ("Could not find 'bundler' ..."), install the required bundler version or use a Ruby version manager.
- For production deployment, ensure TLS, cookie settings, and CORS are configured on both backends.

---

If you'd like, I can now:
- Add Playwright E2E tests for the three user journeys (donor, receiver, volunteer)
- Add a small CI job (GitHub Actions) to run `bundle exec jekyll build` and the Playwright tests
- Record a short demo video script you can use to record the 2-minute tour
