import React, { Component } from 'react';
import styles from'./styles.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }
    render () {
        let { ingredients, actions } = this.props;
        let temp = [];
        return (
            <div className={styles.Header}>
              {
                  ingredients.map((ing, i) => {
                      return (
                          <span
                              key={i}
                              onClick={()=>{actions.filterByIngredient(ing)}}
                          >
                                  {ing}
                          </span>
                      )
                  })
              }
              {
                ingredients.map((ing, i) => {
                  return (
                    <span>
                      <input
                          key={i}
                          id={ing}
                          type="checkbox"
                          htmlFor={ing}
                          onChange={(e)=>{
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
                })
              }

            </div>
        );
    }
}

export default Header;