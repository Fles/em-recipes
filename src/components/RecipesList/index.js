import React, { Component }  from 'react';
import { RecipeCard } from '../../components';
import classnames from 'classnames';
import styles from'./styles.css';

class RecipesList extends Component {
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
      <div className={classnames(styles.RecipesList)}>
        <div className={classnames('ui', 'grid', 'stackable')}>
          <div className={classnames('column')}>
            <div className="ui link four doubling cards">
              { list.length !== 0 ? list : <h2>No selected recipes</h2> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipesList;