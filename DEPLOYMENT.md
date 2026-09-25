# Deployment notes (cPanel)

## Build the public website and admin

Install dependencies and build each Vite app from its own directory:

```sh
cd frontend
npm ci
npm run build

cd ../admin
npm ci
npm run build
```

Upload the contents of each `dist` folder into the matching cPanel document root. The included `.htaccess` files route unknown paths to `index.html`, so reloading BrowserRouter routes such as `/directory` or `/content` serves the SPA instead of Apache's 404. Keep the `.htaccess` file alongside `index.html`. If deploying an app below a URL path instead of a domain document root, set `VITE_BASE_PATH` to that path with a trailing slash before its build (for example `/admin/`). A separate admin subdomain/document root is simpler.

The frontend build uses `VITE_API_URL` (defaults to the local development API URL). Set it to the production API base, including `/api/v1`, before building. For example: `VITE_API_URL=https://api.your-domain.example/api/v1`.

## API and initial admin

Run the backend as a cPanel Node.js application with `backend/dist/server.js` as its entry point. Build it with `npm ci && npm run build` in `backend`, configure MongoDB, and add the variables in `backend/.env.example` in cPanel's environment settings. Set `FRONTEND_URL` and `ADMIN_URL` to the exact HTTPS browser origins. `JWT_SECRET` must be random and at least 32 characters. The first admin is created only when the user collection is empty; after its first successful startup, remove `INITIAL_ADMIN_PASSWORD` from the environment and change the password in Admin → Security. There is no public sign-up route.

Keep the public site, admin and API on HTTPS. The admin session uses an HttpOnly, SameSite=Lax cookie, so configure the admin and API on the same registrable domain. Do not put secret variables into either Vite app; Vite variables are public in the built assets.

## Admin-managed content

After signing in, use **Site Content** for homepage text and slides, bilingual About copy, membership benefits, contact details, SEO metadata and the Deuda playlist. Hotel and event records remain editable in their existing sections. **Inquiries** shows contact forms saved to MongoDB, and lets admins update their status.

## Search visibility

The site includes route-aware titles and descriptions, canonical/Open Graph tags, organization/website/hotel structured data and district-specific Sudurpashchim search terms, including Darchula. `robots.txt` permits crawling. Search placement depends on the search engine's indexing and ranking systems and cannot be guaranteed by metadata alone. Once the final domain is known, submit it to Google Search Console/Bing Webmaster Tools and add a sitemap with that production domain.
