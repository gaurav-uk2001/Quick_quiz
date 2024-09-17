// src/components/Question.js
import React from 'react';

function Question({ question, selectedAnswer, onAnswerChange }) {
  const handleOptionChange = (event) => {
    onAnswerChange(parseInt(event.target.value, 10)); // Ensure the value is parsed as integer
  };

  return (
    <div className="question">
      <h3>{question.question}</h3>
      {question.options.map((o, i) => (
        <div key={i} className="option">
          <input
            type="radio"
            name="answer"
            value={i}
            checked={selectedAnswer === i}
            onChange={handleOptionChange}
          />
          <label>{o}</label>
        </div>
      ))}
    </div>
  );
}

export default Question;
