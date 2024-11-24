// src/__tests__/Results.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Results from '../pages/Results';
import { auth, saveScore, getTopScores } from '../firebase';

// Mock Firebase functions
jest.mock('../firebase', () => ({
  auth: {
    currentUser: null
  },
  saveScore: jest.fn(),
  getTopScores: jest.fn().mockResolvedValue([
    { id: 1, userDisplayName: 'User1', score: 80, timestamp: new Date().getTime() },
    { id: 2, userDisplayName: 'User2', score: 70, timestamp: new Date().getTime() }
  ])
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      score: 8,
      total: 10,
      category: '9',
      difficulty: 'easy'
    }
  })
}));

describe('Results Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays score correctly', () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );

    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('You got 8 out of 10 questions correct')).toBeInTheDocument();
  });

  test('displays top scores', async () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User1')).toBeInTheDocument();
      expect(screen.getByText('User2')).toBeInTheDocument();
    });
  });

  test('redirects to login when saving score without auth', () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );

    const saveButton = screen.getByText('Save Score');
    fireEvent.click(saveButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login', expect.any(Object));
  });

  test('handles play again button click', () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );

    const playAgainButton = screen.getByText('Play Again');
    fireEvent.click(playAgainButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});