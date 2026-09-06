# Amazon Clone - Backend API

Simple Express + MongoDB REST API for the Amazon clone. Contains **client (user) APIs** and **admin panel APIs**.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for password hashing

## Folder Structure
```
amazon-BE-API/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # register, login, admin login
│   │   ├── itemController.js     # item CRUD + listing
│   │   ├── cartController.js     # cart logic
│   │   ├── orderController.js    # orders
│   │   └── adminController.js    # users + user items
│   ├── middleware/
│   │   ├── authMiddleware.js     # protect + adminOnly
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js         # /api/users
│   │   ├── itemRoutes.js         # /api/items
│   │   ├── cartRoutes.js         # /api/cart
│   │   ├── orderRoutes.js        # /api/orders
│   │   └── adminRoutes.js        # /api/admin
│   ├── seed/
│   │   └── seed.js               # create admin + sample items
│   ├── utils/
│   │   └── generateToken.js
│   ├── app.js
│   └── server.js
├── .env.example
└── package.json
```

## Setup
```bash
# 1. install dependencies
npm install

# 2. copy env and edit values
cp .env.example .env

# 3. make sure MongoDB is running, then seed admin + sample items
npm run seed

# 4. start the server
npm run dev
```
Server runs at `http://localhost:5000`.

Default super admin (from seed): **admin@amazon.com / Admin@123**

---

## CLIENT (USER) APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/users/register` | Public | Create Amazon account |
| POST | `/api/users/login` | Public | Login user |
| GET  | `/api/users/profile` | User | Get my profile |
| GET  | `/api/items` | Public | Get all items (`?search=`, `?category=`) |
| GET  | `/api/items/:id` | Public | Get single item |
| GET  | `/api/cart` | User | Get my cart |
| POST | `/api/cart` | User | Create cart / add item `{ itemId, quantity }` |
| PUT  | `/api/cart/:itemId` | User | Update quantity `{ quantity }` |
| DELETE | `/api/cart/:itemId` | User | Remove item from cart |
| DELETE | `/api/cart` | User | Clear cart |
| POST | `/api/orders` | User | Place / purchase order |
| GET  | `/api/orders` | User | Get my orders |

## ADMIN PANEL APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/login` | Public | Super admin login |
| GET  | `/api/admin/items` | Admin | Get all items |
| GET  | `/api/admin/items/:id` | Admin | Get single item |
| POST | `/api/admin/items` | Admin | Create item |
| PUT  | `/api/admin/items/:id` | Admin | Edit item |
| DELETE | `/api/admin/items/:id` | Admin | Delete item |
| GET  | `/api/admin/orders` | Admin | Get all orders |
| GET  | `/api/admin/users` | Admin | Get all users |
| GET  | `/api/admin/users/:id/items` | Admin | Get a user's ordered items |

Send the token as: `Authorization: Bearer <token>`
