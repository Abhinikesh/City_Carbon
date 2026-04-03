import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import EmissionsChart from "../components/EmissionsChart";
import SectorBreakdown from "../components/SectorBreakdown";
import AirQualityMap from "../components/AirQualityMap";
import TipsPanel from "../components/TipsPanel";
import CompareBar from "../components/CompareBar";

// ─── CONFIG ───────────────────────────────────────────
const API = import.meta.env.VITE_API_URL || "";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const CITIES = [
  { name: "Delhi", key: "delhi", flag: "🇮🇳" },
  { name: "London", key: "london", flag: "🇬🇧" },
  { name: "Tokyo", key: "tokyo", flag: "🇯🇵" },
  { name: "New York", key: "new york", flag: "🇺🇸" },
  { name: "Mumbai", key: "mumbai", flag: "🇮🇳" },
  { name: "Berlin", key: "berlin", flag: "🇩🇪" },
];

const MainWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-bottom: 2px;
`;

const TabButton = styled.button`
  padding: 12px 24px;
  font-weight: 600;
  font-size: 15px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accentGreen : "transparent"};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accentGreen : theme.colors.textMuted};
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.accentGreenHover : theme.colors.textMain};
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Footer = styled.div`
  margin-top: 64px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  padding-bottom: 32px;
  
  span.dot {
    margin: 0 12px;
    opacity: 0.5;
  }
`;

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState(CITIES[1]);
  const [emissionsData, setEmissionsData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [compareData, setCompareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

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

  const fetchCompare = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/compare?cities=${CITIES.map(c => c.key).join(",")}`);
      const json = await res.json();
      setCompareData(json.data.map((d, i) => ({ ...d, city: CITIES[i]?.name || d.city })));
    } catch (e) {
      console.error("Compare fetch error:", e);
    }
  }, []);

  useEffect(() => { fetchCityData(selectedCity); }, [selectedCity, fetchCityData]);
  useEffect(() => { fetchCompare(); }, [fetchCompare]);

  const trendData = emissionsData?.trend?.map((v, i) => ({ month: MONTHS[i], co2: v })) || [];

  return (
    <>
      <Header 
        cities={CITIES} 
        selectedCity={selectedCity} 
        onSelectCity={setSelectedCity} 
      />

      <MainWrapper>
        <HeroSection 
          emissionsData={emissionsData} 
          airData={airData} 
          loading={loading} 
        />

        <TabsContainer>
          {["overview", "sectors", "compare", "tips"].map(tab => (
            <TabButton 
              key={tab} 
              $isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </TabsContainer>

        {activeTab === "overview" && (
          <OverviewGrid>
            <EmissionsChart data={trendData} />
            <SectorBreakdown data={emissionsData} activeTab={activeTab} />
            <AirQualityMap airData={airData} />
            <TipsPanel tips={emissionsData?.tips} />
          </OverviewGrid>
        )}

        {activeTab === "sectors" && (
          <SectorBreakdown data={emissionsData} activeTab={activeTab} />
        )}

        {activeTab === "compare" && (
          compareData.length > 0
            ? <CompareBar compareData={compareData} />
            : <div style={{ color: "#64748b", padding: 40, textAlign: "center" }}>Loading comparison data…</div>
        )}

        {activeTab === "tips" && (
          <TipsPanel tips={emissionsData?.tips} />
        )}

        <Footer>
          Data sources: OpenAQ • Electricity Maps • Open-Meteo • EPA Emission Factors
          <span className="dot">•</span>
          Built for CityCarbon Hackathon 🌿
        </Footer>
      </MainWrapper>
    </>
  );
}
