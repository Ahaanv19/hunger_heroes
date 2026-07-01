# Hunger Heroes Frontend

Hunger Heroes is a Jekyll-based frontend for a food rescue platform that connects surplus food from restaurants, events, and households to nearby shelters and food banks. The site supports the main donation flows in the project, including creating a donation, matching donors and receivers, scanning labels, browsing donations, and reviewing donation history.

The frontend talks to two backend services: a primary Java Spring Boot API and a Flask fallback API. The API endpoints are configured in `assets/js/api/config.js`, and the site reuses those settings through the shared donation API helpers in `assets/js/api/donationApi.js`.

## Setup

1. Install Ruby and Bundler. If you are using the same Ruby version as the repo, Bundler 2.7.2 is a safe choice.compsci

```bash
gem install bundler:2.7.2
bundle install
```

2. Install the Python dependencies if you plan to run the helper scripts in `scripts/`.

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Update `assets/js/api/config.js` with the local backend URLs you want to use.

```js
javaURI = "http://localhost:8286";
pythonURI = "http://localhost:8288";
```

4. Start the site locally with Jekyll.

Run the makefile:

```bash
make
```

if that does not work, you can try running:

```bash
bundle exec jekyll serve -H 127.0.0.1 -P 4887
```

Then open `http://127.0.0.1:4887/hunger_heroes/` in your browser.

## Notes

- If Bundler is missing or the version is mismatched, rerun `bundle install` after installing the correct Ruby environment.
- Production deployments should configure TLS, cookies, and CORS on both backend services.