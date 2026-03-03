import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Portal from "./Portal";
import Button from "./Button";
import { useGameSettings } from "../context/GameSettingsContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalWindow = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 40px;
  width: 90%;
  max-width: 400px;
  border-radius: 20px;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.large};
  animation: popIn 0.4s ease;

  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  font-size: 1.8rem;
`;

const ModalText = styled.p`
  margin: 15px 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
`;

const ModalActions = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export default function GameFinishModal({ score, onRestart, onNext }) {
  const navigate = useNavigate();
  const { settings } = useGameSettings();
  const { rounds } = settings;

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      navigate('/results');
    }
  };

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      navigate('/settings');
    }
  };

  return (
    <Portal>
      <ModalOverlay>
        <ModalWindow>
          <ModalTitle>Гру завершено 🎉</ModalTitle>
          <ModalText>Твій результат: {score} з {rounds}</ModalText>
          <ModalText>
            {score >= rounds * 0.8 ? "Вражаюче! Ти геній! 🏆" : 
             score >= rounds * 0.6 ? "Чудовий результат! 🌟" : 
             score >= rounds * 0.4 ? "Добре впорався! 👍" : 
             "Спробуй ще раз! Ти покращиш! 💪"}
          </ModalText>

          <ModalActions>
            <Button text="Перейти до результатів 📊" onClick={handleNext} />
            <Button text="Грати знову 🔁" type="secondary" onClick={handleRestart} />
          </ModalActions>
        </ModalWindow>
      </ModalOverlay>
    </Portal>
  );
}