import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function generateProblem(operators, min, max) {
  const op = operators[Math.floor(Math.random() * operators.length)];
  let left, right, answer;

  if (op === "/") {
    right = Math.floor(Math.random() * (max - min + 1)) + min;
    answer = Math.floor(Math.random() * (max - min + 1)) + min;
    left = right * answer;
    answer = parseFloat((left / right).toFixed(2));
  } else {
    left = Math.floor(Math.random() * (max - min + 1)) + min;
    right = Math.floor(Math.random() * (max - min + 1)) + min;
    answer = eval(`${left} ${op} ${right}`);
  }
  return { question: `${left} ${op} ${right}`, answer };
}

function getSettings(difficulty) {
  if (difficulty === "easy") return [["+", "-"], 1, 10, 15];
  if (difficulty === "medium") return [["+", "-", "*"], 3, 12, 12];
  return [["+", "-", "*", "/"], 5, 20, 10];
}

export default function Game({ difficulty, setPage, setScore, setTotalQuestions }) {
  const TOTAL_QUESTIONS = 10;
  const [operators, min, max, limit] = getSettings(difficulty);

  const [qData, setQData] = useState(generateProblem(operators, min, max));
  const [userAnswer, setUserAnswer] = useState("");
  const [score, updateScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(limit);
  const [streak, setStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    const isCorrect = (() => {
      if (qData.question.includes("/")) {
        return Math.abs(parseFloat(userAnswer) - qData.answer) < 0.01;
      }
      return parseInt(userAnswer) === qData.answer;
    })();

    let earned = 0;
    if (isCorrect) {
      if (attempt === 0) {
        earned += 10;
        if (timeLeft >= limit - 5) earned += 5;
        setStreak((prev) => (prev === 2 ? 0 : prev + 1));
        if (streak === 2) earned += 5;
      } else {
        earned += 5;
        setStreak(0);
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setStreak(0);
    }

    updateScore(score + earned);
    setUserAnswer("");
    setAttempt(0);
    setTimeLeft(limit);
    setQData(generateProblem(operators, min, max));
    setQuestionCount(questionCount + 1);

    if (questionCount >= TOTAL_QUESTIONS) {
      setLastScore(score + earned);
      setShowSummary(true);
    }
  };

  const handleSubmit = () => {
    setAttempt(attempt + 1);
    nextQuestion();
  };

  const handleFinish = () => {
    setScore(lastScore);
    setTotalQuestions(TOTAL_QUESTIONS);
    setPage("result");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center space-y-4 w-80 relative">
      <h2 className="text-xl font-semibold">Time Left: {timeLeft}s</h2>
      <motion.div
        className="h-2 bg-blue-200 rounded-xl overflow-hidden"
      >
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / limit) * 100}%` }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </motion.div>
      <h1 className="text-2xl text-blue-600">{qData.question}</h1>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full p-2 border rounded-xl text-center"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-xl mt-2"
      >
        Submit
      </button>
      <p>Score: {score}</p>
      <p>Question: {questionCount} / {TOTAL_QUESTIONS}</p>

      {showSummary && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-72">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <p className="text-lg">Final Score: {lastScore}</p>
            <p>Mistakes: {wrongAttempts}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl"
              onClick={handleFinish}
            >
              View Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
