import { useState, useEffect, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar, RadialBarChart, RadialBar,
} from "recharts";

// ─── CONFIG ───────────────────────────────────────────
const API = "http://localhost:3001";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const CITIES = [
  { name: "Delhi", key: "delhi", flag: "🇮🇳" },
  { name: "London", key: "london", flag: "🇬🇧" },
  { name: "Tokyo", key: "tokyo", flag: "🇯🇵" },
  { name: "New York", key: "new york", flag: "🇺🇸" },
  { name: "Mumbai", key: "mumbai", flag: "🇮🇳" },
  { name: "Berlin", key: "berlin", flag: "🇩🇪" },
];
const SECTOR_COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];
const SECTOR_ICONS = { Transport: "🚗", Energy: "⚡", Industry: "🏭", Waste: "♻️" };

// ─── SCORE RING ────────────────────────────────────────
function ScoreRing({ score }) {
  const color = score >= 65 ? "#34d399" : score >= 45 ? "#fbbf24" : "#f87171";
  const label = score >= 65 ? "Good" : score >= 45 ? "Moderate" : score >= 30 ? "Poor" : "Critical";
  const r = 70, circumference = 2 * Math.PI * r;
  const filled = ((100 - score) / 100) * circumference;
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#1e293b" strokeWidth="14" />
        <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="14"
          strokeDasharray={circumference} strokeDashoffset={filled}
          strokeLinecap="round" transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
        <text x="90" y="82" textAnchor="middle" fill={color}
          style={{ fontSize: 38, fontWeight: 900, fontFamily: "inherit" }}>{score}</text>
        <text x="90" y="108" textAnchor="middle" fill="#94a3b8"
          style={{ fontSize: 14, fontFamily: "inherit" }}>/100</text>
      </svg>
      <span style={{ color, fontWeight: 700, fontSize: 18 }}>{label}</span>
    </div>
  );
}

// ─── STAT CARD ─────────────────────────────────────────
function StatCard({ icon, label, value, sub, color = "#60a5fa" }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "18px 20px" }}>
      <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
      <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>{label}</div>
      <div style={{ color, fontWeight: 800, fontSize: 22 }}>{value}</div>
      {sub && <div style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ─── TIPS PANEL ────────────────────────────────────────
function TipsPanel({ tips }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 20, padding: 24 }}>
      <h3 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: 16, fontSize: 16 }}>
        💡 Reduction Tips
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tips?.map((tip, i) => (
          <div key={i} style={{
            background: "#1e293b", borderRadius: 12, padding: "12px 16px",
            borderLeft: "3px solid #34d399", display: "flex", gap: 10, alignItems: "flex-start"
          }}>
            <span style={{ color: "#34d399", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
            <span style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 }}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AQI BADGE ─────────────────────────────────────────
function AQIBadge({ aqi }) {
  if (!aqi) return null;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: aqi.color + "22", border: `1px solid ${aqi.color}44`,
      borderRadius: 999, padding: "6px 14px"
    }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: aqi.color, display: "inline-block" }} />
      <span style={{ color: aqi.color, fontWeight: 700, fontSize: 13 }}>AQI {aqi.value} — {aqi.label}</span>
    </div>
  );
}

// ─── COMPARE BAR ───────────────────────────────────────
function CompareBar({ compareData }) {
  const data = compareData.map(d => ({ city: d.city, score: d.score }));
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 20, padding: 24 }}>
      <h3 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: 16, fontSize: 16 }}>
        🌍 City Comparison
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
          <YAxis dataKey="city" type="category" tick={{ fill: "#94a3b8", fontSize: 12 }} width={70} />
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#f8fafc" }}
            formatter={(v) => [`${v}/100`, "Score"]}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.score >= 65 ? "#34d399" : d.score >= 45 ? "#fbbf24" : "#f87171"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────
export default function App() {
  const [selectedCity, setSelectedCity] = useState(CITIES[1]); // London default
  const [emissionsData, setEmissionsData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [compareData, setCompareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // ── Fetch emissions + air quality ──
  const fetchCityData = useCallback(async (city) => {
    setLoading(true);
    try {
      const [emRes, airRes] = await Promise.all([
        fetch(`${API}/api/emissions/${encodeURIComponent(city.key)}`).then(r => r.json()),
        fetch(`${API}/api/airquality/${encodeURIComponent(city.key)}`).then(r => r.json()),
      ]);
      setEmissionsData(emRes.data);
      setAirData(airRes);
    } catch (e) {
      console.error("Error fetching city data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch all cities for comparison ──
  const fetchCompare = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/compare?cities=${CITIES.map(c => c.key).join(",")}`);
      const json = await res.json();
      setCompareData(json.data.map((d, i) => ({ ...d, city: CITIES[i]?.name || d.city })));
    } catch (e) {
      console.error("Compare fetch error:", e);
    }
  }, []);

  useEffect(() => { fetchCityData(selectedCity); }, [selectedCity]);
  useEffect(() => { fetchCompare(); }, []);

  const trendData = emissionsData?.trend?.map((v, i) => ({ month: MONTHS[i], co2: v })) || [];
  const sectorData = emissionsData ? [
    { name: "Transport", value: emissionsData.transport },
    { name: "Energy", value: emissionsData.energy },
    { name: "Industry", value: emissionsData.industry },
    { name: "Waste", value: emissionsData.waste },
  ] : [];

  const aqiData = airData?.aqi || airData?.data?.aqi;

  return (
    <div style={{
      minHeight: "100vh", background: "#020817",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#f8fafc"
    }}>
      {/* HEADER */}
      <header style={{
        borderBottom: "1px solid #1e293b", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, position: "sticky", top: 0, zIndex: 100,
        background: "rgba(2, 8, 23, 0.92)", backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🌍</span>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>
            City<span style={{ color: "#34d399" }}>Carbon</span>
          </span>
          <span style={{
            background: "#34d39922", color: "#34d399", fontSize: 10,
            padding: "2px 8px", borderRadius: 999, fontWeight: 600
          }}>LIVE</span>
        </div>

        {/* City Selector */}
        <div style={{ display: "flex", gap: 8 }}>
          {CITIES.map(c => (
            <button key={c.key} onClick={() => setSelectedCity(c)} style={{
              padding: "6px 14px", borderRadius: 999,
              border: selectedCity.key === c.key ? "1px solid #34d399" : "1px solid #1e293b",
              background: selectedCity.key === c.key ? "#34d39922" : "transparent",
              color: selectedCity.key === c.key ? "#34d399" : "#64748b",
              cursor: "pointer", fontWeight: 600, fontSize: 13,
              transition: "all 0.2s"
            }}>
              {c.flag} {c.name}
            </button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 32px" }}>

        {/* HERO SECTION */}
        <div style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}>
          {/* Score */}
          <div style={{
            background: "#0f172a", border: "1px solid #1e293b",
            borderRadius: 24, padding: "28px 36px",
            display: "flex", flexDirection: "column", alignItems: "center", minWidth: 220
          }}>
            <div style={{ color: "#64748b", fontSize: 13, marginBottom: 16, fontWeight: 600 }}>
              CARBON HEALTH SCORE
            </div>
            {loading ? (
              <div style={{ color: "#64748b", padding: 40 }}>Loading…</div>
            ) : (
              <ScoreRing score={emissionsData?.score || 50} />
            )}
            <div style={{ marginTop: 16 }}>
              {aqiData && <AQIBadge aqi={aqiData} />}
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <StatCard icon="🌡️" label="CO₂ Per Capita"
              value={emissionsData ? `${emissionsData.co2PerCapita}t` : "—"}
              sub="tonnes/year" color="#60a5fa" />
            <StatCard icon="🌍" label="vs National Avg"
              value={emissionsData ? `${emissionsData.nationalAvg}t` : "—"}
              sub="national average" color="#a78bfa" />
            <StatCard icon="💨" label="PM2.5"
              value={airData?.readings?.pm25 || airData?.data?.pm25 || "—"}
              sub="μg/m³ (live)" color="#fbbf24" />
            <StatCard icon="🏭" label="Biggest Sector"
              value={emissionsData ? Object.entries({
                Transport: emissionsData.transport,
                Energy: emissionsData.energy,
                Industry: emissionsData.industry
              }).sort((a, b) => b[1] - a[1])[0][0] : "—"}
              sub="highest emissions" color="#f87171" />
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid #1e293b", paddingBottom: 0 }}>
          {["overview", "sectors", "compare", "tips"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "10px 20px", fontWeight: 600, fontSize: 14,
              background: "transparent", border: "none",
              borderBottom: activeTab === tab ? "2px solid #34d399" : "2px solid transparent",
              color: activeTab === tab ? "#34d399" : "#64748b",
              cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s"
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Trend Chart */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: 20, fontSize: 16 }}>
                📈 CO₂ Score Trend (8 months)
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
                  <Tooltip contentStyle={{
                    background: "#1e293b", border: "1px solid #334155",
                    borderRadius: 10, color: "#f8fafc"
                  }} />
                  <Line type="monotone" dataKey="co2" stroke="#34d399"
                    strokeWidth={3} dot={{ fill: "#34d399", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sector Pie */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 20, padding: 24 }}>
              <h3 style={{ color: "#f8fafc", fontWeight: 700, marginBottom: 20, fontSize: 16 }}>
                🥧 Emissions by Sector
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%"
                    innerRadius={60} outerRadius={90}
                    paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} ${value}%`}
                    labelLine={false}>
                    {sectorData.map((_, i) => <Cell key={i} fill={SECTOR_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 10, color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB: SECTORS */}
        {activeTab === "sectors" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {sectorData.map((sector, i) => (
              <div key={i} style={{
                background: "#0f172a", border: "1px solid #1e293b",
                borderRadius: 20, padding: 24
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <span style={{ fontSize: 28, marginRight: 10 }}>{SECTOR_ICONS[sector.name]}</span>
                    <span style={{ color: "#f8fafc", fontWeight: 700, fontSize: 18 }}>{sector.name}</span>
                  </div>
                  <span style={{ color: SECTOR_COLORS[i], fontWeight: 800, fontSize: 28 }}>
                    {sector.value}%
                  </span>
                </div>
                {/* Progress Bar */}
                <div style={{ background: "#1e293b", borderRadius: 999, height: 10, overflow: "hidden" }}>
                  <div style={{
                    width: `${sector.value}%`, height: "100%",
                    background: SECTOR_COLORS[i], borderRadius: 999,
                    transition: "width 1s ease"
                  }} />
                </div>
                <div style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>
                  {sector.value > 30 ? "⚠️ High contributor — action needed"
                    : sector.value > 20 ? "🟡 Moderate — room for improvement"
                    : "✅ Under control"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: COMPARE */}
        {activeTab === "compare" && (
          compareData.length > 0
            ? <CompareBar compareData={compareData} />
            : <div style={{ color: "#64748b", padding: 40, textAlign: "center" }}>Loading comparison data…</div>
        )}

        {/* TAB: TIPS */}
        {activeTab === "tips" && (
          <TipsPanel tips={emissionsData?.tips} />
        )}

        {/* FOOTER */}
        <div style={{ marginTop: 40, textAlign: "center", color: "#334155", fontSize: 12 }}>
          Data sources: OpenAQ • Electricity Maps • Open-Meteo • EPA Emission Factors
          <span style={{ margin: "0 8px" }}>•</span>
          Built for CityCarbon Hackathon 🌿
        </div>
      </div>
    </div>
  );
}
