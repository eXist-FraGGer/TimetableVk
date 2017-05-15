import React, { Component } from 'react';

import '../style/Cells.css';

class TextCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        return (
            <div
                className="text-cell"
                onClick={this.props.onClick || undefined}
                style={{backgroundColor: this.props.color || 'transparent'}}>

                <span>{ this.props.value }</span>
            </div>
        );
    }
}

export default TextCell;
