import Immutable from 'immutable';
import * as types from './actionTypes';
import data from '../recipes.json';
const initialState = Immutable.fromJS({
  recipes: data.map((r, i) => ({...r, id: i, checked: false}))
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