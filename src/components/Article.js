import React, { Component } from 'react';

class Article extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div style={this.props.style} >
                <input type="text" onChange={this.props.changeArticle} defaultValue={this.props.value}
                       style={{
                           width: '100%',
                           borderRadius: 5,
                           paddingLeft: 5,
                           borderWidth: 0
                       }} />
            </div>
        );
    }
}

export default Article;
