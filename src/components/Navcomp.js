import React, { useState,useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';


const Navcomp = ({ searchQuery, onSearchChange }) => {
  /*This is being used by practice*/ 
  // let location = useLocation();
  // useEffect(()=>{
  //   console.log(location.pathname)
  // },[location])

  // Conext api from the express api we have created
  const context = useContext(noteContext);
  const {filteredNotes} = (context)
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };


  const handleMouseLeave = () => {
    setHovered(false);
  };

  const colorStyle = {
    color: hovered ? '#bb00ff' : '#D462FF',
    textDecoration : "none",
    cursor:"default"
  }

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  let naviGate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
    naviGate("/auth")
  }

  const [selectedPriority, setSelectedPriority] = useState('All');

  const handlePriorityChange = (e) => {
    const newValue = e.target.value;
    setSelectedPriority(newValue); 
    onSearchChange(searchQuery, newValue);  
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    onSearchChange(newValue, selectedPriority);
  };


  return (
    <>
    {localStorage.getItem("token")&&
    <header className="header">
      <div className="header-top">
        <div className='header-logo'><Link style={colorStyle}   onMouseEnter={handleHover}  onMouseLeave={handleMouseLeave}  to="/">TodoNotes-{filteredNotes.length}</Link></div>
        <div className="header-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuVisible ? 'is-active' : ''}`} id="hamburgerStyles">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <ul id="navigation" style={{ listStyleType: 'none', paddingInlineStart: 0 }} className={`navigation ${isMenuVisible ? 'navigation--visible' : ''}`}>
          
          <li className="nav-item">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="search"  value={searchQuery} onChange={handleSearchChange}  placeholder="Search" />
            </form>
          </li>
          <li className="nav-item">
            {/* Create the dropdown menu for priorities */}
            <select className="select"
              value={selectedPriority}
              onChange={handlePriorityChange}
              style={{ fontSize:"15px",appearance:"none",outline:"0",width:"68px",cursor: 'pointer', background:"#C2DFFF",padding: "6px", border:"none", borderRadius:"10px"}}
            >
              <option value="All">Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </li>
          <li className="nav-item" >
            <b><input onClick={handleLogout} className="logout" type="button" value="Logout" /></b>
          </li>
     
        </ul>
      </nav>

    </header>
         }
    </>
  );
}

export default Navcomp;
