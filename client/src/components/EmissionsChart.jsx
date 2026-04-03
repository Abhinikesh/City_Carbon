import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ChartCard = styled.div`
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

export default function EmissionsChart({ data }) {
  return (
    <ChartCard>
      <Title><span>📈</span> CO₂ Score Trend (8 months)</Title>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: "#64748b", fontSize: 12 }} 
            axisLine={false} 
            tickLine={false}
            dy={10}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fill: "#64748b", fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              background: "rgba(15, 23, 42, 0.9)", 
              border: "1px solid #334155", 
              borderRadius: 12, 
              color: "#f8fafc",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)"
            }} 
            itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
          />
          <Line 
            type="monotone" 
            dataKey="co2" 
            stroke="#34d399"
            strokeWidth={4} 
            dot={{ fill: "#0f172a", stroke: "#34d399", strokeWidth: 3, r: 6 }} 
            activeDot={{ r: 8, fill: "#34d399", stroke: "#0f172a" }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
