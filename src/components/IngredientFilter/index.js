import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from'./styles.css';

class IngredientFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: props.suggestions
        };
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    render() {
        console.log("styles", styles);
        const { tags, suggestions } = this.state;
        return (
            <div className={styles.IngredientFilter}>
                <ReactTags tags={tags}
                           suggestions={suggestions}
                           handleDelete={this.handleDelete.bind(this)}
                           handleAddition={this.handleAddition.bind(this)}
                           handleDrag={this.handleDrag.bind(this)} />
            </div>
        );
    }
}

export default IngredientFilter;