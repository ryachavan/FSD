# FSD - Full Stack Development Experiments (Course Work)

This repository contains my Full Stack Development (FSD) course experiments/assignments.
The root [`index.html`](./index.html) acts as a launcher that groups experiments by topic and links to each project (some are deployed on Render/Vercel).

## Repository structure (Monorepo)

This repo is organized as a monorepo-style workspace: multiple independent apps live in separate folders, and many of them have their own `package.json` and run independently.

Note: it does not use a monorepo tool (Nx/Turborepo/Lerna) or workspace configuration at the root. It is still structured like a monorepo for course organization.

## Index / Order (as per root `index.html`)

### EXP 01 - Static Frontends
1. **Static SaaS** (`static-saas/`)
2. **Static Ecommerce site (Bootstrap)** (`ecommerce-bootstrap/`)

### EXP 02 - Dynamic JavaScript
3. **JS Contact Form** (`dynamic-contact-form/`)
4. **JSON Product Filter** (`json-product-filter/`)

### EXP 03 - React UI
5. **Food Delivery App** (`food-delivery-app/`)

### EXP 04 - ExpressJS Backends
6. **Student Server** (`student-server/`) - deployed on Render (linked in root index)
7. **Movie Recommendation App** (`movie-api/`) - deployed on Render (linked in root index)
8. **Random Joke Generator** (`joke-app/`) - deployed on Render (linked in root index)

### EXP 05 - MongoDB Integration
9. **User Management** (`user-management/`) - deployed on Render (linked in root index)

### EXP 06 - MongoDB and Express
10. **Student Feedback System** (`student-feedback/`) - deployed on Render (linked in root index)
11. **Contact Form (Exp 2) with MongoDB** (`mongo-contact-form/`) - deployed on Render (linked in root index)

### Mini Project
- **CodeQuest** (separate repository) - source code: `ryachavan/CodeQuestWeb` - deployed on Vercel (linked in root index)

---

## How to use this repo

### Option A - Browse via the root index page
Open `index.html` (locally or via GitHub Pages if enabled). It groups experiments and provides:
- local folder links (for static projects)
- external deployment links (Render/Vercel)

### Option B - Run individual projects locally
Each experiment lives in its own folder. Some are pure HTML/CSS/JS (no install), while others are Node/React projects.

Note: deployed apps may require environment variables (MongoDB URLs, etc.). For local runs, create a `.env` file as described in relevant sections.

---

# EXP 01 - Static Frontends

## 01) Static SaaS - `static-saas/`
**Folder:** `static-saas/`  
**Type:** Static HTML + CSS landing page  
**Files:**
- `static-saas/index.html`
- `static-saas/style.css`

### What it is
A simple SaaS-style landing page branded as **CloudKeep** (cloud storage theme). It demonstrates:
- page structure using semantic sections (`header`, hero section, feature cards, footer)
- modern dark UI styling with CSS
- responsive-ish layout using CSS Grid for features

### Key UI sections
- Header: Logo + navigation links (Features / Pricing / Contact)
- Hero: Main headline, product pitch, CTA button
- Features grid: 4 cards (encryption, access, uploads, sharing)
- Footer: copyright

### Styling highlights (`style.css`)
- Global reset and consistent typography
- Dark background theme
- Grid-based feature layout (`grid-template-columns: repeat(auto-fit, minmax(...))`)
- Hover states for nav links and CTA button

### How to run
Just open:
- `static-saas/index.html`

---

## 02) Static Ecommerce site (Bootstrap) - `ecommerce-bootstrap/`
**Folder:** `ecommerce-bootstrap/`  
**Type:** Static HTML using Bootstrap 5 (via CDN)  
**Files:**
- `ecommerce-bootstrap/index.html`
- `ecommerce-bootstrap/assets/` (product images)

### What it is
A minimal ecommerce homepage called **ShopLite**, demonstrating:
- using Bootstrap’s grid system and components (navbar, cards, spacing utilities)
- responsive layout for product cards
- basic storefront page structure

### Key UI sections
- Navbar: Brand + links (Home / Products / Cart)
- Hero section: headline + subtext + CTA button
- Product listing: Cards for products (images, price, Add button)

### How to run
Open:
- `ecommerce-bootstrap/index.html`

---

# EXP 02 - Dynamic JavaScript

## 03) JS Contact Form - `dynamic-contact-form/`
**Folder:** `dynamic-contact-form/`  
**Type:** HTML + Vanilla JavaScript + Local Storage persistence  
**Files:**
- `dynamic-contact-form/index.html`
- `dynamic-contact-form/script.js`

### What it is
A browser-based contact list app that can:
- add contacts
- edit contacts
- delete contacts
- persist contacts in `localStorage` so they remain after refresh

### UI
The page contains:
- inputs for name, email, phone
- an Add Contact button
- a Contact List section rendered dynamically in the page

### Core logic (`script.js`)
- Data store:
  `contacts = JSON.parse(localStorage.getItem("contacts")) || []`
- Validation:
  - all fields required
  - phone number must be exactly 10 digits
  - email must match a basic email regex
- CRUD operations:
  - Create / Update: `addContact()`  
    Uses `editIndex` to decide between push vs update.
  - Read: `displayContacts()`  
    Renders each contact and creates buttons bound to edit/delete.
  - Delete: `deleteContact(index)`
  - Edit: `editContact(index)` (loads data into input fields)

### How to run
Open:
- `dynamic-contact-form/index.html`

---

## 04) JSON Product Filter - `json-product-filter/`
**Folder:** `json-product-filter/`  
**Type:** JavaScript array operations + console output + `prompt()` input  
**Files:**
- `json-product-filter/index.html`
- `json-product-filter/script.js`

### What it is
A small program that demonstrates:
- representing data as JSON-like objects in JS
- iterating with `forEach`
- filtering arrays with `filter`
- taking user input via `prompt`
- outputting results in the browser console

### How it works
- A products array contains items with name and price.
- It prints all products to console.
- It asks for a minimum price using `prompt("Enter minimum price:")`.
- It filters and prints products with `price >= minPrice`.

### How to run
1. Open `json-product-filter/index.html`
2. Open DevTools Console
3. Enter a number when prompted

---

# EXP 03 - React UI

## 05) Food Delivery App - `food-delivery-app/`
**Folder:** `food-delivery-app/`  
**Type:** React (Vite) + React Router + Redux Toolkit  
**Notable files:**
- `food-delivery-app/package.json`
- `food-delivery-app/src/main.jsx`
- `food-delivery-app/src/App.jsx`
- `food-delivery-app/cartSlice.js` (Redux slice)
- `food-delivery-app/src/...` (components, store, styles)

### What it is
A React single-page app that demonstrates:
- a multi-route UI (Food list page + Cart page)
- centralized state management using Redux Toolkit
- Vite tooling for development/build

### Routing and app composition
- `src/main.jsx` wraps the app with:
  - `<Provider store={store}>` (Redux store provider)
  - `<HashRouter>` (hash-based routing, useful for static hosting)
- `src/App.jsx` defines routes:
  - `/` -> `<FoodList />`
  - `/cart` -> `<Cart />`
- `<Header />` is always visible (top-level layout)

### How to run locally
```bash
cd food-delivery-app
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

---

# EXP 04 - ExpressJS Backends

## 06) Student Server - `student-server/`
**Folder:** `student-server/`  
**Type:** Express server + middleware + EJS views + form handling  
**Notable files:**
- `student-server/server.js`
- `student-server/views/` (EJS templates)
- `student-server/public/` (static assets)

### What it is
An Express-based server demonstrating:
- request logging with morgan
- serving static files (`public`)
- using EJS as a templating engine
- handling multiple routes with different HTTP methods (GET/POST/PUT)
- form submission and rendering dynamic profile data

### Routes overview (from `server.js`)
- `GET /` -> welcome message
- `GET /about` -> returns name/roll/course info (HTML string)
- `GET /contact` -> email
- `POST /register` -> returns Student Registered Successfully
- `PUT /update` -> returns Student Information Updated
- `POST /submit` -> stores submitted form data and renders `profile.ejs`
- `GET /profile` -> renders profile from stored data

### Notes
This uses a simple in-memory `studentData` object (not persistent storage).

### Run locally
```bash
cd student-server
npm install
node server.js
```

---

## 07) Movie Recommendation App (REST API) - `movie-api/`
**Folder:** `movie-api/`  
**Type:** Express REST API + static `public` frontend  
**Notable files:**
- `movie-api/server.js`
- `movie-api/public/`

### What it is
A basic REST API that manages a list of movies (in-memory array). Demonstrates:
- building CRUD endpoints
- query filtering using query parameters
- parsing JSON request bodies
- serving static files

### Data model (in-memory)
Each movie object contains:
- `id`
- `title`
- `genre`
- `rating` (number)
- `recommended` (string)

### API endpoints
- `GET /movies`
  - returns all movies
  - supports `?rating=N` to filter by rating
- `POST /movies`
  - adds a movie
  - validates required fields
- `PATCH /movies/:id`
  - partial update of existing movie
- `DELETE /movies/:id`
  - deletes by id

### Run locally
```bash
cd movie-api
npm install
node server.js
```

---

## 08) Random Joke Generator - `joke-app/`
**Folder:** `joke-app/`  
**Type:** Express + EJS + Axios (server-side API call)  
**Notable files:**
- `joke-app/server.js`
- `joke-app/views/` (EJS templates)

### What it is
A server-rendered app that:
- fetches a programming joke from JokeAPI on every request to `/`
- renders the joke in an EJS template

### Key backend flow
- `GET /`:
  - calls `https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single`
  - on success: renders the joke
  - on failure: renders a fallback message

### Run locally
```bash
cd joke-app
npm install
node server.js
```

---

# EXP 05 - MongoDB Integration

## 09) User Management - `user-management/`
**Folder:** `user-management/`  
**Type:** Express + MongoDB (Mongoose) + frontend UI served by Express  
**Notable files:**
- `user-management/server.js`
- `user-management/models/User.js`
- `user-management/index.html`
- `user-management/script.js`
- `user-management/styles.css`

### What it is
A full CRUD + query demo app for managing users stored in MongoDB. Demonstrates:
- connecting to MongoDB using `mongoose.connect(process.env.MONGO_URI)`
- defining a User model
- handling validation and duplicate keys (email uniqueness)
- building REST endpoints for CRUD, filtering, and pagination
- a browser frontend (form + list + query bar) that calls the API

### Frontend (from `index.html`)
Layout is split into two panels:
- Left panel: Add/Edit User form (name, email, age, hobbies, bio)
- Right panel: List of users + search/filter controls:
  - search by name
  - filter by min age
  - search by hobby
  - reset filters

### API endpoints (from `server.js`)
CRUD:
- `POST /addUser` (Create)
- `GET /users` (Read all)
- `PUT /updateUser/:id` (Update)
- `DELETE /deleteUser/:id` (Delete)

Query features:
- `GET /search?name=...` (name regex search)
- `GET /filter?email=...&minAge=...` (filter by email and min age)
- `GET /hobby?hobby=...` (find by hobby)
- `GET /textsearch?keyword=...` (MongoDB text search, requires text index in model)
- `GET /pagination?page=N` (pagination + sorting by age desc)

### Environment variables
Create `user-management/.env`:
```env
MONGO_URI=your_mongodb_connection_string
```

### Run locally
```bash
cd user-management
npm install
node server.js
```

---

# EXP 06 - MongoDB and Express

## 10) Student Feedback System - `student-feedback/`
**Folder:** `student-feedback/`  
**Type:** Full-stack app: React (frontend) + Express/MongoDB (backend)  
**Notable structure:**
- `student-feedback/backend/` (Express + MongoDB)
- `student-feedback/src/` (React frontend)

### What it is
A student feedback system demonstrating:
- authentication routes (`/api/auth`) and feedback routes (`/api/feedback`)
- CORS handling for local dev and production
- MongoDB integration using Mongoose
- serving the React production build from the backend (`dist/`)
- SPA fallback route to `dist/index.html`

### Backend behavior (`student-feedback/backend/server.js`)
- loads environment variables with dotenv
- connects to MongoDB using `process.env.MONGO_URI`
- health endpoint: `GET /api/health`
- mounts routers:
  - `/api/auth`
  - `/api/feedback`
- serves frontend build:
  - static: `express.static(distPath)`
  - fallback: `app.get('*', ...)` for non-API routes

### Environment variables
Typical backend env:
```env
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 11) Contact Form (Exp 2) with MongoDB - `mongo-contact-form/`
**Folder:** `mongo-contact-form/`  
**Type:** Express + MongoDB (Mongoose) + static frontend (`public/`)  
**Notable files:**
- `mongo-contact-form/server.js`
- `mongo-contact-form/public/`

### What it is
An upgraded version of the contact form concept that stores contacts in MongoDB rather than in localStorage. Demonstrates:
- building a REST API for a simple entity (contacts)
- defining a Mongoose schema and model
- full CRUD operations backed by MongoDB
- serving a frontend from Express

### Data model (Mongoose)
Contact fields:
- `name` (required)
- `email` (required)
- `phone` (required)
Includes timestamps.

### API endpoints
- `GET /api/contacts` -> list all contacts
- `POST /api/contacts` -> create contact
- `PUT /api/contacts/:id` -> update by id
- `DELETE /api/contacts/:id` -> delete by id

### Environment variables
Create `mongo-contact-form/.env`:
```env
MONGO_URI=your_mongodb_connection_string
```

### Run locally
```bash
cd mongo-contact-form
npm install
node server.js
```

---

# Mini Project - CodeQuest (Separate repository)

## CodeQuest - Gamified learning platform for Programming Languages

CodeQuest is the mini project linked from the root index page, but its source code is maintained in a separate repository:

- Source repository: **`ryachavan/CodeQuestWeb`**
- Repository URL: https://github.com/ryachavan/CodeQuestWeb
- Live deployment: hosted on Vercel (linked in root `index.html`)

---

## Notes / Known limitations
- Some experiments (movie API, student server) store data in-memory; restarting the server resets state.
- Mongo-based projects require a working `MONGO_URI`.
- For deployed apps, env vars are configured on the hosting platform; local usage needs `.env`.

---

## Author
Course experiments by Arya Chavan.