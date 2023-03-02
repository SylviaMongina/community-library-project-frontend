import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = ({ isDarkMode, onToggleDarkMode }) => {
    const buttonTextContent = isDarkMode ? "Light Mode" : "Dark Mode";
  
    return (
        <header className="navigation">
          <h1 className="branding">
            <Link to="/">
              <span className="logo">{""}</span>
              Upendo Community Library
            </Link>
          </h1>
          <nav>
          <NavLink className="button" exact to="/">
              Home
            </NavLink>
            <NavLink className="button" exact to="/books">
              Available Books
            </NavLink>
            <NavLink className="button" to="/books/new">
              Add A Book
            </NavLink>
            <NavLink className="button" to="/about">
              About Us
            </NavLink>
            <button onClick={onToggleDarkMode}>{buttonTextContent}</button>
          </nav>
        </header>
      );
    };
    
    export default Header;