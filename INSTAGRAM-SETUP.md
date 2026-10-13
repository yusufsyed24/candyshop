# Instagram feed – one-time setup

The homepage section "Fresh from Instagram" reads your latest posts through `/api/instagram`
(a Cloudflare Pages Function in `functions/api/instagram.js`). New posts appear on the site
automatically (refreshes about every 15 minutes).

## 1. Make the account eligible
Instagram app → Settings → Account type → switch @blessconcandy to **Professional (Business or Creator)**. It is free.

## 2. Create the access token (free, ~10 min)
1. Go to https://developers.facebook.com → My Apps → Create App → type **Business** (or "Other").
2. Add the product **Instagram** → "API setup with Instagram login".
3. Under "Generate access tokens", click **Add account**, log in as @blessconcandy and approve.
4. Click **Generate token** and copy it.
   (Tokens made this way are long-lived: valid 60 days.)

## 3. Give the token to the website
Cloudflare dashboard → Workers & Pages → your site → Settings → Variables and Secrets →
add **IG_ACCESS_TOKEN** (type: Secret) = the token → Save → redeploy (upload the folder again).

## 4. Keep it alive
Before 60 days pass, open this link once (replace TOKEN) and put the new token it returns in Cloudflare:
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN
(The token must be at least 24 hours old. Set a 50-day phone reminder.)

Until the token is added, the section shows product photos with a "See our latest on Instagram" link.
