# 🌍 CityCarbon — Complete Setup Guide

> Real-time city emissions dashboard using live APIs
> Built for hackathons. Solo-friendly. No ML required.

---

## 📁 Project Structure

```
citycarbon/
├── client/          ← React frontend (runs on port 5173)
│   ├── src/
│   │   ├── App.jsx  ← Main dashboard (all components here)
│   │   └── main.jsx ← Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/          ← Node.js backend (runs on port 3001)
    ├── index.js     ← All API routes
    ├── .env.example ← Copy this to .env and add your keys
    ├── package.json
    └── data/
        └── emissionFactors.json  ← City emissions data
```

---

## ⚡ QUICK START (5 minutes)

### Step 1 — Install & Run Backend

```bash
cd server
npm install
cp .env.example .env      # Create your env file
node index.js             # Start server
# ✅ You should see: "CityCarbon server running on http://localhost:3001"
```

### Step 2 — Install & Run Frontend

Open a NEW terminal tab:
```bash
cd client
npm install
npm run dev
# ✅ Open http://localhost:5173 in your browser
```

That's it! The app runs with **mock data** by default.
To get **live data**, follow the API setup below 👇

---

## 🔌 API SETUP — Step by Step

### API 1 — OpenAQ (Air Quality) — FREE, No Key Needed

**What it gives you:** Real-time PM2.5, NO2, CO levels for cities worldwide

**Setup:**
1. The API works WITHOUT a key for up to 10,000 req/day
2. Just run the app — it auto-calls `https://api.openaq.org/v2/`

**To get higher limits (optional):**
1. Go to https://api.openaq.org/register
2. Sign up with your email
3. Copy your API key
4. Open `server/.env` and add:
   ```
   OPENAQ_API_KEY=your_key_here
   ```
5. In `server/index.js`, uncomment line:
   ```javascript
   // "X-API-Key": process.env.OPENAQ_API_KEY
   ```
   Change to:
   ```javascript
   "X-API-Key": process.env.OPENAQ_API_KEY
   ```

**Test it manually:**
```
http://localhost:3001/api/airquality/london
http://localhost:3001/api/airquality/delhi
```

---

### API 2 — Electricity Maps (Grid Carbon Intensity) — FREE Tier

**What it gives you:** gCO2 per kWh of electricity in real-time for any country/region

**Setup:**
1. Go to https://api.electricitymap.org/
2. Click "Free Trial" or "Sign Up"
3. Confirm your email
4. Go to your dashboard → copy your **Auth Token**
5. Open `server/.env` and add:
   ```
   ELECTRICITY_MAP_KEY=your_token_here
   ```

**Zone Codes to use:**
| City      | Zone Code |
|-----------|-----------|
| India     | IN-NO     |
| UK        | GB        |
| Germany   | DE        |
| USA (East)| US-MIDA   |
| Japan     | JP        |

**Test it manually:**
```
http://localhost:3001/api/electricity/GB
http://localhost:3001/api/electricity/IN-NO
```

**What the response looks like:**
```json
{
  "carbonIntensity": 180,    ← gCO2/kWh right now
  "zone": "GB",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

---

### API 3 — Open-Meteo (Weather) — 100% FREE, No Key Ever

**What it gives you:** Temperature, wind speed, precipitation

**Setup:** Nothing! It's completely free with no API key.


## 📦 All Dependencies Explained

### Backend
- `express` — web server framework
- `cors` — allows frontend to call backend (cross-origin)
- `dotenv` — loads your .env variables

### Frontend
- `react` + `react-dom` — UI framework
- `recharts` — all charts (line, pie, bar)
- `vite` — fast dev server + bundler

---

Built with 💚 for Tech for Environment Hackathon
