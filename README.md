# 🏨 Outs & Eats

A full-stack project combining:
- ✨ **Frontend**: React + TailwindCSS + Framer Motion (UI, animations, modals, hover effects)  
- ⚡ **Backend**: Express.js API (Hotels, Restaurants, Bookings)  

---

## 🚀 Quick Start

Clone the repo and install dependencies for both backend and frontend:

```bash
git clone https://github.com/your-username/outs-eats.git
cd outs-eats
````

### 1️⃣ Start the Backend (Express API)

```bash
cd backend
npm install
node server.js
```

Backend will be running at:
👉 [http://localhost:4000](http://localhost:4000)

---

### 2️⃣ Start the Frontend (React)

In a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will be running at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 📦 API Endpoints

### Hotels

```http
GET /hotels
```

Returns list of hotels with availability.

### Restaurants

```http
GET /restaurants
```

Returns restaurant list with menus.

### Book a Room

```http
POST /book
```

Request body:

```json
{
  "hotel_id": 1,
  "user_name": "Alice"
}
```

---

## 🎨 Features

* **Hotels Section**:

  * Hover cards with animations & room availability
  * Selectable hotels with booking support

* **Restaurants Section**:

  * Menu previews with images
  * Animated hover zoom

* **Booking Modal**:

  * Enter your name → book instantly
  * Success/error messages displayed

---

## 🖼 Preview

| Hotels                                 | Restaurants          | Booking Modal            |
| -------------------------------------- | -------------------- | ------------------------ |
| ✨ Hover animations + room availability | 🍽 Menus with images | ✅ Book a hotel instantly |

---

## 🛠 Tech Stack

* **Frontend**: React, TailwindCSS, Framer Motion
* **Backend**: Express.js

---

## 📜 License

MIT © 2025 Outs & Eats

```

---

👉 This one is **perfect for GitHub if you want to highlight the simpler dev workflow** (without requiring Docker).  

Would you like me to **bundle this version into a new ZIP** as well, so you can upload the non-Docker version separately on GitHub?
```
