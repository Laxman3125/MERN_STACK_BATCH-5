# Amazon Clone - Customer Storefront

Customer-facing web app (the "Users Client") built with **Next.js (App Router) + React Bootstrap**, styled to look like Amazon.

## Features
- Create Amazon account + login (JWT)
- Item list (home) with search + category filter
- Item detail page (Add to Cart / Buy Now)
- Cart (update quantity, remove)
- Checkout / purchase order
- Your Orders page

## Tech Stack
- Next.js 14 (App Router, JavaScript)
- React Bootstrap + Bootstrap 5
- Axios for API calls
- react-icons

## Folder Structure
```
Client Web App amazon/
├── app/
│   ├── layout.jsx           # root layout (navbar + footer)
│   ├── page.jsx             # home / item list
│   ├── globals.css          # Amazon-style CSS
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── item/[id]/page.jsx   # item detail
│   ├── cart/page.jsx
│   ├── checkout/page.jsx    # purchase order
│   └── orders/page.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── context/
│   └── AppContext.jsx       # user + cart state
├── lib/
│   └── api.js               # axios client
├── .env.local               # NEXT_PUBLIC_API_URL
└── package.json
```

## Setup
```bash
npm install
# make sure the backend (amazon-BE-API) is running on port 5000
npm run dev
```
App runs at `http://localhost:3000`.

> The backend URL is configured in `.env.local` (`NEXT_PUBLIC_API_URL`).
