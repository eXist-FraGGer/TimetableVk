import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { setDate } from '../actions/timetable';

import '../style/Cells.css';

class DayCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    changeDate = e => {
        this.props.setDate(moment(e.target.value, 'Y-MM'));
    };

    render() {
        return (
            <div className="day-cell">
                <div className="title">
                    {this.props.title}
                </div>
                <div className="date">
                    { this.props.first
                        ? (<input
                            type="month"
                            onChange={this.changeDate}
                            style={{ minWidth: 80, width: '100%', margin: 0, padding: 0 }}
                            defaultValue={moment().format('Y-MM')} />)
                        : this.props.date}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: bindActionCreators(setDate, dispatch),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(DayCell);
