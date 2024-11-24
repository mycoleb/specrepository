// src/pages/Results.jsx
import { useLocation, useNavigate } from 'react-router-dom';
// import { useEffect, useState, useMemo } from 'react'; 
// import { auth, saveScore, getTopScores } from '../firebase';
//import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  // const [topScores, setTopScores] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [saveStatus, setSaveStatus] = useState({ loading: false, error: null });
  
  const { score = 0, total = 0 } = location.state || {};
  const percentage = Math.round((score / total) * 100);

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

        <div className="flex space-x-4 justify-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded
                     hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;


// // src/pages/Results.jsx
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useEffect, useState, useMemo } from 'react'; 
// import { auth, saveScore, getTopScores } from '../firebase';
// //import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

// function Results() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [topScores, setTopScores] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [saveStatus, setSaveStatus] = useState({ loading: false, error: null });
  
//   const { score = 0, total = 0 } = location.state || {};
//   const percentage = Math.round((score / total) * 100);

  
//   useEffect(() => {
//     fetchTopScores();
//   }, []);

//   const fetchTopScores = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const scores = await getTopScores();
//       setTopScores(scores);
//     } catch (error) {
//       setError('Failed to load top scores. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Add optimization for top scores

// const topScoresMemoized = useMemo(() => 
//   topScores.slice(0, 10).map(score => ({
//     ...score,
//     formattedDate: new Date(score.timestamp).toLocaleDateString()
//   })),
//   [topScores]
// );

//   const handleSaveScore = async () => {
//     if (!auth.currentUser) {
//       navigate('/login', { 
//         state: { returnTo: '/results', scoreData: location.state }
//       });
//       return;
//     }

//     setSaveStatus({ loading: true, error: null });
//     try {
//       await saveScore(score, total, location.state?.category, location.state?.difficulty);
//       await fetchTopScores();
//       setSaveStatus({ loading: false, error: null });
//     } catch (error) {
//       setSaveStatus({ 
//         loading: false, 
//         error: 'Failed to save score. Please try again.' 
//       });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
        
//         <div className="text-center mb-6">
//           <p className="text-5xl font-bold text-blue-500 mb-2">
//             {percentage}%
//           </p>
//           <p className="text-xl">
//             You got {score} out of {total} questions correct
//           </p>
//         </div>

//         {saveStatus.error && (
//           <ErrorMessage 
//             message={saveStatus.error}
//             onRetry={handleSaveScore}
//           />
//         )}

//         <div className="flex space-x-4 justify-center mt-4">
//           <button
//             onClick={handleSaveScore}
//             disabled={saveStatus.loading}
//             className="bg-green-500 text-white px-6 py-2 rounded
//                      hover:bg-green-600 transition-colors disabled:bg-gray-400"
//           >
//             {saveStatus.loading ? 'Saving...' : 'Save Score'}
//           </button>
//           <button
//             onClick={() => navigate('/')}
//             className="bg-blue-500 text-white px-6 py-2 rounded
//                      hover:bg-blue-600 transition-colors"
//           >
//             Play Again
//           </button>
//         </div>
//       </div>

//       {loading ? (
//        // <LoadingSpinner />
//       ) : error ? (
//         <ErrorMessage 
//           message={error}
//           onRetry={fetchTopScores}
//         />
//       ) : (
//         topScores.length > 0 && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4">Top Scores</h3>
//             <div className="space-y-2">
//               {topScores.map((topScore, index) => (
//                 <div 
//                   key={topScore.id}
//                   className="flex justify-between items-center p-2 bg-gray-50 rounded"
//                 >
//                   <span className="font-bold">#{index + 1}</span>
//                   <span>{topScore.userDisplayName}</span>
//                   <span>{topScore.score}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// export default Results;