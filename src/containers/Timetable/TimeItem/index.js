import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';

import { move } from '../../../actions/lessons';

import { TextCell } from '../../../components';
import DayCollContainer   from '../DayCollContainer';

import '../../../style/TimeItem.css';


export class TimeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onMove = (sourceProps, targetProps) => {
        return this.props.move(sourceProps, targetProps);
    };

    render() {
        const lessonsGroupByDay = _.groupBy(this.props.lessons, 'indexDay');
        const currentTimes = this.props.times[this.props.indexTimeItem];

        const times = `${currentTimes.start}-${currentTimes.end}`;

        return (
            <div className="time-item">
                <div className="time-cell"><TextCell value={times} /></div>

                {_.map(new Array(5), (v, index) => {
                    return (
                        <DayCollContainer
                            day={moment(this.props.firstDate).add(index, 'days')} indexDay={index}
                            lessons={lessonsGroupByDay[`${index}`] || []} key={index} onMove={this.onMove}
                            indexTimeItem={this.props.indexTimeItem}
                            indexWeek={this.props.indexWeek}
                            holidays={this.props.holidays} />
                    );
                })}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        holidays: state.timetable.holidays,
        groups: state.timetable.groups,
        times: state.timetable.times
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        move: bindActionCreators(move, dispatch)
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TimeItem)
