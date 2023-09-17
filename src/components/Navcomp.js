import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Navcomp = ({ searchQuery, onSearchChange }) => {
  /*This is being used by practice*/ 
  // let location = useLocation();
  // useEffect(()=>{
  //   console.log(location.pathname)
  // },[location])
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

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    onSearchChange(newValue); // Call the onSearchChange function with the new value
  };


  return (
    <>
    {localStorage.getItem("token")&&
    <header className="header">
      <div className="header-top">
        <div className='header-logo'><Link style={colorStyle}   onMouseEnter={handleHover}  onMouseLeave={handleMouseLeave}  to="/">TaskNote</Link></div>
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
