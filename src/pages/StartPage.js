import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: ${props => props.theme.colors.background};
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.large};
  backdrop-filter: blur(10px);
  text-align: center;
  animation: fadeInUp 0.6s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  text-align: left;
  margin: 30px 0;
  padding: 0 20px;
`;

const FeatureItem = styled.li`
  margin: 15px 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  
  &::before {
    content: '✨ ';
  }
`;

export default function StartPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/settings');
  };

  return (
    <PageContainer>
      <Title>Ласкаво просимо!</Title>
      <Description>
        Готові тренувати свій мозок? Відгадайте слова-анаграми та покращуйте свої навички!
      </Description>

      <FeaturesList>
        <FeatureItem>Кілька рівнів складності</FeatureItem>
        <FeatureItem>Налаштовувана кількість раундів</FeatureItem>
        <FeatureItem>Таймер для додаткового виклику</FeatureItem>
        <FeatureItem>Відстеження результатів</FeatureItem>
      </FeaturesList>

      <Button 
        text="Розпочати гру 🚀" 
        onClick={handleStart}
        style={{ 
          fontSize: '1.3rem',
          padding: '15px 30px'
        }}
      />
    </PageContainer>
  );
}