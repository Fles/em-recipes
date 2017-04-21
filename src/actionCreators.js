import * as types from './actionTypes';

export function checkRecipe(payload) {
  return {
    type: types.CHECK_RECIPE,
    payload
  };
}