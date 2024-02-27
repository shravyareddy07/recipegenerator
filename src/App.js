import React from "react";
import "./App.css";
import home from "./components/home";
import ImageToRecipe from "./components/ImageToRecipe";
import ImageUpload from "./components/ImageUpload"; // Import the new component
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UnderConstruction from './components/IngredientToRecipe';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home/ingredient-to-recipe" component={UnderConstruction} />
          <Route path="/home/image-to-recipe" component={ImageUpload} />
          {/* <Route path="/home/get-recipe" component={GetRecipe} /> */}
          <Route path="/home/image-to-recipe-result" component={ImageToRecipe} />
          <Route path="/" component={home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
