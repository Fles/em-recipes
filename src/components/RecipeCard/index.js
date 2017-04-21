import React, { Component }  from 'react';
import { Card, Icon, Rating } from 'semantic-ui-react';
import classnames from 'classnames';
import styles from'./styles.css';

const colors = [
  {min: 0, max: 30, name: "green"},
  {min: 30, max: 60, name: "blue"},
  {min: 60, max: 90, name: "yellow"},
  {min: 90, max: 120, name: "red"},
]

class RecipeCard extends Component {
  render() {
    let { data, classname } = this.props;
    let { cook_time } = data;

    let color = colors.find(c => cook_time >= c.min && cook_time <= c.max);

    return (
      <Card
        className={classnames(classname, styles.RecipeCard)}
        image='http://lorempixel.com/600/600/food/'
        header={
          <div>
            <Rating icon='heart' />
            <h3>{ data.name }</h3>
          </div>
        }
        meta={ data.type }
        description={
          <span className="ingredients">
            { data.ingredients.join(', ') }
          </span>
        }
        extra={
          <span>
            <Icon name='hourglass start' />
            <strong>{ cook_time }</strong> min
          </span>
        }
        color={color.name}
      />
    )
  }
}

export default RecipeCard;