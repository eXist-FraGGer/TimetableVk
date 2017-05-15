import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import _ from 'lodash';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            hover: false,
            hoverIndex: -1
        }
    };

    onMouseEnterHandler = index => {
        this.setState({ hover: true, hoverIndex: index });
    };

    onMouseLeaveHandler = () => {
        this.setState({ hover: false, hoverIndex: -1 });
    };

    handleClickOutside() {
        this.setState({ isOpened: false });
    };

    handleClick = () => {
        this.setState({ isOpened: !this.state.isOpened });
    };

    handleItemClick = index => {
        this.setState({ isOpened: false });
        return this.props.clickSelectItem(index);
    };

    render() {
        const { styleHoverItem, styleSelectContainer, styleSelectItem,
            title, style, className, data, currentIndex } = this.props;

        return (
            <div style={style} className={className} onClick={this.handleClick} >
                {title}
                {this.state.isOpened &&
                <ul style={styleSelectContainer}>
                    {_.compact(_.map(data, (value, index) => {
                        return index !== currentIndex
                            ? ( <div style={(this.state.hover && index === this.state.hoverIndex)
                                            ? styleHoverItem : {} } key={index}
                                     onMouseEnter={this.onMouseEnterHandler.bind(this, index)}
                                     onMouseLeave={this.onMouseLeaveHandler} >

                                    <li style={styleSelectItem}
                                        onClick={this.handleItemClick.bind(this, index)} >
                                        {value}
                                    </li>
                            </div> )
                            : undefined;
                    }))}
                </ul>}
            </div>
        )
    }
}

export default enhanceWithClickOutside(Dropdown);
