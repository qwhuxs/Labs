import { createContext, useContext, useState, useEffect } from "react";

const GameSettingsContext = createContext();

export const GameSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("game-settings");
    return saved
      ? JSON.parse(saved)
      : {
          rounds: 5,
          difficulty: "easy",
          timer: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("game-settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <GameSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => useContext(GameSettingsContext);
