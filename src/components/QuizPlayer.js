import React, { useState, useEffect } from 'react';
import Question from './Question';
import QuizResult from './QuizResult';

function QuizPlayer({ quiz, onReset, playerName }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(quiz.questions.length).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(quiz.timer || 60);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (quizSubmitted) return;

    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, quizSubmitted]);

  const handleAnswerChange = (answerIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleRestart = () => {
    onReset();
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setTimeRemaining(quiz.timer || 60);
  };

  if (quizSubmitted) {
    return <QuizResult quiz={quiz} answers={answers} onRestart={handleRestart} playerName={playerName} />;
  }

  return (
    <div className="quiz-player">
      <h2>{quiz.title}</h2>
      <p className="timer">Time Remaining: {timeRemaining}s</p>
      <Question
        question={quiz.questions[currentQuestionIndex]}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
      />
      <div className="navigation-buttons">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          className="nav-button"
        >
          Previous
        </button>
        <button
          disabled={currentQuestionIndex === quiz.questions.length - 1}
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          className="nav-button"
        >
          Next
        </button>
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default QuizPlayer;
