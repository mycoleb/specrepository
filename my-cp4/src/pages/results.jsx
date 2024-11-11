// src/pages/Results.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, saveScore, getTopScores } from '../firebase';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [topScores, setTopScores] = useState([]);
  const { score = 0, total = 0 } = location.state || {};
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    fetchTopScores();
  }, []);

  const fetchTopScores = async () => {
    try {
      const scores = await getTopScores();
      setTopScores(scores);
    } catch (error) {
      console.error('Error fetching top scores:', error);
    }
  };

  const handleSaveScore = async () => {
    if (!auth.currentUser) {
      navigate('/login', { 
        state: { returnTo: '/results', scoreData: location.state }
      });
      return;
    }

    try {
      await saveScore(score, total, location.state?.category, location.state?.difficulty);
      await fetchTopScores();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
        
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-blue-500 mb-2">
            {percentage}%
          </p>
          <p className="text-xl">
            You got {score} out of {total} questions correct
          </p>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleSaveScore}
            className="bg-green-500 text-white px-6 py-2 rounded
                     hover:bg-green-600 transition-colors"
          >
            Save Score
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded
                     hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>

      {topScores.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Top Scores</h3>
          <div className="space-y-2">
            {topScores.map((topScore, index) => (
              <div 
                key={topScore.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span className="font-bold">#{index + 1}</span>
                <span>{topScore.userDisplayName}</span>
                <span>{topScore.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;