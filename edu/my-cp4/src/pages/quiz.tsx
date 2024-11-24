import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import he from 'he';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface LocationState {
  category?: string;
  difficulty?: string;
}

function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [answering, setAnswering] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    fetchQuestions();
    return () => {
      setQuestions([]);
      setCurrentQuestion(0);
      setScore(0);
    };
  }, []);
  
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    
    const { category, difficulty } = state || {};
    let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
  
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
  
        const response = await fetch(url, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.response_code !== 0) {
          switch (data.response_code) {
            case 1:
              throw new Error('No questions found for selected criteria');
            case 2:
              throw new Error('Invalid parameter in API request');
            case 3:
              throw new Error('Session token not found');
            case 4:
              throw new Error('No more questions available');
            default:
              throw new Error('Failed to fetch questions');
          }
        }
  
        if (!data.results || data.results.length === 0) {
          throw new Error('No questions received from the server');
        }
  
        setQuestions(data.results);
        setError(null);
        setRetryCount(0);
        break;
  
      } catch (error) {
        let errorMessage: Error;
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            errorMessage = new Error('Request timed out. Server might be busy.');
          } else {
            errorMessage = error;
          }
        } else {
          errorMessage = new Error('An unknown error occurred');
        }
        
        if (!navigator.onLine) {
          errorMessage = new Error('No internet connection. Please check your network.');
        }
        
        if (attempt === maxRetries - 1) {
          setError(errorMessage);
          setQuestions([]);
        } else {
          attempt++;
          await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    setLoading(false);
  };

  const handleAnswer = async (answer: string) => {
    if (answering) return;
    setAnswering(true);
    setSelectedAnswer(answer);

    const correct = answer === questions[currentQuestion].correct_answer;
    if (correct) setScore(score + 1);

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
          category: state?.category,
          difficulty: state?.difficulty
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        {/* <LoadingSpinner /> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="text-red-500">{error.message}</div>
      </div>
    );
  }

  if (!questions.length) {
    return <div className="text-center mt-10">No questions available.</div>;
  }

  const question = questions[currentQuestion];
  const answers = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5);

  return (
    <div className="max-w-2xl mx-auto p-4">
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