import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const colors = [
  {min: 0, max: 30, name: "green"},
  {min: 30, max: 60, name: "blue"},
  {min: 60, max: 90, name: "yellow"},
  {min: 90, max: 120, name: "red"},
]

const RecipeCard = ({data}) => {
  let { cook_time } = data;

  let color = colors.find(c => cook_time >= c.min && cook_time <= c.max);

  return <Card
    image='http://lorempixel.com/600/600/food/'
    header={ data.name }
    meta={ data.type }
    description={ data.ingredients.join(', ') }
    extra={
      <span>
        <Icon name='hourglass start' />
        <strong>{ cook_time }</strong> min
      </span>
    }
    color={color.name}
  />
}

export default RecipeCard;