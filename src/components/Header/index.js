import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import IngredientFilter from '../IngredientFilter';

class Header extends Component {
    render () {
        let { ingredients } = this.props;
        return (
            <h2 className="ui center aligned icon header">
                <Icon name='birthday' /> Recipes
                <IngredientFilter suggestions={ ingredients } />
            </h2>
        );
    }
}

export default Header;