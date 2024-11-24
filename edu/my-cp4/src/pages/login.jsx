// // src/pages/Login.jsx
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { signInWithGithub, auth } from '../firebase';

// function Login() {
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleGithubLogin = async () => {
//     try {
//       await signInWithGithub();
//       const returnTo = location.state?.returnTo || '/';
//       navigate(returnTo);
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Failed to log in. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         <button
//           onClick={handleGithubLogin}
//           className="w-full bg-gray-800 text-white py-2 px-4 rounded
//                    hover:bg-gray-700 transition-colors flex items-center 
//                    justify-center space-x-2"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
//           </svg>
//           <span>Sign in with GitHub</span>
//         </button>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Sign in to save your scores and track your progress!
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;