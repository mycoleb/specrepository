// // src/__tests__/Home.test.jsx
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import '@testing-library/jest-dom';
// import Home from '../pages/Home';

// // Mock the navigation function
// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate
// }));

// // Mock fetch for categories
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({
//       trivia_categories: [
//         { id: 9, name: 'General Knowledge' },
//         { id: 10, name: 'Books' }
//       ]
//     })
//   })
// );

// describe('Home Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders main title', () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );
//     expect(screen.getByText('Trivia Challenge')).toBeInTheDocument();
//   });

//   test('loads and displays categories', async () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('General Knowledge')).toBeInTheDocument();
//       expect(screen.getByText('Books')).toBeInTheDocument();
//     });
//   });

//   test('handles category selection', async () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );

//     const select = await screen.findByLabelText('Select Category:');
//     fireEvent.change(select, { target: { value: '9' } });
//     expect(select.value).toBe('9');
//   });

//   test('handles difficulty selection', () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );

//     const select = screen.getByLabelText('Select Difficulty:');
//     fireEvent.change(select, { target: { value: 'easy' } });
//     expect(select.value).toBe('easy');
//   });

//   test('navigates to quiz on start', async () => {
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     );

//     const startButton = screen.getByText('Start Quiz');
//     fireEvent.click(startButton);

//     expect(mockNavigate).toHaveBeenCalledWith('/quiz', {
//       state: {
//         category: '',
//         difficulty: ''
//       }
//     });
//   });
// });