# Gulaab — a Diwali surprise for Ladoo

At first glance this looks like a luxury Indian festive-couture boutique. The further you explore, the more personal it gets, until it's clear the whole boutique was built as a Diwali gift for Ladoo.

## The journey

| Page | What happens |
|---|---|
| `index.html` — Home | A personal welcome animation (a diya lights itself, "Welcome, Ladoo"). Then the hero, a live countdown to Lakshmi Puja (8 Nov 2026), shop-by-category tiles, the featured Diwali Edit, the brand story, and an appointment "reserved for one". |
| `collection.html` — The Festive Edit | 16 products with category filters, sorting, hover image swap, wishlist, and a quick view with an image gallery and hover zoom. Items go into a working bag. At checkout the total comes to ₹0, with a note revealing the store was made for Ladoo. |
| `styling.html` — Styling Room | "Your Diwali Look, Your Rules." Build a look (outfit, jewellery, finishing touch), use "Surprise me", or play the "Help me choose your Diwali look" quiz. The chosen look is remembered for the finale. |
| `surprise.html` — The Diwali Surprise | A dark back room. Tap five diyas to light them. The quote appears word by word, then the personal letter is revealed. |
| `gift.html` — A Little Something | A wrapped gift box that opens to "Because you deserve little surprises and big smiles.", and a greeting card that opens like a book. |
| `celebrate.html` — Final Celebration | A marigold toran, a rotating rangoli, a ring of clickable diyas, fireworks wherever you tap, the final message, and "Celebrate Again ✨", which replays the experience from the welcome. |
| `roses.html` — The Rose Room | The original "Pink Roses for Ladoo" page, unchanged apart from a link back to the gift. |

Every page also has:
- page transitions
- floating golden particles
- a working shopping bag that is saved between visits
- optional festive music (a soft raag played live by the browser, with no audio files), switched on with the ♫ bars in the header

## Photos

All photography is set in **`assets/js/data.js` → `IMG`**. The fashion photos link to Unsplash. If a photo fails to load, a designed burgundy-and-gold tile appears instead of a broken image.

To use your own photos, put the files in `assets/img/` and change the entries in `IMG`, for example:

```js
sareeSilk: 'assets/img/my-saree.jpg',
```

## Running it

Plain static HTML, CSS and JS with no build step. Open `index.html`, or host the folder anywhere: GitHub Pages, Netlify or Vercel.
