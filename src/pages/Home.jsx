export function Home({ setPage, setDifficulty }) {
  const handleStart = (level) => {
    setDifficulty(level);
    setPage("game");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center space-y-4 w-80">
      <h1 className="text-2xl font-bold text-blue-700">Math Challenge</h1>
      <p className="text-gray-600">Choose difficulty to start</p>
      <div className="space-y-2">
        <button onClick={() => handleStart("easy")} className="w-full bg-green-400 text-white py-2 rounded-xl">Easy</button>
        <button onClick={() => handleStart("medium")} className="w-full bg-yellow-400 text-white py-2 rounded-xl">Medium</button>
        <button onClick={() => handleStart("hard")} className="w-full bg-red-400 text-white py-2 rounded-xl">Hard</button>
      </div>
    </div>
  );
}
