# Nexgensis Product Desk

A responsive product administration dashboard built with plain React, JavaScript, Vite, React Router, Axios, and Tailwind CSS.

## Development setup

```bash
npm install
npm run dev
```

The development server will print the local URL. The production build can be checked with:

```bash
npm run build
npm run preview
```

Demo credentials:

- Username: `emilys`
- Password: `emilyspass`

## Finished features

- Axios client with a shared base URL, auth-token request interceptor, and centralized API error messages.
- Login, logout, persisted session, protected product routes, and duplicate-submit protection.
- Responsive product table on desktop and product-friendly responsive layout on narrow screens.
- Product image, title, category, price, rating, and stock display.
- API pagination with page numbers, previous/next controls, page size options, and range text.
- Debounced search with stale-result protection when requests return out of order.
- Category loading/filtering and sorting by price, rating, and title.
- URL state for search, category, sort, page, and page size.
- Product details with image gallery, description, metadata, and reviews.
- Add/edit forms with validation and duplicate-save protection.
- Delete confirmation dialog.
- Loading, empty, error, retry, and not-found states.

## Implementation notes

DummyJSON does not support search and category filtering in one server request. This app fetches search results from `/products/search?q=` and applies the selected category filter to that result set in the client. For the normal catalog view, pagination is loaded from `/products` with `limit` and `skip`.

DummyJSON mutation endpoints return a simulated result and do not permanently save changes. The app stores successful add/edit/delete results in `localStorage` and overlays them on later list/detail views during the local session. This makes the change visible without pretending the remote API is persistent.

One issue handled was fast search input: a slower older response could otherwise replace a newer result. The list tracks each request and only accepts the latest request's response, so delayed responses cannot overwrite current results.

AI was used to help scaffold the application structure and draft implementation details. The API flow, URL state, mutation overlay, debounce behavior, and UI states were reviewed and implemented for this assignment.

## Deployment

This project is deployed on Vercel for quick preview and sharing.

Live demo: [Add deployment link here](https://your-vercel-app-link.vercel.app)
