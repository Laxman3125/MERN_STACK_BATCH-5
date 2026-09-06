# Amazon Clone - Full Stack (3 Projects)

A MERN-style Amazon clone split into **three separate projects**, all styled to look and feel like Amazon using **React Bootstrap**.

```
3 Month Sep/
├── amazon-BE-API/          # Backend API  (Express + MongoDB)      -> port 5000
├── Client Web App amazon/  # Customer storefront (Next.js)         -> port 3000
└── amazon admin panel/     # Super admin panel (Next.js)           -> port 3001
```

Each project has its own detailed `README.md`.

---

## 1. amazon-BE-API (Backend)
Express + MongoDB REST API with **client APIs** and **admin APIs**.

**Client APIs:** register, login, get items, cart (create/get/update/remove), place order, get my orders.
**Admin APIs:** super admin login, item create/edit/delete/get-all, get all orders, get all users, get a user's items.

## 2. Client Web App amazon (Customer storefront)
Next.js + React Bootstrap. Create account, login, browse items, item detail, cart, checkout (purchase order), your orders. Amazon look & feel.

## 3. amazon admin panel (Super admin)
Next.js + React Bootstrap. Super admin login, dashboard stats, all items, create/edit/delete item, all orders, users + the items each user ordered.

---

## How to run everything

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

### Step 1 — Backend
```bash
cd "amazon-BE-API"
npm install
# .env is already provided (edit if needed)
npm run seed        # creates admin@amazon.com / Admin@123 + sample items
npm run dev         # http://localhost:5000
```

### Step 2 — Customer storefront (new terminal)
```bash
cd "Client Web App amazon"
npm install
npm run dev         # http://localhost:3000
```

### Step 3 — Admin panel (new terminal)
```bash
cd "amazon admin panel"
npm install
npm run dev         # http://localhost:3001
```

### Logins
- **Customer:** create your own account at http://localhost:3000/register
- **Super Admin:** http://localhost:3001 → `admin@amazon.com` / `Admin@123`

---

## Tech Stack
| Layer | Tech |
|-------|------|
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |
| Frontend | Next.js 14 (App Router), React Bootstrap, Bootstrap 5, Axios |

## Data flow
```
Customer storefront (3000) ─┐
                            ├──►  Backend API (5000)  ──►  MongoDB
Admin panel (3001) ─────────┘
```

## Note on versions
The two Next.js apps use Next `14.2.7`. npm may warn about a security advisory for this
version. It builds and runs fine for learning; to silence the warning you can later run
`npm i next@latest` in each frontend project.
