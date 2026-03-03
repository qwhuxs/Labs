import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: ${props => props.theme.colors.background};
  padding: 40px;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.large};
  backdrop-filter: blur(10px);
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

const ResultCard = styled.div`
  background: linear-gradient(135deg, #fff, #f7fafc);
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
  border-left: 5px solid ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ScoreDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin: 20px 0;
`;

const UserId = styled.code`
  background: rgba(107, 197, 248, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  font-family: monospace;
  color: ${props => props.theme.colors.secondaryDark};
  word-break: break-all;
`;

const Navigation = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const ProgressBar = styled.div`
  background: #e2e8f0;
  height: 10px;
  border-radius: 5px;
  margin: 20px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 5px;
  transition: width 0.8s ease;
`;

const ResultMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
  font-weight: bold;
`;

export default function UserResultsPage() {
  const { userId } = useParams();
  const [userResult, setUserResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('gameResults') || '[]');
    const result = results.find(r => r.id === userId);
    setUserResult(result);
    setLoading(false);
  }, [userId]);

  if (loading) {
    return (
      <PageContainer>
        <h2>Завантаження...</h2>
      </PageContainer>
    );
  }

  if (!userResult) {
    return (
      <PageContainer>
        <h2>Результат не знайдено 😔</h2>
        <p>Результат для користувача з ID: <UserId>{userId}</UserId> не знайдено.</p>
        <Navigation>
          <Link to="/"><Button text="На головну 🏠" /></Link>
          <Link to="/results"><Button text="Мої результати 📊" type="secondary" /></Link>
        </Navigation>
      </PageContainer>
    );
  }

  const resultDate = new Date(userResult.date).toLocaleString('uk-UA');
  const progressPercentage = Math.min((userResult.score / 20) * 100, 100);

  const getResultMessage = (score) => {
    if (score >= 15) return 'Відмінно! Ти геній! 🏆';
    if (score >= 10) return 'Добре впорався! 👍';
    if (score >= 5) return 'Непоганий результат! 💪';
    return 'Спробуй ще раз! Ти покращиш! 🌟';
  };

  return (
    <PageContainer>
      <h2>📊 Результат гри</h2>
      <ResultCard>
        <p><strong>ID користувача:</strong></p>
        <UserId>{userResult.id}</UserId>
        
        <ScoreDisplay>{userResult.score} балів</ScoreDisplay>
        
        <p><strong>Дата гри:</strong> {resultDate}</p>
        
        <ProgressBar>
          <ProgressFill style={{ width: `${progressPercentage}%` }} />
        </ProgressBar>
        
        <ResultMessage>
          {getResultMessage(userResult.score)}
        </ResultMessage>
      </ResultCard>

      <Navigation>
        <Link to="/"><Button text="На головну 🏠" /></Link>
        <Link to="/results"><Button text="Всі результати 📈" type="secondary" /></Link>
        <Link to="/settings"><Button text="Грати знову 🔁" /></Link>
      </Navigation>
    </PageContainer>
  );
}