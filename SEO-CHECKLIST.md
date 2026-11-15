# SEO plan: Google Pakistan, Karachi local search and AI answers

Nobody can guarantee position 1. What follows is everything that moves the needle: what is now built
into the site, and the off-site steps only you can do (these matter most for "Karachi" searches).

## Built into the website (v4)
**New pages (each with answer-first intro, tables, FAQs, FAQ + breadcrumb schema, internal links)**
- /candy-shop-karachi: "buy candy online in Karachi"
- /candy-delivery-karachi: minimum order + delivery charge for every Karachi area (DHA, Clifton, Gulshan...)
- /candy-delivery-pakistan: minimum order by province, builty, cities shipped to
- /candy-price-list-pakistan: all products with box/carton prices + Product/Offer schema (price in PKR)
- /rani-fruit-candy: brand page, price, flavours, Product schema
- Existing: /wedding-candy-favours-karachi, /custom-order, /products, /catalogue

**On-page and technical**
- Homepage: new title/description, "Karachi, Pakistan" in the hero, crawlable text + FAQ (FAQ schema), links to all new pages
- Static HTML tables of prices and delivery rules (the shop grids are JavaScript, and AI crawlers often do not run JavaScript)
- Organization schema with Karachi/Pakistan service area; en-PK language tags; canonical + hreflang on every page
- sitemap.xml now lists every indexable page (the Karachi wedding page was missing before)
- robots.txt allows Google, Bing and AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended)
- llms.txt and llms-full.txt: plain-text summary + full price list and delivery rules for AI assistants
- 404 page set to noindex; footer links to the new pages on every page; fixed missing hero images (-v2 files)

## Do these now (week 1)
1. **Google Business Profile** (business.google.com): category "Candy store" / "Confectionery". Use the same name,
   phone (+92 341 3905030), website and a Karachi service area. This drives Google Maps and "near me", and it is
   one of the main sources AI assistants use for local answers. Add real photos weekly.
2. **Google Search Console**: add https://www.blessconcandy.com, submit sitemap.xml, then URL Inspection > Request
   indexing for the 5 new pages and the homepage.
3. **Bing Webmaster Tools** (import from Search Console): Bing's index feeds ChatGPT search and Copilot.
4. **Bing Places** and **Apple Business Connect** listings (same name/phone/website).
5. Put the website link and the word "Karachi" in the Instagram, Facebook and TikTok bios and in WhatsApp Business.

## Weeks 2-8
- **Reviews**: ask every customer for a Google review (send the review link on WhatsApp after delivery). Aim for 20+.
  Reply to each one. Reviews are the strongest local ranking and AI-recommendation signal you control.
- **Citations**: list the business in Pakistani business directories with identical name/phone/website.
- **Backlinks**: get links from Karachi event planners, wedding page owners, shops and bloggers; guest posts such as
  "Wedding favour ideas in Karachi"; local news or food/lifestyle pages.
- **Content**: one new useful page or post every 2 weeks (e.g. "Dholki favour ideas", "Candy for school events").
  Update the price list and the "last updated" dates whenever prices change.
- **Social proof for AI**: AI assistants quote what the web says about you. Consistent mentions on Instagram,
  Facebook, Google reviews and other sites are what make them recommend you.

## Keep consistent
Name "Blesscon Candy", phone +92 341 3905030 and the website URL must be identical on every profile.

## Track
Search Console > Performance (filter Country: Pakistan, queries containing "karachi"), Google Business Profile
insights, and manually ask ChatGPT / Gemini / Perplexity "where to buy candy online in Karachi" monthly.

## Known gaps (worth deciding)
- /wholesale-candy-karachi and the other wholesale pages are redirected to the homepage by _redirects, so they
  cannot rank. "Wholesale candy Karachi" is a strong search term: remove those redirects when wholesale is ready.
- The site does not publish a street address. If you have a public shop/office, add it to the Contact page and
  Google Business Profile (a visible address is a major local ranking factor).
- Prices on the new pages come from the site's product list (main.js). If prices change, regenerate or edit those pages.
