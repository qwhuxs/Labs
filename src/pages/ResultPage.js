import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useGameSettings } from "../context/GameSettingsContext";

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

const ScoreDisplay = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin: 30px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Message = styled.p`
  font-size: 1.3rem;
  text-align: center;
  margin: 20px 0;
  color: ${props => props.theme.colors.text};
`;

const RecentResults = styled.div`
  margin: 30px 0;
  padding: 20px;
  background: rgba(107, 197, 248, 0.1);
  border-radius: 15px;
`;

const ResultItem = styled(Link)`
  display: block;
  padding: 15px;
  margin: 10px 0;
  background: white;
  border-radius: 10px;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  border-left: 4px solid ${props => props.theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

const Navigation = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export default function ResultPage({ score, onRestart }) {
  const { settings } = useGameSettings();
  const { rounds } = settings;
  const [recentResults, setRecentResults] = useState([]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('gameResults') || '[]');
    setRecentResults(results.slice(-5).reverse()); // Останні 5 результатів
  }, []);

  const getMessage = () => {
    if (score >= rounds * 0.8) return "Вражаюче! Ти геній! 🎯";
    if (score >= rounds * 0.6) return "Чудовий результат! 🌟";
    if (score >= rounds * 0.4) return "Добре впорався! 👍";
    return "Спробуй ще раз! Ти покращиш результат! 💪";
  };

  return (
    <PageContainer>
      <h2>🎉 Результати гри</h2>
      
      <ScoreDisplay>{score}/{rounds}</ScoreDisplay>
      
      <Message>{getMessage()}</Message>

      {recentResults.length > 0 && (
        <RecentResults>
          <h3>Останні ігри:</h3>
          {recentResults.map((result, index) => (
            <ResultItem key={index} to={`/user/${result.id}`}>
              <strong>{result.score}/{rounds}</strong> - {new Date(result.date).toLocaleString('uk-UA')}
            </ResultItem>
          ))}
        </RecentResults>
      )}

      <Navigation>
        <Link to="/settings">
          <Button text="Грати ще раз 🔁" onClick={onRestart} />
        </Link>
        <Link to="/">
          <Button text="На головну 🏠" type="secondary" />
        </Link>
      </Navigation>
    </PageContainer>
  );
}