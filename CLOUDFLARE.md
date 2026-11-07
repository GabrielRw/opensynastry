# Cloudflare deployment

This branch starts from deployed production commit `792028ac1a26285c46037619a60865bb5ea1d143` and adds Cloudflare Workers hosting alongside the original Next.js commands.

Run `npm ci` and `npm run build:vinext`, then deploy with `npx cf deploy --prebuilt --secrets-file /path/to/private-secrets.json`. Supply the original `ASTRO_API_KEY` as a server secret; never commit it. The configuration uses an R2 bucket and SQLite Durable Object for persistent revalidation caching. R2 must be active before deployment. Vinext initialization also updates React and React DOM to 19.3.1 and adds the matching React Server Components dependency.

The test deployment is https://opensynastry.gabriel-naulleau.workers.dev. The custom domain synastry.freeastroapi.com is attached. It previously returnedNXDOMAIN; DNS propagation and browser validation on the custom domain remain pending. Keep the existing Vercel deployment until browser interaction, API calculations, resource limits, and custom-domain routing have been verified. Git auto-deployment remains pending.

Before cutover, record all existing Cloudflare routes and preserve DNS. Attach only `synastry.freeastroapi.com` after validation. Remove only newly created routes to return traffic to Vercel. Do not alter other FreeAstroAPI subdomains or the API origin.
