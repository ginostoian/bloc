# Bloc website

Next.js App Router site with Romanian and English routes (`/ro`, `/en`). All content is statically generated. Run `npm run dev` locally; use `npm run lint` and `npm run build` before deployment.

## Launch configuration

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain. It is used for canonical URLs, language alternates and the sitemap. Until then, `https://bloc.ro` is the temporary value from the supplied materials.

The contact form can send directly through the server route using Resend. Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (an address on a verified sending domain) and `CONTACT_TO_EMAIL`. If these are absent, the form opens a prepared message to `salut@bloc.ro` in the visitor's email app. Confirm that mailbox and test real delivery before launch. The route validates input and includes a honeypot; add persistent rate limiting or a bot challenge before substantial paid traffic.

The consent banner saves the visitor's choice locally. No analytics or marketing scripts currently run. If those are added, load them only after the corresponding consent.

Replace the supplied sample figures, response times and project claims after checking them against business records. Complete the legal operator details and have the legal pages reviewed before publication.
