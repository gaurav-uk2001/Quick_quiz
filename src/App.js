import React, { useState } from 'react';
import QuizCreator from './components/QuizCreator';
import QuizPlayer from './components/QuizPlayer';
import './App.css';

function App() {
  const [quiz, setQuiz] = useState(null);
  const [playerName, setPlayerName] = useState(''); // State to manage player name

  const handleResetQuiz = () => {
    setQuiz(null);
    setPlayerName(''); // Reset player name when resetting quiz
  };

  const handleSetPlayerName = (name) => {
    setPlayerName(name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
      </header>
      <main>
        {quiz === null ? (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => handleSetPlayerName(e.target.value)}
              required
            />
            <QuizCreator setQuiz={setQuiz} />
          </div>
        ) : (
          playerName ? (
            <QuizPlayer quiz={quiz} onReset={handleResetQuiz} playerName={playerName} />
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => handleSetPlayerName(e.target.value)}
                required
              />
              <QuizCreator setQuiz={setQuiz} />
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
