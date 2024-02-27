import React, { useState } from "react";
import {Link} from 'react-router-dom';
import "./home.css"; // You can create a CSS file for styling
// import ImageUpload from "./ImageUpload.js";

const Home = () => {
  // State to track whether to display the image upload section
  const [showImageUpload, setShowImageUpload] = useState(false);

  return (
    <div className="main-container">
      <div className="background-image">
        <nav className="navbar">
          <div className="navbar-left">
            <img
              src="icon.png"
              alt="Icon"
              className="navbar-icon"
            />
            <span className="navbar-title">IngredientCrafter</span>
          </div>
          <div className="navbar-right">
            <button className="logout-button">Logout</button>
          </div>
        </nav>
        <div className="button-container">
          <a href="/home/ingredient-to-recipe" className="menu-button">Ingredient To Recipe</a>
          <a href="/home/image-to-recipe" className="menu-button">Image To Recipe</a>
        </div>
      </div>
      {/* Conditionally render the ImageUpload component */}
      {/* {showImageUpload && <ImageUpload />} */}
    </div>
  );
};

export default Home;

