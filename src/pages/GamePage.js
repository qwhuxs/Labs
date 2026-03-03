import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import GameFinishModal from "../components/GameFinishModal";
import { useGameLogic } from "../hooks/useGameLogic";

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

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight}, ${props => props.theme.colors.secondaryLight});
  padding: 15px 20px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  box-shadow: ${props => props.theme.shadows.small};
`;

const ScrambledWord = styled.h3`
  font-size: 3rem;
  letter-spacing: 8px;
  margin: 30px 0;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  border: 2px dashed ${props => props.theme.colors.primary};
`;

const GameInput = styled.input`
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 12px;
  border: 3px solid ${props => props.theme.colors.secondary};
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 15px rgba(255, 107, 157, 0.3);
    transform: scale(1.02);
  }
`;

const GameButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export default function GamePage({ onFinish }) {
  const navigate = useNavigate();
  const {
    round,
    score,
    scrambledWord,
    userInput,
    timeLeft,
    gameFinished,
    setUserInput,
    checkAnswer,
    restartGame,
    maxRounds
  } = useGameLogic();

  const [showModal, setShowModal] = useState(false);
  const isLastRound = round >= maxRounds;

  const handleCheck = () => {
    const result = checkAnswer();
    if (result.finished) {
      setShowModal(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const handleFinishGame = () => {
    onFinish(score);
    navigate('/results');
  };

  useEffect(() => {
    if (gameFinished) {
      setShowModal(true);
    }
  }, [gameFinished]);

  const handleRestart = () => {
    restartGame();
    setShowModal(false);
  };

  const handleNextRound = () => {
    setShowModal(false);
    onFinish(score);
    navigate('/results');
  };

  return (
    <PageContainer>
      <GameInfo>
        <InfoCard>Раунд: {round}/{maxRounds}</InfoCard>
        <InfoCard>Очки: {score}</InfoCard>
        {timeLeft > 0 && <InfoCard>⏳ {timeLeft} сек</InfoCard>}
      </GameInfo>

      <ScrambledWord>{scrambledWord}</ScrambledWord>
      
      <GameInput
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Вгадай тварину..."
        autoFocus
      />
      
      <GameButtons>
        <Button text="Перевірити ✅" onClick={handleCheck} />
        
        {isLastRound && (
          <Button 
            text="Завершити гру 🏁" 
            type="secondary" 
            onClick={handleFinishGame} 
          />
        )}
      </GameButtons>
      
      {showModal && (
        <GameFinishModal
          score={score}
          onRestart={handleRestart}
          onNext={handleNextRound}
        />
      )}
    </PageContainer>
  );
}