import React, { Component } from 'react';
import styles from'./styles.css';

class Header extends Component {
    render () {
        let { ingredients, actions } = this.props;
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
            </div>
        );
    }
}

export default Header;