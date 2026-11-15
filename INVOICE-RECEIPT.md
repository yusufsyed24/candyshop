# Order receipt (invoice) for customers

## What happens when an order is placed
1. The order message is sent to your business WhatsApp (+92 341 3905030) - unchanged.
2. A styled INVOICE popup opens for the customer (product, pack, unit price, quantity, line total,
   subtotal, delivery, total payable, customer details, order ID and date) with the Blesscon logo.
3. Two buttons on the invoice:
   - **Send PDF on WhatsApp** - builds a real PDF receipt with the Blesscon logo.
     * Phones/tablets: opens the share sheet with the PDF file; the customer picks WhatsApp
       (and a chat) and the PDF is attached.
     * Desktop browsers (cannot share files): the PDF is downloaded and WhatsApp opens with a
       short message; the customer attaches the downloaded PDF.
     * If the PDF cannot be built (e.g. no internet to load the PDF library) it falls back to the
       old text receipt.
   - **Download PDF** - saves the same PDF (falls back to the browser print dialog if needed).

## Requirements
- The logo is read from `assets/logo.png`, then the live site, then `assets/logo.svg` (same chain as the site header).
- The PDF is generated in the browser with jsPDF 2.5.1, loaded on demand from cdnjs
  (`invoice.js` -> `JSPDF_SRC`). To avoid the external dependency, download that file, put it in
  the site folder and change `JSPDF_SRC` to its path.
- Names/addresses with non-Latin characters (e.g. Urdu script) are shown as "?" in the PDF,
  because the built-in PDF fonts are Latin only.

## Why the customer still taps Send
A static website cannot silently send WhatsApp messages or pick the recipient chat for a file.
Fully automatic delivery of the PDF to the customer's number needs the WhatsApp Business API
(paid, business verification required).

## Custom event orders
custom-order.html sends quote requests, not priced orders, so no invoice is shown there.
