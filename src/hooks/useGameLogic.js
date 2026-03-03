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

/**
 * Shuffles the letters of a word randomly.
 * @param {string} word - The word to shuffle.
 * @returns {string} Shuffled word.
 */
function shuffle(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

/**
 * Custom hook for handling the anagram game logic.
 * Manages game rounds, word scrambling, score tracking, user input, and timer.
 * @returns {Object} An object containing game state and handler functions.
 * @property {number} round - Current round number.
 * @property {number} score - Current player score.
 * @property {string} scrambledWord - Current scrambled word to guess.
 * @property {string} userInput - Player's current input.
 * @property {number} timeLeft - Remaining time for the current round.
 * @property {boolean} gameFinished - Whether the game has finished.
 * @property {function} setUserInput - Setter for updating player input.
 * @property {function} checkAnswer - Function to check if current input is correct.
 * @property {function} restartGame - Function to restart the game from round 1.
 * @property {number} maxRounds - Maximum number of rounds in the game.
 */
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

  /** Starts a new round with a random word and resets inputs and timer */
  const startNewRound = useCallback(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(shuffle(randomWord));
    setUserInput("");
    setTimeLeft(timer);
  }, [words, timer]);

  /**
   * Checks if user's input is correct and updates score.
   * Ends game if last round is reached.
   * @returns {Object} Result object indicating if game finished and current score.
   */
  const checkAnswer = useCallback(() => {
    let newScore = score;
    if (userInput.toUpperCase() === currentWord) {
      newScore++;
      setScore(newScore);
    }

    if (round >= rounds) {
      setGameFinished(true);
      return { finished: true, score: newScore, maxRounds: rounds };
    }

    setRound(round + 1);
    return { finished: false };
  }, [userInput, currentWord, round, score, rounds]);

  /** Restarts the game from round 1 */
  const restartGame = useCallback(() => {
    setRound(1);
    setScore(0);
    setGameFinished(false);
    startNewRound();
  }, [startNewRound]);

  useEffect(() => {
    if (!gameFinished) {
      startNewRound();
    }
  }, [round, gameFinished, startNewRound]);

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