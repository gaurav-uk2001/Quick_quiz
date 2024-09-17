// src/components/QuizCreator.js
import React, { useState } from 'react';

function QuizCreator({ setQuiz }) {
  const [title, setTitle] = useState('');
  const [timer, setTimer] = useState(60);
  const [questions, setQuestions] = useState([{ question: '', options: ['', ''], correct: 0 }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], correct: 0 }]);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleChangeQuestion = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleChangeOption = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Please enter a quiz title.');
      return;
    }
    if (timer <= 0) {
      alert('Please set a valid timer.');
      return;
    }
    if (questions.some(q => q.question.trim() === '' || q.options.some(o => o.trim() === '') || q.correct >= q.options.length)) {
      alert('Please complete all questions and options, and ensure the correct option is valid.');
      return;
    }
    setQuiz({ title, timer, questions });
  };

  return (
    <div className="quiz-creator">
      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Timer (seconds)"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          required
        />
        {questions.map((q, i) => (
          <div key={i} className="question-container">
            <input
              type="text"
              name="question"
              placeholder={`Question ${i + 1}`}
              value={q.question}
              onChange={(e) => handleChangeQuestion(i, e)}
              required
            />
            {q.options.map((o, j) => (
              <div key={j} className="option-container">
                <input
                  type="text"
                  placeholder={`Option ${j + 1}`}
                  value={o}
                  onChange={(e) => handleChangeOption(i, j, e)}
                  required
                />
                <button type="button" onClick={() => removeOption(i, j)} className="remove-option">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addOption(i)} className="add-option">Add Option</button>
            <select
              name="correct"
              value={q.correct}
              onChange={(e) => handleChangeQuestion(i, e)}
            >
              {q.options.map((_, j) => (
                <option key={j} value={j}>{`Option ${j + 1}`}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Save Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreator;
