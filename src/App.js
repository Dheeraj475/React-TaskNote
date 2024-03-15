import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navcomp from './components/Navcomp';
import NoteItemcomp from './components/NoteItemcomp';
import NoteState from './context/notes/NoteState';
import Authcomp from './components/Authcomp';
import { ToastContainer } from 'react-toastify';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const handleSearchChange = (newValue, newPriority) => {
    setSearchQuery(newValue);
    setSelectedPriority(newPriority);
  };

  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll behavior
    });
  };

  // Function to check if the button should be visible
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) { // Change the value according to your requirement
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <div className="App">
      <>
 {isVisible && (
         <div className="arrow-ui" onClick={scrollToTop}>
            <div className="arrow-up"></div>
        </div>
      )}
    
        <NoteState>
          <BrowserRouter>
            <Navcomp searchQuery={searchQuery} onSearchChange={handleSearchChange} selectedPriority={selectedPriority} />
            <ToastContainer position="top-right" style={{ marginTop: "60px" }} />
            <Routes>
              <Route
                exact
                path="/"
                element={<NoteItemcomp searchQuery={searchQuery} selectedPriority={selectedPriority}  />}
              />
              <Route exact path="/auth" element={<Authcomp />} />
            </Routes>
          </BrowserRouter>
        </NoteState>
      </>
    </div>
  );
}

export default App;
