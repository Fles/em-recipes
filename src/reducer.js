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
      let ap = action.payload;
      return state.setIn(['recipesList', ap.id, 'checked'], !ap.checked);

    case types.FILTER_BY_INGREDIENT:
      let { ingredient } = action;
      let recipesByIngredient = [];
      let rl = state.get('recipesList');
      rl.forEach(r => {
        let i = r.get('ingredients');
        if (i.lastIndexOf(ingredient) !== -1)
          recipesByIngredient.push(r.get('id'))
      });
      return state.set('recipes', recipesByIngredient);

    default:
      return state;
  }
}