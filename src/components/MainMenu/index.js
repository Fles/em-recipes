import React, { Component } from 'react';
import styles from'./styles.css';
import { Sidebar, Segment, Button, Menu, Icon, Accordion } from 'semantic-ui-react'

class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      visible: false,
      inputActivated: false,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state;
    let { ingredients, recipesList, recipes } = this.props;

    let alpha = recipes.map(id => {
      return recipesList[id].ingredients;
    });

    let merged = [].concat.apply([], alpha);

    let uniqueArray = merged.filter(function(item, pos) {
      return merged.indexOf(item) === pos;
    });

    let multipleIngredients = ingredients.map((ing, i) => {
      return (
        <span key={i}>
          <input
            id={ing}
            type="checkbox"
            htmlFor={ing}
            onChange={e => this.handleOnIngredientsChange(ing, true, e)}
          />
          <label htmlFor={ing}>{ing}</label>
        </span>
      )
        });
    let singleIngredient = ingredients.map((ing, i) => {
      return (
          <span
              key={i}
              onClick={e => this.handleOnIngredientsChange(ing, false, e)} >
            {ing}
          </span>
      )
    });

    return (
        <div>
          <Button color='black' className={styles.ToggleButton} onClick={this.toggleVisibility}>
            <Icon name='content' />
          </Button>

          <div className={styles.MainMenu} style={{display: visible ? 'block' : 'none'}}>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                  as={Menu}
                  animation='overlay'
                  direction='right'
                  width='wide'
                  visible={visible}
                  inverted vertical>
                <Menu.Item name='home'>
                  { this.state.inputActivated ? uniqueArray.sort().join(', ') : [] }
                </Menu.Item>
                <Menu.Item name='camera'>
                  <Accordion
                      inverted
                      panels={[
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
                      ]}/>
                </Menu.Item>
              </Sidebar>
            </Sidebar.Pushable>
          </div>
        </div>
    );
  }

  handleOnIngredientsChange(ingredient, multiple = false, event) {
    if (multiple) {
      let selected = this.state.selected;
      if (event.target.checked) {
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
}

export default MainMenu;