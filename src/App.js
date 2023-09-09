import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navcomp from './components/Navcomp';
import NoteItemcomp from './components/NoteItemcomp';
import NoteState from './context/notes/NoteState';
import Authcomp from './components/Authcomp';
import { ToastContainer } from 'react-toastify';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (newValue) => {
    setSearchQuery(newValue);
  };

  return (
    <div className="App">
      <>
        <NoteState>
          <BrowserRouter>
            <Navcomp searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <ToastContainer position="top-right" style={{ marginTop: "60px" }} />
            <Routes>
              <Route
                exact
                path="/"
                element={<NoteItemcomp searchQuery={searchQuery} />}
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
