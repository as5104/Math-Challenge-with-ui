export default function Result({ score, total, setPage }) {
  const maxScore = 165;
  const displayScore = Math.min(score, maxScore);
  const percentage = Math.round((displayScore / maxScore) * 100);

  let grade = "D (Needs improvement)";
  let message = "Keep practicing and you'll improve!";

  if (percentage >= 95) {
    grade = "A+ (Excellent!)";
    message = "Perfect Game! You're unstoppable!";
  } else if (percentage >= 85) {
    grade = "A (Great!)";
    message = "You're a Math Master!";
  } else if (percentage >= 70) {
    grade = "B (Good job!)";
    message = "Solid work! Keep it up!";
  } else if (percentage >= 50) {
    grade = "C (Keep practicing!)";
    message = "You're getting there! Keep trying!";
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center space-y-4 w-80">
      <h1 className="text-2xl font-bold text-green-600">Game Over!</h1>
      <p className="text-xl">Score: {displayScore} / {maxScore}</p>
      <p className="text-lg text-gray-700">
        Grade: <span className="font-semibold">{grade}</span>
      </p>
      <p className="text-base text-blue-600 font-medium italic">{message}</p>
      <button
        onClick={() => setPage("home")}
        className="w-full bg-purple-500 text-white py-2 rounded-xl mt-4"
      >
        Play Again
      </button>
    </div>
  );
}