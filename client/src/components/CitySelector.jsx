import styled from 'styled-components';

const SelectorWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const PillButton = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accentGreen : theme.colors.cardBorder};
  background: ${({ $isActive, theme }) => 
    $isActive ? 'rgba(52, 211, 153, 0.15)' : 'rgba(15, 23, 42, 0.5)'};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accentGreen : theme.colors.textMuted};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: ${({ $isActive, theme }) => 
    $isActive ? `0 0 12px rgba(52, 211, 153, 0.2)` : 'none'};

  &:hover {
    background: ${({ $isActive }) => 
      $isActive ? 'rgba(52, 211, 153, 0.2)' : 'rgba(30, 41, 59, 0.8)'};
    color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.accentGreen : theme.colors.textMain};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function CitySelector({ cities, selectedCity, onSelectCity }) {
  return (
    <SelectorWrapper>
      {cities.map(c => (
        <PillButton 
          key={c.key} 
          $isActive={selectedCity.key === c.key}
          onClick={() => onSelectCity(c)}
        >
          <span>{c.flag}</span>
          {c.name}
        </PillButton>
      ))}
    </SelectorWrapper>
  );
}
