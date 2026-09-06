# Amazon Clone - Admin Panel

Super admin panel (the "Amazon Owner" side) built with **Next.js (App Router) + React Bootstrap**, Amazon look & feel.

## Features
- Super admin login (JWT, admin role only)
- Dashboard with stats (items, orders, users, revenue)
- All items list
- Create item
- Edit item
- Delete item
- All orders
- Users list + view each user's ordered items

## Tech Stack
- Next.js 14 (App Router, JavaScript)
- React Bootstrap + Bootstrap 5
- Axios, react-icons

## Folder Structure
```
amazon admin panel/
├── app/
│   ├── layout.jsx                       # root layout (AdminProvider)
│   ├── page.jsx                         # super admin login ("/")
│   ├── globals.css
│   └── dashboard/
│       ├── page.jsx                     # dashboard stats
│       ├── items/
│       │   ├── page.jsx                 # all items list
│       │   ├── create/page.jsx          # create item
│       │   └── [id]/edit/page.jsx       # edit item
│       ├── orders/page.jsx              # all orders
│       └── users/page.jsx               # users + their items
├── components/
│   ├── AdminNavbar.jsx
│   ├── Sidebar.jsx
│   ├── DashboardLayout.jsx              # auth guard + shell
│   └── ItemForm.jsx                     # shared create/edit form
├── context/
│   └── AdminContext.jsx                 # admin auth state
├── lib/
│   └── api.js                           # axios client
├── .env.local                           # NEXT_PUBLIC_API_URL
└── package.json
```

## Setup
```bash
npm install
# make sure the backend (amazon-BE-API) is running on port 5000
# and you have seeded the admin: (in backend) npm run seed
npm run dev
```
Admin panel runs at `http://localhost:3001`.

Default super admin (from backend seed): **admin@amazon.com / Admin@123**
