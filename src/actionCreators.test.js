import * as types from './actionTypes';
import * as actions from './actionCreators';

describe('actions', () => {
  it('should create an action to set recipes', () => {
    const recipes = [1,2,3,5];
    const expectedAction = {
      type: types.SET_RECIPES,
      payload: recipes
    }
    expect(actions.setRecipes(recipes)).toEqual(expectedAction)
  })
});