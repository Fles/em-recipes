import Immutable from 'immutable';
import * as types from './actionTypes';
import data from '../recipes.json';
const initialState = Immutable.fromJS({
  recipes: data.map((r, i) => ({...r, id: i, checked: false}))
});

export default function recipes(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_RECIPE:
      return state.setIn(['recipes', action.payload.id, 'name'], 'kujac');
    default:
      return state;
  }
}