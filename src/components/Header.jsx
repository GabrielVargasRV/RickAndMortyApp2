import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext.js";


const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {theme,setTheme} = useContext(ThemeContext);
  const handleClick = () => {
    setDarkMode(!darkMode);
    setTheme(!theme)
  };

  const HeaderClasses = theme ? "dark darkHeader" : "white whiteHeader"
  return (
    <div className={HeaderClasses} >
      <Link to="/" className="link " >
        <h1 >Rick And Morty</h1>
      </Link>
      <button onClick={handleClick} type="button" className={ theme ? "bDark" : "bWhite"} >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Header;
