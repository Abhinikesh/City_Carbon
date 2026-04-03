import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 24px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 280px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 150px;
    height: 150px;
    background: ${({ $color }) => $color};
    opacity: 0.1;
    filter: blur(50px);
    border-radius: 50%;
  }
`;

const TitleLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  margin-bottom: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const StatsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCardBox = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: ${({ $color }) => $color}44;
  }
`;

const StatIcon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
  background: ${({ $color }) => $color}15;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const StatValue = styled.div`
  color: ${({ $color }) => $color};
  font-weight: 800;
  font-size: 26px;
  letter-spacing: -0.5px;
`;

const StatSub = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.8;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}44;
  border-radius: 999px;
  padding: 8px 16px;
  margin-top: 24px;
  box-shadow: 0 0 15px ${({ $color }) => $color}15;
  
  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    box-shadow: 0 0 5px ${({ $color }) => $color};
  }
  
  span.text {
    color: ${({ $color }) => $color};
    font-weight: 700;
    font-size: 13px;
  }
`;

// -- Components --
function ScoreRing({ score }) {
  const color = score >= 65 ? "#34d399" : score >= 45 ? "#fbbf24" : "#f87171";
  const label = score >= 65 ? "Good" : score >= 45 ? "Moderate" : score >= 30 ? "Poor" : "Critical";
  const r = 70, circumference = 2 * Math.PI * r;
  const filled = ((100 - score) / 100) * circumference;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ filter: `drop-shadow(0 0 10px ${color}33)` }}>
        <circle cx="90" cy="90" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circumference} strokeDashoffset={filled}
          strokeLinecap="round" transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        <text x="90" y="82" textAnchor="middle" fill={color}
          style={{ fontSize: 42, fontWeight: 900, fontFamily: "inherit", letterSpacing: '-1px' }}>{score}</text>
        <text x="90" y="112" textAnchor="middle" fill="#64748b"
          style={{ fontSize: 14, fontFamily: "inherit", fontWeight: 600 }}>/ 100</text>
      </svg>
      <div style={{ color, fontWeight: 800, fontSize: 20, marginTop: 12, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <StatCardBox $color={color}>
      <StatIcon $color={color}>{icon}</StatIcon>
      <StatLabel>{label}</StatLabel>
      <StatValue $color={color}>{value}</StatValue>
      {sub && <StatSub>{sub}</StatSub>}
    </StatCardBox>
  );
}

function AQIBadge({ aqi }) {
  if (!aqi) return null;
  return (
    <Badge $color={aqi.color}>
      <span className="dot" />
      <span className="text">AQI {aqi.value} — {aqi.label}</span>
    </Badge>
  );
}

export default function HeroSection({ emissionsData, airData, loading }) {
  const aqiData = airData?.aqi || airData?.data?.aqi;
  const score = emissionsData?.score || 0;
  const scoreColor = score >= 65 ? "#34d399" : score >= 45 ? "#fbbf24" : "#f87171";

  // Calculate biggest sector
  let biggestSector = "—";
  if (emissionsData) {
    const sectors = {
      Transport: emissionsData.transport,
      Energy: emissionsData.energy,
      Industry: emissionsData.industry
    };
    biggestSector = Object.entries(sectors).sort((a, b) => b[1] - a[1])[0][0];
  }

  return (
    <HeroContainer>
      <ScoreCard $color={scoreColor}>
        <TitleLabel>Carbon Health Score</TitleLabel>
        {loading ? (
          <div style={{ color: "#64748b", padding: 40 }}>Loading…</div>
        ) : (
          <ScoreRing score={score} />
        )}
        {aqiData && <AQIBadge aqi={aqiData} />}
      </ScoreCard>

      <StatsGrid>
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
          value={biggestSector}
          sub="highest emissions" color="#f87171" />
      </StatsGrid>
    </HeroContainer>
  );
}
