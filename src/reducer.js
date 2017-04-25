import Immutable from 'immutable';
import * as types from './actionTypes';
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_RECIPE:
      return state.setIn(['recipesList', action.payload.id, 'checked'], !action.payload.checked);

    case types.SET_RECIPES:
      return state.setIn(['recipes'], action.payload);

    default:
      return state;
  }
}