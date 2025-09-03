// src/App.jsx
import React, { useState } from 'react';
import Home from './components/Home';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';
import './App.css'; // This line imports all the styles

function App() {
  const [gameState, setGameState] = useState('home'); // 'home', 'question', 'results'
  const [userSettings, setUserSettings] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async (settings) => {
    setUserSettings(settings);
    setIsLoading(true);
    setApiError(null);
    setGameState('question');

    const url = `https://opentdb.com/api.php?amount=1&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok.');
      
      const data = await response.json();
      
      if (data.response_code === 0 && data.results.length > 0) {
        setQuestionData(data.results[0]);
      } else {
        throw new Error('Could not fetch a question. Please try different options.');
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnswerSubmit = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questionData.correct_answer;
    setResult({
      isCorrect,
      correctAnswer: questionData.correct_answer,
    });
    setGameState('results');
  };

  const handleReset = () => {
    setGameState('home');
    setUserSettings(null);
    setQuestionData(null);
    setResult(null);
    setApiError(null);
  };

  const renderContent = () => {
    if (isLoading) return <p>Fetching your question...</p>;
    
    if (apiError) {
      return (
        <div>
          <p className="error-message">{apiError}</p>
          <button onClick={handleReset} className="btn btn-secondary">Try Again</button>
        </div>
      );
    }

    switch (gameState) {
      case 'question':
        return <QuestionForm questionData={questionData} onAnswerSubmit={handleAnswerSubmit} />;
      case 'results':
        return <Results userName={userSettings.name} result={result} onReset={handleReset} />;
      case 'home':
      default:
        return <Home onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="quiz-container">
      
        <h1>THE<img className='trivia-image' src="/trivia.png" alt="Trivia Logo" />APP</h1>
      
      {renderContent()}
    </div>
  );
}

export default App;