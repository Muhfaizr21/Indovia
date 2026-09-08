# ⚡ Indovia

<p align="center">
  <img src="assets/logo.svg" alt="Indovia Logo" width="460" />
</p>

<p align="center">
  <strong>The Next-Gen Modular SaaS E-Commerce Store Engine & Storefront Builder</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Themes-34%2B%20Presets-blue?style=for-the-badge&logo=shopify" alt="Themes" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Backend-Go%20(Golang)-00ADD8?style=for-the-badge&logo=go" alt="Golang" /></a>
  <a href="#architecture"><img src="https://img.shields.io/badge/Architecture-Laravel--Like%20MVC%20%2F%20SOLID-FF2D20?style=for-the-badge&logo=laravel" alt="Architecture" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></a>
</p>

---

## 📌 About Indovia

**Indovia** is a modern, enterprise-ready **SaaS E-Commerce Platform & Storefront Engine** designed to empower independent brands, D2C businesses, and merchants to build, customize, and scale high-converting online stores effortlessly.

Featuring **34+ industry-specific theme presets**, **24+ dynamic product display layouts**, and an intuitive **modular section engine (ON/OFF toggles)**, Indovia combines the speed and elegance of modern frontends with the ultra-low latency and robustness of a Golang backend.

---

## ✨ Key Features

### 🎨 34+ Industry Theme Presets
- Ready-to-use storefront templates covering **Fashion, Electronics, Furniture, Supermarket, Luxury, Minimalist, Sports, Cosmetics**, and more.
- Instant theme switching without touching code.

### 🛍️ 24+ Product Detail Layouts
- Dynamic product galleries (Thumbnails Left, Right, Bottom, Grid, Sticky Scroll).
- Quick View modals, size/color variant pickers, real-time inventory alerts, and instant WhatsApp direct checkout.

### 🧩 Modular Section Engine (ON/OFF Toggles)
- Easily enable or disable homepage & landing sections on demand:
  - 🔔 Top Announcement Bar
  - 🚀 Hero Banner & Sliders
  - ⏳ Flash Sale Deals & Countdown Timers
  - 🏷️ Dynamic Category Carousels
  - ⭐ Best Sellers & Featured Products
  - 💬 Verified Testimonials & Reviews
  - 📸 Interactive Instagram / Social Feeds
  - ✉️ Newsletter Subscription Hub
  - 📝 Integrated E-Commerce Blog

### 🛡️ High-Performance Clean Backend (Go)
- Architected with **Laravel-like MVC & SOLID principles**:
  - **Controllers:** Request handling & clean standardized JSON responses.
  - **Services:** Decoupled business logic layer.
  - **Repositories:** Data access abstraction via interfaces (DIP).
  - **Requests:** Form validation & schema sanitization.
  - **Models:** Relational data structures with GORM.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18
- **Bundler / Tooling:** Vite
- **Routing:** React Router v6
- **Styling:** Modular CSS / Bootstrap 5 / Modern HSL Design Tokens
- **Icons & Assets:** Lucide Icons / Remix Icons / Tabler Icons
- **Animation & Sliders:** Swiper.js

### Backend
- **Language:** Go (Golang 1.22+)
- **HTTP Web Engine:** Gin Web Framework
- **ORM / Database:** GORM (SQLite / PostgreSQL / MySQL)
- **Security & Auth:** JWT (JSON Web Tokens) & Bcrypt password hashing
- **Environment Management:** Godotenv

---

## 📂 Project Structure

```text
Indovia/
├── frontend/                     # React 18 + Vite Storefront & Dashboard
│   ├── public/                   # Static assets, fonts, icons
│   └── src/
│       ├── app/
│       │   └── (landing)/        # 34+ Modular Landing Themes & Pages
│       ├── components/           # Reusable UI Primitives
│       ├── layout/               # Dynamic Theme Layout Wrappers
│       └── routes/               # Declarative Route Definitions
│
├── backend/                      # High-Performance Golang Core
│   ├── app/
│   │   ├── controllers/          # HTTP Request Handlers
│   │   ├── middlewares/          # Auth, CORS, Rate Limiting
│   │   ├── models/               # Data Structures & Schemas
│   │   ├── repositories/         # Database Abstraction Layer (SOLID)
│   │   ├── requests/             # Input Form Validation
│   │   └── services/             # Core Business Logic Layer
│   ├── cmd/
│   │   └── api/
│   │       └── main.go           # Application Entry Point
│   ├── config/                   # App & Database Configuration
│   ├── database/
│   │   ├── migrations/           # Database Schema Migrations
│   │   └── seeders/              # Initial Seed Data
│   ├── pkg/
│   │   ├── response/             # Standard API Response Helper
│   │   └── utils/                # Utility Functions (JWT, Hashing)
│   ├── routes/                   # API Endpoint Definitions
│   └── go.mod                    # Go Module Dependencies
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [Go](https://go.dev/) (v1.22 or higher)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Muhfaizr21/Indovia.git
cd Indovia
```

---

### 2. Setup Frontend
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
The storefront application will be live at `http://localhost:5173`.

---

### 3. Setup Backend
```bash
# Navigate to the backend directory
cd ../backend

# Copy environment variables
cp .env.example .env

# Download Go dependencies
go mod tidy

# Run the API server
go run cmd/api/main.go
```
The backend API server will be available at `http://localhost:8080`.

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file in the `backend/` directory:

```env
APP_NAME="Indovia SaaS Engine"
APP_ENV=development
APP_PORT=8080
APP_URL=http://localhost:8080

DB_CONNECTION=sqlite
DB_DATABASE=database/indovia.db

JWT_SECRET=your-super-secret-jwt-key
```

---

## 🗺️ Product Roadmap

- [x] **Storefront Engine:** 34+ Landing Themes & 24+ Product Single Views.
- [x] **Architecture Scaffolding:** Clean MVC Backend in Go with SOLID repository pattern.
- [ ] **Dynamic Theme Customizer:** Real-time visual Section ON/OFF toggler.
- [ ] **Multi-Tenant Database:** Merchant store separation via subdomains (`merchant.indovia.com`).
- [ ] **Payment Gateways:** Midtrans, Xendit, and WhatsApp Direct Ordering.
- [ ] **Shipping Aggregator:** RajaOngkir / JNE / J&T auto shipping rate calculator.
- [ ] **Analytics Engine:** Real-time revenue, conversion rate, and inventory analytics.

---

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ for independent brands and modern e-commerce.
</p>
