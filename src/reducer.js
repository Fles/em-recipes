import Immutable from 'immutable';
import * as types from './actionTypes';
import data from '../recipes.json';

let ingredients = [];
let recipes = [];

data.forEach((recipe, id) => {
  recipes.push({...recipe, id, checked: false});
  recipe.ingredients.forEach(i => {
      !ingredients.includes(i) && ingredients.push(i);
  });
});

const initialState = Immutable.fromJS({
  recipes, ingredients
});

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.CHECK_RECIPE:
      let ap = action.payload;
      return state.setIn(['recipes', ap.id, 'checked'], !ap.checked);

    default:
      return state;
  }
}