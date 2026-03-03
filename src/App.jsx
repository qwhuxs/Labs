import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, AppContainer, PinkBlueBackground } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import StartPage from "./pages/StartPage";
import SettingsPage from "./pages/SettingsPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import UserResultsPage from "./pages/UserResultsPage";
import Header from "./components/Header";
import { GameSettingsProvider } from "./context/GameSettingsContext";

export default function App() {
  const [finalScore, setFinalScore] = useState(0);

  const handleGameFinish = (score) => {
    console.log("Game finished with score:", score);
    setFinalScore(score);

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const userResults = {
      id: userId,
      score: score,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    const allResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
    allResults.push(userResults);
    localStorage.setItem('gameResults', JSON.stringify(allResults));
    
    return userId;
  };

  const generateNewUser = () => {
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PinkBlueBackground />
      <Router>
        <GameSettingsProvider>
          <AppContainer>
            <Header />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/game" element={<GamePage onFinish={handleGameFinish} />} />
              <Route path="/results" element={<ResultPage score={finalScore} onRestart={generateNewUser} />} />
              <Route path="/user/:userId" element={<UserResultsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppContainer>
        </GameSettingsProvider>
      </Router>
    </ThemeProvider>
  );
}