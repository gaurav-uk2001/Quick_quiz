import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './QuizResult.css'; // Custom CSS file for styling

function QuizResult({ quiz, answers, onRestart, playerName }) {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Implement feedback submission logic here
    alert('Thank you for your feedback!');
  };

  return (
    <div className="quiz-result">
      <h2>Quiz Results</h2>
      <p><strong>Player:</strong> {playerName}</p>
      <p><strong>Title:</strong> {quiz.title}</p>
      
      <h3>Correct Answers</h3>
      <ul>
        {quiz.questions.map((q, i) => (
          <li key={i}>
            <strong>{q.question}</strong>: <span className="correct-answer">{q.options[q.correct]}</span>
          </li>
        ))}
      </ul>

      <h3>Your Answers</h3>
      <ul>
        {quiz.questions.map((q, i) => (
          <li key={i}>
            <strong>{q.question}</strong>: <span className={answers[i] === q.correct ? "correct" : "incorrect"}>
              {answers[i] !== null ? q.options[answers[i]] : 'No answer'}
            </span>
          </li>
        ))}
      </ul>

      <div className="feedback-section">
        <h3>Feedback</h3>
        <textarea
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <button onClick={handleSubmitFeedback} className="feedback-submit-button">Submit Feedback</button>
      </div>

      <button onClick={onRestart} className="restart-button">Restart Quiz</button>
    </div>
  );
}

QuizResult.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correct: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRestart: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default QuizResult;
