import React, { useState } from "react";
import "./ImageUpload.css";
import { useHistory } from "react-router-dom";
import ImageFileUpload from './ImageFileUpload'; // Import the ImageFileUpload component
import VideoPlayer from './VideoPlayer';
// import RecipeDisplay from './RecipeDisplay'; // Import the RecipeDisplay component


const ImageUpload = () => {
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const [prediction, setPrediction] = useState("");
  const [recipe, setRecipe] = useState("");
  const history = useHistory();

  const handleImageUpload = async (file) => {
    console.log("here")
    // if (imageFile) {
      const formData = new FormData();
      formData.append("imageFile", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setPrediction(result.prediction);
          history.push("/image-to-recipe-result"); // Redirect to the result page
        } else {
          console.error("Prediction request failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      // }
    }
  };

  const handleGetRecipe = async (prediction) => {
    try {
      const formattedPrediction = prediction.toUpperCase();

      const formData = new FormData();
      formData.append("prediction", formattedPrediction);

      const response = await fetch("http://127.0.0.1:5000/get-recipe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowVideo(true);
        const result = await response.json();
        setRecipe(result.recipe);
        console.log(result.recipe);
      } else {
        console.error("Recipe request failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="background-image">
      <br></br>
      <div className="cards-container">
      <div className="predict-card">
        <h2>Image Upload</h2>
        <ImageFileUpload onFileUpload={handleImageUpload} /> {/* Use the ImageFileUpload component here */}
        {prediction && (
          <div>
            <h3>Food Prediction</h3>
            <p>{prediction}</p>
          </div>
        )}
        {/* <button onClick={handleGetRecipe(prediction)} className="menu-button">Get Recipe</button> */}
        <button onClick={() => handleGetRecipe(prediction)} className="menu-button">Get Recipe</button>
        <a href="/home" className="menu-button">Go back to Home</a>

      </div>
      {recipe && (
        <div className="recipe-card">
          {/* Display the recipe details */}
          <br></br>
               <div>
                 <h1>YouTube Video</h1>
                 {/* <h1>{recipe.instructions[recipe.instructions.length-1]}</h1>
                 <h1>YouTube Video Player</h1> */}
                 <VideoPlayer videoName={prediction+" recipe"} />
               </div>
           </div>
                 )}
        {recipe && (
          <div className="instruction-card">
            <h3 className="recipe-heading">Ingredients</h3>
              <ul className="recipe-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            <h3 className="recipe-heading">Instructions</h3>
              <ol className="recipe-list">
                {recipe.instructions.map((instruction, index) => (
                  index !== recipe.instructions.length - 1 ? (
                  <li key={index}>{instruction}</li>
                  ) : null
                ))}
              </ol>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;


// https://www.youtube.com/watch?v=IGlWE4AFQ5Q
