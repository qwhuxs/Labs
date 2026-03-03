import { useState, useEffect, useCallback } from "react";
import { useGameSettings } from "../context/GameSettingsContext";

const easyWords = [
  "КІТ","ПЕС","ЛИС","ЖУК","РАВЛИК","КАЧКА","ГУСАК","КОРОВА","КІЗА","ОВЕЦЯ",
  "РИБА","СОРОКА","ГОЛУБ","МУРАХА","МЕДУЗА","ЗЕБРА","КОЇ","ПАВУК","КРОТ","БИК"
];

const mediumWords = [
  "ВОВК","СОБАКА","ЛЕВЕНЯ","ОРЕЛ","ЛИСИЦЯ","БОРСУК","ЄНОТ","КАБАН","ОЛЕНЬ",
  "КОСУЛЯ","ВЕДМІДЬ","БІЛКА","ЯСТРУБ","ЧАЙКА","ПАНТЕРА"
];

const hardWords = [
  "БІЛОЧКА","ЖИРАФА","ХАМЕЛЕОН","АЛІГАТОР","АНАКОНДА","ФЛАМІНГО","КАПІБАРА",
  "КРОКОДИЛ","АНТИЛОПА","МАНДРИЛ","ПАПУГА","НОСОРОГ","СТРАУС","КАЙМАН","КОАЛА"
];

function shuffle(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

export function useGameLogic() {
  const { settings } = useGameSettings();
  const { rounds, difficulty, timer } = settings;

  const words =
    difficulty === "easy"
      ? easyWords
      : difficulty === "medium"
      ? mediumWords
      : hardWords;

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(timer);
  const [gameFinished, setGameFinished] = useState(false);

  const startNewRound = useCallback(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(shuffle(randomWord));
    setUserInput("");
    setTimeLeft(timer);
  }, [words, timer]);

  const checkAnswer = useCallback(() => {
    let newScore = score;
    if (userInput.toUpperCase() === currentWord) {
      newScore++;
      setScore(newScore);
    }

    // Перевіряємо чи це останній раунд
    if (round >= rounds) {
      setGameFinished(true);
      return { finished: true, score: newScore, maxRounds: rounds };
    }

    // Якщо не останній раунд - продовжуємо
    setRound(round + 1);
    return { finished: false };
  }, [userInput, currentWord, round, score, rounds]);

  const restartGame = useCallback(() => {
    setRound(1);
    setScore(0);
    setGameFinished(false);
    startNewRound();
  }, [startNewRound]);

  // Запуск нового раунду
  useEffect(() => {
    if (!gameFinished) {
      startNewRound();
    }
  }, [round, gameFinished, startNewRound]);

  // Логіка таймера
  useEffect(() => {
    if (timer === 0 || gameFinished) return;
    
    if (timeLeft <= 0) {
      checkAnswer();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          checkAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, timer, checkAnswer, gameFinished]);

  return {
    round,
    score,
    scrambledWord,
    userInput,
    timeLeft,
    gameFinished,
    setUserInput,
    checkAnswer,
    restartGame,
    maxRounds: rounds
  };
}