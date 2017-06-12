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
        // console.log('DayCell changeDate', moment(e.target.value).format('Y-MM'));

        this.props.setDate(moment(e.target.value));
    };

    componentWillReceiveProps(nextProps) {
        // nextProps.first && console.log(nextProps.date.format());
        //nextProps.load && this.setState({ date: moment(nextProps.date) });
    }

    render() {
        if (this.props.empty) {
            return <div className="day-cell">
                    <div className="title">-</div>
                    <div className="date">-</div>
                </div>
        }

        return (
            <div className="day-cell">
                <div className="title">
                    {this.props.title}
                </div>
                <div className="date">
                    { this.props.first
                        ? (<input
                            type="date"
                            onChange={this.changeDate}
                            style={{ minWidth: 80, width: '100%', margin: 0, padding: 0 }}
                            value={this.props.date.format('YYYY-MM-DD')} />)
                        : this.props.date.format('DD.MM')}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        load: state.timetable.load,
        firstDate: state.timetable.firstDate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: bindActionCreators(setDate, dispatch),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(DayCell);
