# CIESTA. website

This repository contains the static site for ciestasolutions.com.

Files present:
- index.html
- assets/css/styles.css
- assets/js/app.js
- CNAME (ciestasolutions.com)
- robots.txt
- sitemap.xml

How to edit and publish

Option A — Quick edits (GitHub web editor)
1. Open the file in the repository on GitHub (e.g., index.html) and click the pencil icon to edit.
2. Commit directly to `main` for tiny changes or create a branch and open a PR for larger edits.
3. GitHub Pages will publish changes from `main` automatically (or via the Pages Actions workflow).

Option B — Local workflow (recommended for larger changes)
1. git clone git@github.com:irpetyos-blip/ciestasolutions-website.git
2. cd ciestasolutions-website
3. Edit files locally (VS Code recommended)
4. Preview locally: `python3 -m http.server 8000` and open http://localhost:8000
5. git add . && git commit -m "Describe your changes"
6. git push origin main

Notes about GitHub Actions / Deploy workflow
- A Pages deploy workflow file is included at `.github/workflows/deploy-pages.yml`. When pushed to `main`, it will run and publish the site via GitHub Pages.
- If you do not see the workflow in the Actions tab, ensure you have branch protection / required checks configured appropriately.

Placeholders to update (you said you'd add these later):
- Calendly booking link: replace the `href` on the element with id `calendly-link` in `index.html`.
- Questionnaire link: replace the `href` on the element with id `questionnaire-link` in `index.html`.

Contact form (optional)
- To use Formspree (recommended for static sites):
  1. Create a free Formspree form and get the endpoint URL (e.g., `https://formspree.io/f/xxxxxxx`).
  2. Add the form markup (example in README or ask me to add it).

SEO & sitemap
- The site includes `sitemap.xml` and `robots.txt`. Keep them updated when you add pages.

Analytics
- To add Google Analytics (GA4), provide your Measurement ID (G-XXXXXXXX) and add the snippet to the `<head>`.

Uptime monitoring
- I can configure an UptimeRobot monitor if you provide the alert email.
