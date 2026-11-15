# Instagram feed on the homepage - setup (no Meta API approval needed)

The homepage bottom section "Fresh from our Instagram" is already built. It shows your
latest Instagram posts and updates itself. Connect ONE option below; until then the
section shows a branded grid linking to your profile.

## Why not scrape Instagram directly?
Hidden endpoints and mirror sites break every few weeks and violate Instagram's terms
(they can also get your account restricted). The options below are stable and allowed.

## Option A - Behold (recommended, ~10 minutes, auto-updates)
1. Go to https://behold.so and create a free account.
2. Connect @blessconcandy - you just LOG IN with Instagram. No Meta developer app,
   no API review, no business verification needed.
3. Create a widget (type: Grid, 8 posts, no header).
4. Copy the embed code and paste it inside the `<div id="ig-feed" ...>` in index.html
   (replace the comment).
5. Upload the site. New posts appear within about 15 minutes of posting.

## Option B - SnapWidget (also free)
https://snapwidget.com - same flow: connect Instagram, create a free grid widget,
copy the embed code into the `<div id="ig-feed">` in index.html.

## Option C - instagram.json (fully under your control)
Edit instagram.json (included as an example) with your post image URLs, post links and
captions; instagram.js renders it as the grid. Manual unless you automate the export.

## SEO tips for the feed
- Use keywords in Instagram captions ("candy Karachi", "wedding favours Karachi",
  "RANI fruit candy").
- Keep the website link in your Instagram bio; keep @blessconcandy consistent everywhere.
- Post 2-3 times a week - fresh posts keep the homepage section fresh, and Google
  revisits pages that change.
- Geo-tag Karachi on posts; a free professional account gives you insights.

## Note on "as soon as I post"
Truly instant push needs Instagram's official API. Widget services poll Instagram, so
updates land within ~15 minutes - effectively live for visitors, zero maintenance.
