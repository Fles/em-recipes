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
                          onClick: () => this.props.actions.setRecipes([])
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
    let {actions: {filterByIngredient, filterByIngredients}} = this.props;
    if (multiple) {
      this.setState({inputActivated: true});
      let selected = this.state.selected;
      if (event.target.checked) {
        if (!selected.includes(ingredient)) selected.push(ingredient);
      } else {
        let index = selected.indexOf(ingredient);
        if (index > -1) selected.splice(index, 1);
      }
      this.setState({selected});
      filterByIngredients(this.state.selected)
    } else {
      this.setState({inputActivated: true});
      filterByIngredient(ingredient)
    }
  }
}

export default MainMenu;