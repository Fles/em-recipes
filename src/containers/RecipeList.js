import React, { Component } from 'react';
import { RecipeCard } from '../components';
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
    if (this.props.recipes == null) return null;
    return (
      <div className={classnames('RecipeList')}>
          <div className={classnames('ui', 'grid', 'stackable')}>
            <div className={classnames('column')}>
              <div className="ui link four doubling cards">
                {
                  this.props.recipes.map((r, i) =>
                    <RecipeCard
                      data={r}
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