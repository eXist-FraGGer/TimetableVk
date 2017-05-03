import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../style/Cells.css';

class TextCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div
                className="text-cell"
                style={{backgroundColor: this.props.color || 'transparent'}}>

                <span>{ this.props.value }</span>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TextCell);
