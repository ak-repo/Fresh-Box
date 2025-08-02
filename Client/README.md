

# 🛒 FreshBOX - E-Commerce Platform (React + Vite)

A full-stack e-commerce platform with **user** and **admin** modules, a mock backend using `json-server`. Built with React, Tailwind CSS, and React Router.

![Demo] -  https://fresh-box-ecommerce-app.vercel.app/

---

## ✨ Key Features

### **User Module**

- 📦 Product browsing with categories/filters
- 🛒 Cart management (add/remove/update items)
- 📌 Wishlist functionality
- 💳 Checkout & order tracking
-

### **Admin Module**

- 👥 **User Management** (View/Block users)
- 📊 **Dashboard** (Sales analytics)
- 🧺 **Product CRUD** (Add/Edit/Delete products)
- 📦 **Order Management** (Process orders/refunds)

---

## 🛠️ Tech Stack

| Category         | Technology       |
| ---------------- | ---------------- |
| Frontend         | React (Vite)     |
| State Management | Context API      |
| Routing          | React Router DOM |
| Styling          | Tailwind CSS     |
| API Calls        | Axios            |
| Authentication   | JWT              |
| Mock Backend     | json-server      |

---

## 🚀 Setup & Installation

### **Prerequisites**

- Node.js (v18+)
- npm/yarn

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/FreshBOX.git
cd FreshBOX
```
2. Install Dependencies
npm install
3. Start the Mock Backend (json-server)
Open a new terminal and run:

npx json-server --watch DataBase/db.json --port 3001
(This will serve your mock data at http://localhost:3001)

4. Start the React App
In the original terminal:

npm run dev
The app will launch at http://localhost:3000

🔐 Authentication Credentials (For Testing)
User Login
create your own

Admin Login
Email: admin@flexbox.com
Password: 1234567890@Ak
(Modify these in DataBase/db.json as needed)

📂 Project Structure
src/

├── pages/          # Route-based pages
├── context/        # Global state (Cart/Auth)
├── api/            # Axios API calls
├── assets/         # Images/styles
├── DataBase/       # Mock data (db.json)
└── App.jsx         # Main router
🌐 API Endpoints (json-server)
Endpoint	Description
/products	Get all products
/users	User data
(Expand in your db.json as needed)

🛠️ Customization
Update Mock Data: Edit DataBase/db.json
Change Styling: Modify Tailwind classes in components
Add Features: Extend the existing context/reducers
📜 License
MIT © AK

🙏 Credits
React
Vite
Tailwind CSS