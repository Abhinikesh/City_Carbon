import styled from 'styled-components';

const Panel = styled.div`
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

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TipCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border-radius: 16px;
  padding: 20px 24px;
  border-left: 4px solid ${({ theme }) => theme.colors.accentGreen};
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    transform: translateX(4px);
    background: rgba(30, 41, 59, 0.7);
  }
`;

const TipNumber = styled.div`
  color: ${({ theme }) => theme.colors.accentGreen};
  font-weight: 800;
  font-size: 18px;
  min-width: 24px;
`;

const TipText = styled.div`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 15px;
  line-height: 1.6;
`;

export default function TipsPanel({ tips }) {
  if (!tips || tips.length === 0) return null;

  return (
    <Panel>
      <Title><span>💡</span> Actionable Reduction Tips</Title>
      <TipsList>
        {tips.map((tip, i) => (
          <TipCard key={i}>
            <TipNumber>{i + 1}.</TipNumber>
            <TipText>{tip}</TipText>
          </TipCard>
        ))}
      </TipsList>
    </Panel>
  );
}
