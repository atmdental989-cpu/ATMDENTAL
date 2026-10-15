# ATM Dental website (starter version)

A responsive, static product catalogue for ATM Dental. It includes:
- Mobile and desktop layouts
- Search by product name, brand, category or description
- Category filters and price/name sorting
- Indicative product prices
- WhatsApp enquiry links with a prefilled product message
- No backend, paid hosting or payment gateway required

## IMPORTANT before publishing

The 12 catalogue entries and prices in `products.js` are **demo examples only**. They are not verified ATM Dental inventory or current selling prices. Replace them with actual products, brands, prices and units before making the site public. Confirm the WhatsApp number is correct.

## Edit product names and prices

1. Open `products.js` in a text editor (Notepad on Windows or a code editor).
2. Each product is an object between `{` and `}`.
3. Update `name`, `brand`, `category`, `price`, `unit`, `description`, `tag`, and `image`.
4. Keep each product separated by a comma. The price should be a number without the rupee symbol.
5. To add an image, put the image file in the `assets` folder and use a relative path such as `assets/mani-k-files.jpg`. Leave `image: ""` if you do not have an image.
6. Save the file and refresh the page.

The WhatsApp destination is currently set to +91 85908 88979 in `index.html` and `script.js`. If this number changes, update all `918590888979` occurrences. WhatsApp links require the country code and digits only.

## Test on your computer

1. Extract the ZIP file.
2. Open the `index.html` file in Chrome, Edge or Firefox.
3. Test search, category buttons, sorting and an Enquire button.
4. Check the page on a phone too. Product enquiries open WhatsApp in a new tab/app.

## Publish free using GitHub Pages

You can publish this static site at a free address like `https://YOUR-USERNAME.github.io/REPOSITORY/`.

1. Sign in or create an account at https://github.com/.
2. Create a new **public** repository named `atm-dental`.
3. Upload the website files and folders from this ZIP. `index.html` must be at the repository root (not inside an extra nested folder).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait a few minutes. The Pages section will show the published URL.
8. Open the URL on your phone and computer and test the site.

GitHub Pages is free for public repositories, subject to GitHub's current plan terms. The site is public, so do not upload private customer data, credentials or confidential price lists.

## Buy a domain later

Do not spend your whole budget before testing the free site. Once it looks correct:
1. Check whether your preferred domain is available (for example, `atmdental.in` or another name you own/are permitted to use).
2. Compare first-year price, GST and renewal price before checkout.
3. Buy the domain only after confirming the business owner approves the name.
4. In GitHub Pages → Settings → Pages, add the custom domain and follow the DNS instructions shown by GitHub and your domain registrar. DNS changes may take time to propagate.

Domain availability and price are not checked by this starter package. Keep total domain cost under your ₹1,500 budget.

## What this version does not include

- Admin login or online inventory editing
- Database / live stock sync
- Cart, online payments, invoices or customer accounts
- Automatic order confirmation

WhatsApp enquiries are used to avoid monthly backend and payment costs. You can add advanced features later.


## New: edit products, prices and offer cards

All products are in `products.js`. Each product has fields like:

```js
{
  id: 1,
  name: "MANI K-Files",
  brand: "MANI",
  category: "Endodontics",
  price: 320,
  offerPrice: 280,
  offerLabel: "SPECIAL OFFER",
  unit: "per pack",
  description: "Your product description",
  tag: "Popular",
  image: "assets/mani-k-files.jpg"
}
```

- `price`: regular/listed price.
- `offerPrice`: discounted price. It must be lower than `price` for the offer card to appear.
- `offerLabel`: badge shown on the product card, such as `SPECIAL OFFER` or `WEEKEND DEAL`.
- To turn off an offer, set `offerPrice: null` and `offerLabel: ""`.
- A **Special offers** category filter shows only products with a valid discounted price.
- Search and sorting work with the updated product data. Price sorting uses the offer price when one is active.
- WhatsApp enquiry messages use the discounted price when an offer is active and ask the customer to confirm the current price.

The offer prices currently in the demo file are illustrative only. Replace them with approved, real selling prices before publishing.

## Updating the live website after edits

After editing `products.js` locally:
1. Save the file.
2. Open your GitHub repository.
3. Upload the updated `products.js` and choose to replace the existing file.
4. Commit the changes.
5. Refresh the website. If an old version remains, wait a few minutes and reload the page.
