// src/components/QuestionForm.jsx
import React, { useState, useEffect } from 'react';

const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const QuestionForm = ({ questionData, onAnswerSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        if (questionData) {
            const answers = [
                ...questionData.incorrect_answers,
                questionData.correct_answer,
            ];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5).map(decodeHtml));
        }
    }, [questionData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            setError('You must select an answer.');
            return;
        }
        setError('');
        onAnswerSubmit(selectedAnswer);
    };

    if (!questionData) return <p>Loading question...</p>;

    return (
        <>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <p className="question-text">{decodeHtml(questionData.question)}</p>
                    <div className="radio-group">
                        {shuffledAnswers.map((answer, index) => (
                            <div key={index} className="radio-option">
                                <input
                                    type="radio"
                                    id={`answer-${index}`}
                                    name="answer"
                                    value={answer}
                                    checked={selectedAnswer === answer}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                <label htmlFor={`answer-${index}`}>{answer}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn submit-btn">Submit Answer</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </>
    );
};

export default QuestionForm;