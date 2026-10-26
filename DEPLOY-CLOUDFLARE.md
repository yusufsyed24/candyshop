# Blesscon Candy — Cloudflare Pages Direct Upload

This package is prepared for Cloudflare Pages **Direct Upload** (static assets). It intentionally excludes `wrangler.toml` and the Pages Functions folder so the upload does not ask you to use Wrangler.

## Upload using the normal dashboard flow
1. Extract this ZIP on your computer.
2. In Cloudflare Dashboard, open **Workers & Pages**.
3. Choose **Create application** → **Pages** → **Direct Upload** (wording may vary).
4. Upload the extracted folder contents, or upload this ZIP if the dashboard accepts ZIP files. Make sure `index.html` is at the root of the uploaded files, not inside an extra nested folder.
5. Deploy. No build command is needed for this static website.

## Note about Instagram integration
The original package included a Cloudflare Pages Function at `functions/api/instagram.js`. Dashboard drag-and-drop Direct Upload does not deploy that function. This static package omits it to allow normal asset upload; any feature that depends on `/api/instagram` will need Git-based Pages deployment or a separate deployed Worker/Function.

## WhatsApp orders
Website order forms prepare order details in a WhatsApp chat addressed to **+92 341 3905030** (`923413905030`). The customer must press **Send** in WhatsApp; a static website cannot silently send messages in the background.
