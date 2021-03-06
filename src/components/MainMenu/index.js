import React, { Component } from 'react';
import styles from'./styles.css';
import { Sidebar, Segment, Button, Menu, Icon, Accordion, Label, Checkbox } from 'semantic-ui-react'

var xDown = null;
var yDown = null;

class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      visible: false,
      inputActivated: false,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  componentDidMount() {
    window.addEventListener('touchstart', this.handleTouchStart.bind(this, false));
    window.addEventListener('touchmove', this.handleTouchMove.bind(this, false));
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
  }

  render() {
    const { visible, inputActivated } = this.state;

    let { ingredients, recipesList, recipes } = this.props;

    let merged = [].concat.apply([], recipes.map(id => {
      return recipesList[id].ingredients;
    }));

    let uniqueArray = merged.filter(function(item, pos) {
      return merged.indexOf(item) === pos;
    });

    let multipleIngredients = ingredients.map((ing, i) => {
      return  <Checkbox
        label={ing}
        key={i}
        className="multipleIngredient"
        onChange={(ev, val) => {
          this.handleOnIngredientsChange(ing, true, val)
        }}
      />
    });

    let singleIngredient = ingredients.map((ing, i) => {
      return (
        <Label
          className="singleIngredient"
          key={i}
          children={
            <span
              onClick={e => this.handleOnIngredientsChange(ing, false, e)} >
                {ing}
            </span>
          }
        />
      );
    });

    let accordionPanels = [
      {
        title: 'Filter by single ingredient',
        content: singleIngredient,
      },
      {
        title: 'Filter by multiple ingredients',
        content: multipleIngredients,
        onClick: e => {
          let { selected } = this.state;
          this.handleOnIngredientsChange(selected, true, e);
        }
      }
    ];

    return (
        <div className={styles.MainMenu}>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='push'
              direction='left'
              width={ 'wide' }
              visible={visible}
              inverted
              vertical>
                <Menu.Item>
                  {
                    !inputActivated ? null :
                      <div className="sortedIngredientsList">
                        <h4>Sorted ingredient list:</h4>
                        { uniqueArray.sort().join(', ') }
                      </div>
                  }
                </Menu.Item>
                <Menu.Item>
                  <Accordion inverted panels={ accordionPanels } />
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <Button
                size={'mini'}
                compact
                color='black'
                className='toggleButton'
                onClick={this.toggleVisibility}
                icon={<Icon name={ 'chevron ' + (visible ? 'left' : 'right') } />}
              >
              </Button>
              { this.props.children }
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
    );
  }

  handleOnIngredientsChange(ingredient, multiple = false, event) {
    if (multiple) {
      let selected = this.state.selected;
      if (event) {
        if (!selected.includes(ingredient)) selected.push(ingredient);
      } else {
        let index = selected.indexOf(ingredient);
        if (index > -1) selected.splice(index, 1);
      }
      let ingredients = this.state.selected;
      let recipesByIngredients = [];
      this.props.recipesList.forEach(r => {
        let i = r['ingredients'];
        ingredients.forEach(o => {
          if(i.includes(o)) recipesByIngredients.push(r['id'])
        })
      });
      this.setState({selected, inputActivated: true});
      this.props.actions.setRecipes(recipesByIngredients);
    } else {
      let recipesByIngredient = [];
      this.props.recipesList.forEach(r => {
        let i = r['ingredients'];
        if (i.lastIndexOf(ingredient) !== -1)
          recipesByIngredient.push(r['id'])
      });
      this.setState({inputActivated: true});
      this.props.actions.setRecipes(recipesByIngredient);
    }
  }

  handleTouchStart(val, evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  handleTouchMove(val, evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        /* left swipe */
        this.toggleVisibility()
      } else {
        /* right swipe */
        this.toggleVisibility()
      }
    } else {
      if ( yDiff > 0 ) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  handleKeys(val, evt) {
    if(evt.keyCode === 27) this.setState({visible: false});
  }
}

export default MainMenu;