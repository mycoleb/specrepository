// src/__tests__/Quiz.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Quiz from '../pages/Quiz';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: { category: '9', difficulty: 'easy' }
  })
}));

const mockQuizData = {
  response_code: 0,
  results: [
    {
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: ['London', 'Berlin', 'Madrid']
    }
  ]
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockQuizData)
  })
);

describe('Quiz Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays question after loading', async () => {
    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    });
  });

  test('handles answer selection', async () => {
    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    const correctAnswer = screen.getByText('Paris');
    fireEvent.click(correctAnswer);

    // Wait for answer processing
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/results', expect.any(Object));
    });
  });

  test('handles API error', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});