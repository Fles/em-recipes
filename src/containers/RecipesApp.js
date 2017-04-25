import React, { Component } from 'react';
import { MainMenu, RecipesList } from '../components';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actionCreators';
import styles from'./styles.css';

function mapStateToProps(state) {
  return {...state.default.toJS()};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

class RecipesApp extends Component {
  render() {
    return (
      <div className={classnames(styles.RecipesApp)}>
          <MainMenu { ...this.props }/>
          <RecipesList { ...this.props } />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesApp);