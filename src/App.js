import React, { Component } from 'react';
import { Header, RecipeCard } from './components';
import classnames from 'classnames';
import './scss/App.css';

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
    if (this.state.recipes === null) return null;

    let RecipeCards = this.state.recipes.map((r, i) =>
      <RecipeCard data={r} key={i} className="ui card"/>
    );

    return (
      <div className={classnames('App', 'container' )}>
        <Header {...this.state} />
        <div className={classnames('ui', 'grid', 'stackable')}>
          <div className={classnames('column')}>
            <div className="ui link four doubling cards">
              { RecipeCards }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
