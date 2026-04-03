import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const SECTOR_COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];
const SECTOR_ICONS = { Transport: "🚗", Energy: "⚡", Industry: "🏭", Waste: "♻️" };

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textMain};
  font-weight: 700;
  margin-bottom: 24px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const SectorCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 20px;
  padding: 24px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(30, 41, 59, 0.7);
  }
`;

const SectorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectorIdent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectorIcon = styled.span`
  font-size: 28px;
`;

const SectorName = styled.span`
  color: ${({ theme }) => theme.colors.textMain};
  font-weight: 700;
  font-size: 16px;
`;

const SectorValue = styled.span`
  color: ${({ $color }) => $color};
  font-weight: 800;
  font-size: 24px;
`;

const ProgressBarBg = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border-radius: 999px;
  height: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: 999px;
  width: ${({ $width }) => $width}%;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px ${({ $color }) => $color}66;
`;

const SectorStatus = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 500;
`;

export default function SectorBreakdown({ data, activeTab }) {
  const sectorData = data ? [
    { name: "Transport", value: data.transport },
    { name: "Energy", value: data.energy },
    { name: "Industry", value: data.industry },
    { name: "Waste", value: data.waste },
  ] : [];

  if (activeTab === "overview") {
    return (
      <Card>
        <Title><span>🥧</span> Emissions by Sector</Title>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie 
              data={sectorData} 
              cx="50%" 
              cy="50%"
              innerRadius={70} 
              outerRadius={100}
              paddingAngle={6} 
              dataKey="value" 
              label={({ name, value }) => `${name} ${value}%`}
              labelLine={false}
              animationDuration={1500}
              animationBegin={200}
            >
              {sectorData.map((_, i) => <Cell key={i} fill={SECTOR_COLORS[i]} stroke="transparent" />)}
            </Pie>
            <Tooltip 
              contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid #334155", borderRadius: 12, color: "#fff", backdropFilter: "blur(8px)" }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    );
  }

  // Sectors Tab View
  return (
    <SectorGrid>
      {sectorData.map((sector, i) => (
        <SectorCard key={i}>
          <SectorHeader>
            <SectorIdent>
              <SectorIcon>{SECTOR_ICONS[sector.name]}</SectorIcon>
              <SectorName>{sector.name}</SectorName>
            </SectorIdent>
            <SectorValue $color={SECTOR_COLORS[i]}>{sector.value}%</SectorValue>
          </SectorHeader>
          
          <ProgressBarBg>
            <ProgressBarFill $width={sector.value} $color={SECTOR_COLORS[i]} />
          </ProgressBarBg>
          
          <SectorStatus>
            {sector.value > 30 ? "⚠️ High contributor — action needed"
              : sector.value > 20 ? "🟡 Moderate — room for improvement"
              : "✅ Under control"}
          </SectorStatus>
        </SectorCard>
      ))}
    </SectorGrid>
  );
}
