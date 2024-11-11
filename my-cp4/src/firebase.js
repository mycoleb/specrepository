// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your config from Firebase Console
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const githubProvider = new GithubAuthProvider();

// Auth functions
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
export const logOut = () => signOut(auth);

// Score functions
export const saveScore = async (score, total, category, difficulty) => {
    if (!auth.currentUser) throw new Error("Must be logged in to save score");
    if (score < 0 || score > total) throw new Error("Invalid score");
    
    try {
      const scorePercent = Math.round((score / total) * 100);
      await addDoc(collection(db, "scores"), {
        userId: auth.currentUser.uid,
        score: scorePercent,
        category,
        difficulty,
        totalQuestions: total,
        correctAnswers: score,
        timestamp: new Date().toISOString(),
        userDisplayName: auth.currentUser.displayName,
        userPhotoURL: auth.currentUser.photoURL
      });
    } catch (error) {
      console.error("Error saving score:", error);
      throw error;
    }
};

export const getTopScores = async (limit = 10) => {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, orderBy("score", "desc"), limit(limit));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// src/pages/Results.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, saveScore, getTopScores } from '../firebase';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [topScores, setTopScores] = useState([]);
  const { score, total, category, difficulty } = location.state || {};

  useEffect(() => {
    fetchTopScores();
  }, []);

  const fetchTopScores = async () => {
    try {
      const scores = await getTopScores();
      setTopScores(scores);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const handleSaveScore = async () => {
    if (!auth.currentUser) {
      // Prompt to sign in
      navigate('/login', { 
        state: { returnTo: '/results', scoreData: location.state } 
      });
      return;
    }

    try {
      await saveScore(
        auth.currentUser.uid,
        score,
        category,
        difficulty
      );
      await fetchTopScores(); // Refresh scores
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
        
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-blue-500 mb-2">
            {score} / {total}
          </p>
          <p className="text-gray-600">
            {((score / total) * 100).toFixed(1)}% Correct
          </p>
        </div>

        <button
          onClick={handleSaveScore}
          className="w-full bg-green-500 text-white py-2 px-4 rounded mb-4
                   hover:bg-green-600 transition-colors"
        >
          Save Score
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded
                   hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>

        {topScores.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Top Scores</h3>
            <div className="space-y-2">
              {topScores.map((topScore, index) => (
                <div 
                  key={topScore.id}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span className="font-bold">#{index + 1}</span>
                  <span>{topScore.score} points</span>
                  <span className="text-sm text-gray-500">
                    {new Date(topScore.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

  
  export const getUserStats = async (userId) => {
    try {
      const scoresRef = collection(db, "scores");
      const q = query(
        scoresRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const scores = [];
      querySnapshot.forEach((doc) => {
        scores.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return scores;
    } catch (error) {
      console.error("Error getting user stats:", error);
      throw error;
    }
  };

export default Results;