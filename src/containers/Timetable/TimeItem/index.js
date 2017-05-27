import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';

import { move } from '../../../actions/lessons';

import { changeTime, deleteTimeItem } from '../../../actions/timetable';

import { TimeCell } from '../../../components';
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

    changeTime = (times) => {
        this.props.changeTime({
            indexTimeItem: this.props.indexTimeItem,
            times: times
        });
    };

    delteTimeItem = () => {
        this.props.deleteTimeItem({ indexTimeItem: this.props.indexTimeItem });
    };

    render() {
        const lessonsGroupByDay = _.groupBy(this.props.lessons, 'indexDay');
        const currentTimes = this.props.times[this.props.indexTimeItem];

        const times = `${currentTimes.start}-${currentTimes.end}`;

        return (
            <div className="time-item">
                <TimeCell value={times} changeTime={this.changeTime} delteTimeItem={this.delteTimeItem} />

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
        move: bindActionCreators(move, dispatch),
        changeTime: bindActionCreators(changeTime, dispatch),
        deleteTimeItem: bindActionCreators(deleteTimeItem, dispatch)
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TimeItem)
