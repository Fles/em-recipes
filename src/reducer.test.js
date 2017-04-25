import Immutable from 'immutable';
import reducer from './reducer';

import data from '../recipes.json';

let ingredients = [];
let recipesList = [];
let recipes = [];

data.forEach((recipe, id) => {
  recipes.push(id);
  recipesList.push({...recipe, id, checked: false});
  recipe.ingredients.forEach(i => {
    !ingredients.includes(i) && ingredients.push(i);
  });
});

const initialState = Immutable.fromJS({
  recipesList, ingredients, recipes
});

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      initialState
    )
  })
})