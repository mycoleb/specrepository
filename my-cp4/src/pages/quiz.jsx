// src/pages/Quiz.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import he from 'he';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answering, setAnswering] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    
    const { category, difficulty } = location.state || {};
    let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      
      if (data.response_code !== 0) {
        throw new Error('No questions available for selected criteria');
      }

      if (!data.results || data.results.length === 0) {
        throw new Error('No questions received');
      }

      setQuestions(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    if (answering) return; // Prevent multiple answers
    setAnswering(true);
    setSelectedAnswer(answer);

    const correct = answer === questions[currentQuestion].correct_answer;
    if (correct) setScore(score + 1);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 1000));

    setAnswering(false);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results', {
        state: {
          score,
          total: questions.length,
          category: location.state?.category,
          difficulty: location.state?.difficulty
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <ErrorMessage 
          message={error}
          onRetry={fetchQuestions}
        />
      </div>
    );
  }

  const question = questions[currentQuestion];
  const answers = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Progress bar */}
      <div className="mb-6 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="mb-4 text-center">
        <p className="text-lg">Question {currentQuestion + 1} of {questions.length}</p>
        <p className="text-md">Score: {score}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl mb-4">{he.decode(question.question)}</h2>
        <div className="space-y-3">
          {answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === question.correct_answer;
            
            let buttonClass = "w-full p-3 text-left rounded border transition-colors ";
            
            if (answering && isSelected) {
              buttonClass += isCorrect 
                ? "bg-green-100 border-green-500" 
                : "bg-red-100 border-red-500";
            } else if (!answering) {
              buttonClass += isSelected
                ? "bg-blue-100 border-blue-500"
                : "bg-white hover:bg-blue-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                className={buttonClass}
                disabled={answering}
              >
                {he.decode(answer)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Quiz;