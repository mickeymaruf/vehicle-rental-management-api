# 🚗 Vehicle Rental Management System

A backend service for managing vehicles, customers, and rental bookings with secure role-based access control.  
Built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**.

---

## 🔗 Live API
> **Base URL:** *https://vehicle-rental-management-system-vr.vercel.app*

---

## ✨ Features
A backend API for a vehicle rental management system that handles:
- **Vehicles** - Manage vehicle inventory with availability tracking
- **Customers** - Manage customer accounts and profiles
- **Bookings** - Handle vehicle rentals, returns and cost calculation
- **Authentication** - Secure role-based access control (Admin and Customer roles)

---

## 🛠️ Tech Stack
- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQL**
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT auth)

## 🔧 Installation

```bash
git clone https://github.com/mickeymaruf/vehicle-rental-management-api
cd vehicle-rental-management-api
npm install
```

Create a `.env` file:

```env
PORT=5000
CONN_STRING=
JWT_SECRET=
```

Start the project:

```bash
npm run dev
```
