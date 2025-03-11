import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BugList from './components/BugList';
import BugForm from './components/BugForm';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchBugs } from './services/bugService';
import './App.scss';

function App() {
  const [bugs, setBugs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bugs on component mount
  useEffect(() => {
    const getBugs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchBugs();
        setBugs(data);
      } catch (err) {
        console.error('Error fetching bugs:', err);
        setError('Failed to fetch bugs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    getBugs();
  }, []);

  const addBug = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  const updateBug = (updatedBug) => {
    setBugs(bugs.map(bug => bug._id === updatedBug._id ? updatedBug : bug));
  };

  const deleteBug = (id) => {
    setBugs(bugs.filter(bug => bug._id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>MERN Bug Tracker</h1>
        </header>
        
        <main className="app-main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={
                <div className="two-column-layout">
                  <div className="column form-column">
                    <BugForm addBug={addBug} />
                  </div>
                  <div className="column bugs-column">
                    
                    {isLoading ? (
                      <p className="loading-text">Loading bugs...</p>
                    ) : error ? (
                      <p className="error-text">{error}</p>
                    ) : (
                      <BugList 
                        bugs={bugs} 
                        updateBug={updateBug} 
                        deleteBug={deleteBug}
                      />
                    )}
                  </div>
                </div>
              } />
            </Routes>
          </ErrorBoundary>
        </main>

        <footer className="app-footer">
          <p>MERN Bug Tracker &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;