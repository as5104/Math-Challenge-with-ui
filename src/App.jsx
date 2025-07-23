import { useState } from "react";
import { Home } from "./pages/Home";
import Game from "./pages/Game";
import Result from "./pages/Result";

export default function App() {
  const [page, setPage] = useState("home");
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      {page === "home" && (
        <Home setPage={setPage} setDifficulty={setDifficulty} />
      )}
      {page === "game" && (
        <Game
          difficulty={difficulty}
          setPage={setPage}
          setScore={setScore}
          setTotalQuestions={setTotalQuestions}
        />
      )}
      {page === "result" && (
        <Result
          score={score}
          total={totalQuestions}
          setPage={setPage}
        />
      )}
    </div>
  );
}
