import React, { Component } from 'react';
import { connect } from 'react-redux';

class DayCell extends Component {
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
            <div className="day-cell">
                <div className="title">
                    {this.props.title}
                </div>
                <div className="date">
                    {this.props.date}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(DayCell)