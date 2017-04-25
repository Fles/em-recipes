import * as types from './actionTypes';

export function checkRecipe(payload) {
  return {
    type: types.CHECK_RECIPE,
    payload
  };
}

export function setRecipes(payload) {
  return {
    type: types.SET_RECIPES,
    payload
  };
}

export function filterByIngredient(ingredient) {
  return {
    type: types.FILTER_BY_INGREDIENT,
    ingredient,
  };
}

export function filterByIngredients(ingredients) {
  return {
    type: types.FILTER_BY_INGREDIENTS,
    ingredients,
  };
}