import React, { Component } from 'react';
import styles from'./styles.css';
import { Sidebar, Segment, Button, Menu, Image, Icon, Accordion } from 'semantic-ui-react'

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
    let { ingredients, actions, recipesList, recipes } = this.props;

    let alpha = recipes.map(id => {
      return recipesList[id].ingredients;
    });

    let merged = [].concat.apply([], alpha);

    let uniqueArray = merged.filter(function(item, pos) {
      return merged.indexOf(item) == pos;
    });

    let chkboxes = ingredients.map((ing, i) => {
      return (
        <span>
          <input
            key={i}
            id={ing}
            type="checkbox"
            htmlFor={ing}
            onChange={(e)=>{
              this.setState({inputActivated: true});
              let selected = this.state.selected;
              if (e.target.checked) {
                if (!selected.includes(ing)) selected.push(ing);
              } else {
                let index = selected.indexOf(ing);
                if (index > -1) selected.splice(index, 1);
              }
              this.setState({selected});
            actions.filterByIngredients(this.state.selected)}}
          />
          <label htmlFor={ing}>{ing}</label>
        </span>
      )
        });
    let byIngreed = ingredients.map((ing, i) => {
      return (
          <span
              key={i}
              onClick={
                ()=>{
                  this.setState({inputActivated: true});
                  actions.filterByIngredient(ing)}
                  }>
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
                          content: byIngreed ,
                        },
                        {
                          title: 'Filter by multiple ingredients',
                          content: chkboxes,
                        }
                      ]}/>
                </Menu.Item>
              </Sidebar>
            </Sidebar.Pushable>
          </div>
        </div>

    );
  }
}

export default MainMenu;