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

**Test it manually:**
```
http://localhost:3001/api/weather/51.5074/-0.1278    ← London
http://localhost:3001/api/weather/28.6139/77.2090    ← Delhi
```

---

## 🧠 How the Data Flows (Important to Understand)

```
User clicks "London" in the app
          ↓
React sends: GET /api/emissions/london
             GET /api/airquality/london
          ↓
Node server receives the requests
          ↓
/api/emissions/london
  → Reads from emissionFactors.json (your local data)
  → Returns score, sector %, trend, tips

/api/airquality/london
  → Calls OpenAQ API: https://api.openaq.org/v2/locations?city=london
  → Gets location IDs for London monitoring stations
  → Calls OpenAQ again: /measurements?location_id=XXX
  → Extracts PM2.5, NO2, CO values
  → Calculates AQI using EPA formula
  → Returns to frontend

React receives both responses
  → Updates score ring, stats, charts, AQI badge
```

---

## 📊 How to Add More Cities

1. Open `server/data/emissionFactors.json`
2. Add a new entry following this exact structure:

```json
"paris": {
  "score": 70,
  "label": "Good",
  "transport": 30,       ← must add up to 100
  "energy": 35,
  "industry": 22,
  "waste": 13,
  "co2PerCapita": 4.2,
  "nationalAvg": 6.8,
  "trend": [58, 60, 62, 64, 65, 67, 69, 70],   ← 8 values
  "electricityZone": "FR",
  "coordinates": { "lat": 48.8566, "lon": 2.3522 },
  "tips": [
    "Paris has 1,000km of bike lanes — use Vélib bikes",
    "France is 75% nuclear — very low grid emissions",
    "Eat local French produce — short supply chains"
  ]
}
```

3. Open `client/src/App.jsx`
4. Add to the CITIES array at the top:
```javascript
{ name: "Paris", key: "paris", flag: "🇫🇷" },
```

---

## 🚀 Deployment (Free)

### Deploy Backend to Railway
```bash
# 1. Go to https://railway.app
# 2. Click "New Project" → "Deploy from GitHub"
# 3. Connect your GitHub, push your code
# 4. In Railway dashboard → Variables tab → add your .env variables
# 5. Railway gives you a URL like: https://citycarbon-server.up.railway.app
```

### Deploy Frontend to Vercel
```bash
# 1. Go to https://vercel.com
# 2. Click "Add New Project" → import from GitHub
# 3. Set Root Directory to: client
# 4. Add Environment Variable:
#    VITE_API_URL = https://your-railway-url.up.railway.app
# 5. In App.jsx, change:
#    const API = import.meta.env.VITE_API_URL || "http://localhost:3001"
```

---

## 🏆 Hackathon Demo Tips

1. **Start with Delhi** — low score, lots of red, dramatic
2. **Switch to London** — high score, judges see the contrast
3. **Click Compare tab** — bar chart showing all 6 cities at once is very visual
4. **Click Tips tab** — shows AI-style actionable recommendations
5. **Point out the live AQI badge** — "this is real data from right now"

### Pitch Line to Use:
> "CityCarbon gives every city a health score like a credit score — 
>  pulling live air quality, electricity grid, and emissions data 
>  to show citizens and policymakers exactly where to act."

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `CORS error` | Backend not running | Run `node index.js` in server folder |
| `fetch failed` | Wrong port | Check backend is on 3001, frontend on 5173 |
| `undefined is not iterable` | API returned null | Check your API key in .env |
| `city not found in OpenAQ` | City name mismatch | Try "New Delhi" instead of "Delhi" |
| Electricity data shows fallback | No API key | Add ELECTRICITY_MAP_KEY to .env |

---

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
