import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const Container = styled.div`
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

export default function CompareBar({ compareData }) {
  const data = compareData.map(d => ({ city: d.city, score: d.score }));
  
  return (
    <Container>
      <Title><span>🌍</span> City Comparison</Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="city" type="category" tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 600 }} width={90} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid #334155", borderRadius: 12, color: "#f8fafc", backdropFilter: "blur(8px)" }}
            formatter={(v) => [`${v} / 100`, "Score"]}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24} animationDuration={1500}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.score >= 65 ? "#34d399" : d.score >= 45 ? "#fbbf24" : "#f87171"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
