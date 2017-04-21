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
    let cId = 'C' + data.id;
    return (
        <div id={cId} className={classnames(styles.RecipeCard, "flip-container")}>
          <div className="flipper">
            <div className="front">
              <Card
                onClick={()=>{checkRecipe(data)}}
                className={classnames(classname)}
                image='http://lorempixel.com/600/600/food/'
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
                  <span className="ingredients">
                    { data.ingredients.join(', ') }
                  </span>
                }
                extra={
                  <span>
                    <Icon name='hourglass start' />
                    <strong>{ cook_time }</strong> min
                    <br/>
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
                  meta={ data.type }
                  description={
                    <span className="ingredients">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Coas mollitia necessitatibus nostrum quasi, ratione voluptas. Ab ad aliquid assumenda corporis cupiditate, eaque eligendi error iure labore omnis placeat porro quibusdam quos reiciendis repellat repudiandae tempora voluptas voluptatem? Ad cupiditate deserunt ducimus eaque fuga harum nihil nulla officia perspiciatis, ratione? A accusantium amet assumenda, commodi corporis culpa cumque enim eveniet illo impedit iste iusto magni natus nobis nostrum nulla odit pariatur perferendis porro praesentium provident, similique, sunt suscipit! Accusamus amet, assumenda at blanditiis corporis culpa deserunt distinctio dolor dolore dolorum eius et, ex explicabo illo inventore ipsa laboriosam minima nam natus provident quam quia reprehenderit sed sequi sint sit voluptates! Aliquid aspernatur autem deserunt expedita impedit, odio perspiciatis quo suscipit. Aperiam aspernatur deserunt, dolorum eos est facere hic libero, nam officia officiis quaerat quibusdam!
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