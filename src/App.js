import React, { Component } from 'react';
import RecipeCard from './components/RecipeCard';
import './App.css';

import data from '../recipes.json';

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: null,
      ingredients: [],
    }
  }

  componentDidMount() {
    let ingredients = [];
    data.forEach(recipe => {
      recipe.ingredients.forEach(i => {
        !ingredients.includes(i) && ingredients.push(i);
      });
    });
    this.setState({ recipes: data, ingredients });
  }

  render() {
    let { recipes } = this.state;
    if (recipes === null) return null;

    return (
      <div className="App">
        { recipes.map((r, i) => <RecipeCard data={r} key={i} />) }
      </div>
    );
  }
}

export default App;
