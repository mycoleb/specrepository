// // src/__tests__/firebase-auth.test.js
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import '@testing-library/jest-dom';
// import { signInWithGithub, auth, saveScore, getTopScores } from '../firebase';
// import Login from '../pages/Login';

// // Mock Firebase Auth
// jest.mock('firebase/auth', () => ({
//   getAuth: jest.fn(),
//   signInWithPopup: jest.fn(),
//   GithubAuthProvider: jest.fn(() => ({
//     addScope: jest.fn()
//   }))
// }));

// // Mock Firebase functions
// jest.mock('../firebase', () => ({
//   auth: {
//     currentUser: null,
//     onAuthStateChanged: jest.fn()
//   },
//   signInWithGithub: jest.fn(),
//   saveScore: jest.fn(),
//   getTopScores: jest.fn()
// }));

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
//   useLocation: () => ({
//     state: { returnTo: '/' }
//   })
// }));

// describe('Firebase Authentication', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('Login Component', () => {
//     test('renders login button', () => {
//       render(
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       );
//       expect(screen.getByText(/Sign in with GitHub/i)).toBeInTheDocument();
//     });

//     test('handles successful login', async () => {
//       signInWithGithub.mockResolvedValueOnce();
      
//       render(
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       );

//       const loginButton = screen.getByText(/Sign in with GitHub/i);
//       fireEvent.click(loginButton);

//       await waitFor(() => {
//         expect(signInWithGithub).toHaveBeenCalled();
//         expect(mockNavigate).toHaveBeenCalledWith('/');
//       });
//     });

//     test('handles login error', async () => {
//       signInWithGithub.mockRejectedValueOnce(new Error('Login failed'));
      
//       render(
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       );

//       const loginButton = screen.getByText(/Sign in with GitHub/i);
//       fireEvent.click(loginButton);

//       await waitFor(() => {
//         expect(screen.getByText(/Failed to log in/i)).toBeInTheDocument();
//       });
//     });
//   });
// });