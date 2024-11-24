// // src/firebase.js
// import { initializeApp } from 'firebase/app';
// import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyA6B8oX3hMVr_zr8ZEwf9l7cgtuY4NrwKI",
//   authDomain: "quizapp-5a49e.firebaseapp.com",
//   projectId: "quizapp-5a49e",
//   storageBucket: "quizapp-5a49e.appspot.com",
//   messagingSenderId: "971676846123",
//   appId: "1:971676846123:web:e8c69dee55a1def166366f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // GitHub auth function
// const signInWithGithub = async () => {
//   const provider = new GithubAuthProvider();
//   return signInWithPopup(auth, provider);
// };

// // Save score function
// const saveScore = async (score, total, category, difficulty) => {
//   if (!auth.currentUser) {
//     throw new Error('User must be logged in to save score');
//   }

//   const scoreData = {
//     score: Math.round((score / total) * 100),
//     totalQuestions: total,
//     category,
//     difficulty,
//     userId: auth.currentUser.uid,
//     userDisplayName: auth.currentUser.displayName,
//     timestamp: Date.now()
//   };

//   try {
//     const docRef = await addDoc(collection(db, 'scores'), scoreData);
//     return docRef.id;
//   } catch (error) {
//     console.error('Error saving score:', error);
//     throw error;
//   }
// };

// // Get top scores function
// const getTopScores = async (limitCount = 10) => {
//   try {
//     const scoresRef = collection(db, 'scores');
//     const q = query(scoresRef, orderBy('score', 'desc'), limit(limitCount));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   } catch (error) {
//     console.error('Error getting top scores:', error);
//     throw error;
//   }
// };

// // Get user's scores
// const getUserScores = async (userId) => {
//   try {
//     const scoresRef = collection(db, 'scores');
//     const q = query(
//       scoresRef, 
//       where('userId', '==', userId),
//       orderBy('timestamp', 'desc'),
//       limit(10)
//     );
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   } catch (error) {
//     console.error('Error getting user scores:', error);
//     throw error;
//   }
// };

// export {
//   auth,
//   signInWithGithub,
//   signOut,
//   saveScore,
//   getTopScores,
//   getUserScores
// };