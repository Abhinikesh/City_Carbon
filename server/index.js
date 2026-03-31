const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
//  HELPER: fetch with timeout
// ─────────────────────────────────────────────
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return await res.json();
  } catch (e) {
    console.error("Fetch error:", url, e.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ─────────────────────────────────────────────
//  ROUTE 1 — Emissions Score (local data)
//  GET /api/emissions/:city
//  Returns: score, sector breakdown, monthly trend
// ─────────────────────────────────────────────
app.get("/api/emissions/:city", (req, res) => {
  const emissionFactors = require("./data/emissionFactors.json");
  const key = req.params.city.toLowerCase();
  const cityData = emissionFactors[key] || emissionFactors["default"];
  res.json({ success: true, city: req.params.city, data: cityData });
});

// ─────────────────────────────────────────────
//  ROUTE 2 — Live Air Quality (OpenAQ API)
//  GET /api/airquality/:city
//
//  HOW TO USE OPENAQ:
//  • No API key needed for basic usage
//  • Free tier: 10,000 requests/day
//  • Docs: https://docs.openaq.org
//
//  For higher limits, sign up free at:
//  https://api.openaq.org/register
//  Then add header: X-API-Key: YOUR_KEY
// ─────────────────────────────────────────────
app.get("/api/airquality/:city", async (req, res) => {
  const city = req.params.city;

  // Step 1: Find locations in the city
  const locData = await safeFetch(
    `https://api.openaq.org/v2/locations?city=${city}&limit=10&has_geo=true`,
    {
      headers: {
        // Uncomment and add your key for higher rate limits:
        // "X-API-Key": process.env.OPENAQ_API_KEY
      },
    }
  );

  if (!locData || !locData.results?.length) {
    // Fallback to mock data if API fails or city not found
    return res.json({
      success: true,
      source: "fallback",
      data: getMockAirQuality(city),
    });
  }

  // Step 2: Get latest readings from first location
  const locationId = locData.results[0].id;
  const measurements = await safeFetch(
    `https://api.openaq.org/v2/measurements?location_id=${locationId}&limit=10&parameter=pm25,no2,co`
  );

  const readings = {};
  measurements?.results?.forEach((m) => {
    if (!readings[m.parameter]) readings[m.parameter] = m.value;
  });

  res.json({
    success: true,
    source: "openaq",
    city,
    location: locData.results[0].name,
    coordinates: locData.results[0].coordinates,
    readings,
    // AQI calculation (simplified EPA formula)
    aqi: calculateAQI(readings.pm25 || 0),
  });
});

// ─────────────────────────────────────────────
//  ROUTE 3 — Electricity Carbon Intensity
//  GET /api/electricity/:zone
//
//  HOW TO USE ELECTRICITY MAPS:
//  • Sign up free: https://api.electricitymap.org/
//  • Free tier gives "carbon intensity by zone"
//  • Zone codes: IN-NO (India North), GB (UK),
//    US-MIDA (US Mid-Atlantic), DE (Germany), etc.
//  • Add your key to .env as ELECTRICITY_MAP_KEY
// ─────────────────────────────────────────────
app.get("/api/electricity/:zone", async (req, res) => {
  const zone = req.params.zone;
  const apiKey = process.env.ELECTRICITY_MAP_KEY;

  if (!apiKey) {
    // Return mock data if no key configured
    return res.json({
      success: true,
      source: "fallback",
      data: getMockElectricity(zone),
    });
  }

  const data = await safeFetch(
    `https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${zone}`,
    { headers: { "auth-token": apiKey } }
  );

  if (!data) {
    return res.json({ success: true, source: "fallback", data: getMockElectricity(zone) });
  }

  res.json({
    success: true,
    source: "electricitymap",
    zone,
    carbonIntensity: data.carbonIntensity, // gCO2eq/kWh
    updatedAt: data.updatedAt,
  });
});

// ─────────────────────────────────────────────
//  ROUTE 4 — Weather Context (Open-Meteo)
//  GET /api/weather/:lat/:lon
//
//  HOW TO USE OPEN-METEO:
//  • Completely FREE, no API key needed ever
//  • Docs: https://open-meteo.com/en/docs
//  • Pass lat/lon from city coordinates
// ─────────────────────────────────────────────
app.get("/api/weather/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;

  const data = await safeFetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation&timezone=auto`
  );

  if (!data) return res.json({ success: false });

  res.json({
    success: true,
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    precipitation: data.current.precipitation,
    unit: data.current_units,
  });
});

// ─────────────────────────────────────────────
//  ROUTE 5 — City Comparison
//  GET /api/compare?cities=delhi,london,tokyo
// ─────────────────────────────────────────────
app.get("/api/compare", (req, res) => {
  const emissionFactors = require("./data/emissionFactors.json");
  const cities = req.query.cities?.split(",") || [];
  const result = cities.map((c) => ({
    city: c,
    ...(emissionFactors[c.toLowerCase()] || emissionFactors["default"]),
  }));
  res.json({ success: true, data: result });
});

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
function calculateAQI(pm25) {
  if (pm25 <= 12) return { value: Math.round((50 / 12) * pm25), label: "Good", color: "#22c55e" };
  if (pm25 <= 35.4) return { value: Math.round(50 + ((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1)), label: "Moderate", color: "#eab308" };
  if (pm25 <= 55.4) return { value: Math.round(100 + ((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5)), label: "Unhealthy for Sensitive", color: "#f97316" };
  return { value: Math.round(150 + ((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5)), label: "Unhealthy", color: "#ef4444" };
}

function getMockAirQuality(city) {
  const mock = {
    delhi: { pm25: 89, no2: 45, co: 1.2, aqi: { value: 168, label: "Unhealthy", color: "#ef4444" } },
    london: { pm25: 12, no2: 28, co: 0.4, aqi: { value: 50, label: "Good", color: "#22c55e" } },
    tokyo: { pm25: 15, no2: 22, co: 0.3, aqi: { value: 58, label: "Moderate", color: "#eab308" } },
    "new york": { pm25: 18, no2: 35, co: 0.5, aqi: { value: 65, label: "Moderate", color: "#eab308" } },
    mumbai: { pm25: 65, no2: 38, co: 0.9, aqi: { value: 132, label: "Unhealthy for Sensitive", color: "#f97316" } },
    berlin: { pm25: 10, no2: 20, co: 0.3, aqi: { value: 42, label: "Good", color: "#22c55e" } },
  };
  return mock[city.toLowerCase()] || mock["london"];
}

function getMockElectricity(zone) {
  const mock = {
    "IN-NO": { carbonIntensity: 820, label: "Very High", renewablePercent: 12 },
    GB: { carbonIntensity: 180, label: "Low", renewablePercent: 55 },
    DE: { carbonIntensity: 350, label: "Moderate", renewablePercent: 42 },
    "US-MIDA": { carbonIntensity: 290, label: "Moderate", renewablePercent: 38 },
    JP: { carbonIntensity: 450, label: "High", renewablePercent: 22 },
  };
  return mock[zone] || { carbonIntensity: 400, label: "Moderate", renewablePercent: 30 };
}

app.listen(3001, () => console.log("✅ CityCarbon server running on http://localhost:3001"));
