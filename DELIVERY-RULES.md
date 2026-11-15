# Delivery & Minimum Order Rules

Checked at checkout when the customer picks **State -> City -> Area (Karachi only)**.
The minimum is applied to the **candy subtotal**; delivery is charged separately.
Everything is edited in one place: the `DELIVERY & MINIMUM ORDER RULES` block near the top of `main.js`.

## Karachi (from "Karachi Delivery & Minimum Order Plan", 30 Oct 2026)
| One-way distance | Minimum order | Delivery charge |
|---|---|---|
| Up to 5 km | Rs. 500 | Rs. 250 |
| Over 5 to 10 km | Rs. 1,000 | Rs. 450 |
| Over 10 to 15 km | Rs. 1,500 | Rs. 600 |
| Over 15 to 20 km | Rs. 2,000 | Rs. 750 |
| Over 20 to 30 km | Rs. 3,000 | Rs. 1,100 |
| Over 30 to 40 km | Rs. 4,000 | Rs. 1,450 |
| Over 40 km | Rs. 5,000 | Quoted by team (confirm route first) |
| Area not listed | Rs. 4,000 (until team confirms zone) | Quoted by team |

Areas are preliminary groupings (see the PDF note): blocks of one area can fall in different zones,
so the customer can paste a Google Maps pin and the team confirms the final zone.

## Rest of Pakistan (suggested - edit `OUT_MIN` in main.js)
| State / region | Minimum order | Builty (freight) |
|---|---|---|
| Sindh (outside Karachi) and Hub (Balochistan) | Rs. 10,000 | Shared by team after order |
| Punjab, Islamabad, Balochistan | Rs. 15,000 | Shared by team after order |
| Khyber Pakhtunkhwa, Azad Kashmir, Gilgit-Baltistan | Rs. 20,000 | Shared by team after order |

Basis: these orders go out by cargo/bus, so the order should be worth roughly one to three full cartons
(a RANI carton is Rs. 7,200, Fruity Galas Rs. 4,800, Zoombie Rs. 5,760, energy Rs. 9,000, gift pack Rs. 12,960).
Please check against your real purchase prices before launch.

## Notes
- Enforced in the browser (the shop sends orders by WhatsApp/email, so there is no server to re-check).
- Wholesale pages are unchanged: the sales team shares wholesale prices and quantities separately.
- Cache-busting: pages load `main.js?v=min1` and `style.css?v=min1`; bump the number on the next change.
