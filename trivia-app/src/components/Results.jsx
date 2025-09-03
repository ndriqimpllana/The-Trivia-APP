// src/components/Results.jsx
import React from 'react';

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Results = ({ userName, result, onReset }) => {
  return (
    <>
      <div className="form-card">
        {result.isCorrect ? (
          <div className="results-message correct">
            <strong>Correct, {userName}!</strong> 🎉 You're a quiz whiz!
          </div>
        ) : (
          <div className="results-message incorrect">
            <strong>Sorry, {userName}, that's not right.</strong>
            <p className="correct-answer-text">
              The correct answer was: "{decodeHtml(result.correctAnswer)}"
            </p>
          </div>
        )}
        <button onClick={onReset} className="btn">
          Start Over
        </button>
      </div>
    </>
  );
};

export default Results;