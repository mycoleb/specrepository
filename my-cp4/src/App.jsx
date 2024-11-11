// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Results from './pages/Results';
import Login from './pages/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <ErrorBoundary>
            <Navbar user={user} />
          </ErrorBoundary>
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/quiz" 
                element={
                  <ErrorBoundary>
                    <Quiz />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ErrorBoundary>
                    <Profile />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ErrorBoundary>
                    <Results />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <ErrorBoundary>
                    <Login />
                  </ErrorBoundary>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;