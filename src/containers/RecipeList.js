import React, { Component } from 'react';
import { RecipeCard, MainMenu } from '../components';
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

class RecipeList extends Component {
  render() {
    let { recipesList, recipes } = this.props;

    let list = recipes.map(i =>
      <RecipeCard
        data={recipesList[i]}
        key={i}
        className="ui card"
        {...this.props.actions} />
    );

    return (
      <div className={classnames(styles.RecipeList)}>
          <MainMenu { ...this.props }/>
          <div className={classnames('ui', 'grid', 'stackable')}>
            <div className={classnames('column')}>
              <div className="ui link four doubling cards">
                { list.length !== 0 ? list : <h2>No selected recipes</h2> }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);