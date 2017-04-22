import React, { Component } from 'react';
import { RecipeCard, Header } from '../components';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actionCreators';

function mapStateToProps(state) {
  return {...state.default.toJS()};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

class RecipeList extends Component {
  render() {
    if (this.props.recipesList == null) return null;
    let { recipesList } = this.props;

    return (
      <div className={classnames('RecipeList')}>
        <Header { ...this.props }/>
          <div className={classnames('ui', 'grid', 'stackable')}>
            <div className={classnames('column')}>
              <div className="ui link four doubling cards">
                {
                  this.props.recipes.map(i =>
                    <RecipeCard
                      data={recipesList[i]}
                      key={i}
                      className="ui card"
                      {...this.props.actions} />
                  )
                }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);