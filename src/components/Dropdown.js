import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import _ from 'lodash';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        }
    };

    handleClickOutside() {
        this.setState({ isOpened: false });
    };

    handleClick = () => {
        console.log('handleClick');
        this.setState({ isOpened: !this.state.isOpened });
    };

    handleItemClick = index => {
        this.setState({ isOpened: false });
        this.setState({ isOpened: false });
        return this.props.clickSelectItem(index);
    };

    render() {
        const { title, className, data, styleSelectContainer, styleSelectItem, currentIndex } = this.props;

        return (
            <div className={className}
                onClick={this.handleClick} >
                {title}
                {this.state.isOpened &&
                <ul style={styleSelectContainer}>
                    {_.compact(_.map(data, (value, index) => {
                        return index !== currentIndex
                            ? ( <li style={styleSelectItem} key={index}
                                    onClick={this.handleItemClick.bind(this, index)} >
                                {value}
                            </li> )
                            : undefined;
                    }))}
                </ul>}
            </div>
        )
    }
}

export default enhanceWithClickOutside(Dropdown);
