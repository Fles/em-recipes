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
    let { data, classname, checkRecipe } = this.props;
    let { cook_time } = data;

    let color = colors.find(c => cook_time >= c.min && cook_time <= c.max);
    let cId = 'Card_' + data.id;
    return (
        <div id={cId} className={classnames(styles.RecipeCard, "flip-container")}>
          <div className="flipper">
            <div className="front">
              <Card
                className={classnames(classname)}
                //image='http://lorempixel.com/600/600/food/'
                header={
                  <div>
                    <Rating
                      icon='heart'
                      onRate={() => {checkRecipe(data)}}
                     />
                    <h3>{ data.name }</h3>
                  </div>
                }
                meta={ data.type }
                description={
                  <div>
                    <Icon name='hourglass start' />
                    <strong>{ cook_time }</strong> min
                    <span className="ingredients">
                      { data.ingredients.join(', ') }
                    </span>
                  </div>

                }
                extra={
                  <span>
                    <Icon
                      name='retweet'
                      onClick={()=>{
                        document.querySelector("#" + cId).classList.toggle("flip")
                      }}
                    />
                  </span>
                }
                color={color.name}
              />
            </div>
            <div className="back">
              <Card
                  onClick={()=>{}}
                  className={classnames(classname, styles.RecipeCard)}
                  image=''
                  header={
                    <div>
                      <h3>{ data.name }</h3>
                    </div>
                  }
                  meta={ '' }
                  description={
                    <span className="ingredients">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque aut consequuntur deleniti dolorum enim in ipsam laborum, libero natus omnis perferendis soluta sunt veritatis.
                    </span>
                }
                  extra={
                  <span>
                    <Icon
                      name='retweet'
                      onClick={()=>{
                        document.querySelector("#"+cId).classList.toggle("flip")
                      }}
                    />
                  </span>
                }
                  color={color.name}
              />
            </div>
          </div>
        </div>
    )
  }
}

export default RecipeCard;