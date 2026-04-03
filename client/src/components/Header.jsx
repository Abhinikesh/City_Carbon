import styled from 'styled-components';
import CitySelector from './CitySelector';

const HeaderContainer = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(2, 8, 23, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.span`
  font-size: 26px;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
    100% { transform: translateY(0px); }
  }
`;

const LogoText = styled.span`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.textMain};

  span {
    color: ${({ theme }) => theme.colors.accentGreen};
  }
`;

const LiveBadge = styled.span`
  background: rgba(52, 211, 153, 0.15);
  color: ${({ theme }) => theme.colors.accentGreen};
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.accentGreen};
    border-radius: 50%;
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
`;

export default function Header({ selectedCity, onSelectCity, cities }) {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <LogoIcon>🌍</LogoIcon>
        <LogoText>
          City<span>Carbon</span>
        </LogoText>
        <LiveBadge>LIVE</LiveBadge>
      </LogoWrapper>
      
      <CitySelector 
        cities={cities} 
        selectedCity={selectedCity} 
        onSelectCity={onSelectCity} 
      />
    </HeaderContainer>
  );
}
