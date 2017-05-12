import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';

import { move, changeGroup } from '../../../actions/lessons';

import { TextCell } from '../../../components';
import DayCollContainer   from '../DayCollContainer';

import '../../../style/TimeItem.css';


export class TimeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: {
                times: {
                    timeStart: "8.00",
                    timeEnd: "9.20"
                },
                items: [[{
                    index: 0,
                    group: "C-1",
                    name: "ТактП"
                }],[],[{
                    index: 0,
                    group: "C-2",
                    name: "ТактП"
                }],[{
                    index: 0,
                    group: "C-3",
                    name: "ТактП"
                },{
                    index: 1,
                    group: "C-4",
                    name: "ТактП"
                }],[{
                    index: 0,
                    group: "C-5",
                    name: "ТактП"
                },{
                    index: 1,
                    group: "C-6",
                    name: "ТактП"
                },{
                    index: 2,
                    group: "C-7",
                    name: "ТактП"
                }]]
            }
        }
    }

    onMove = (sourceProps, targetProps) => {
        return this.props.move(sourceProps, targetProps, this.props.indexTimeItem);
    };

    render() {
        const lessonsGroupByDay = _.groupBy(this.props.lessons.items, 'indexDay');
        const times = `${this.props.lessons.times.start}-${this.props.lessons.times.end}`;

        return (
            <div className="time-item">
                <div className="time-cell"><TextCell value={times} /></div>

                {_.map(new Array(5), (v, index) => {
                    return (
                        <DayCollContainer
                            day={moment(this.props.firstDate).add(index, 'days')} indexDay={index}
                            lessons={lessonsGroupByDay[`${index}`] || []} key={index} onMove={this.onMove}
                            indexTimeItem={this.props.indexTimeItem}
                            holidays={this.props.holidays}
                            groups={this.props.groups}
                            changeGroup={this.props.changeGroup} />
                    );
                })}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        holidays: state.timetable.holidays,
        groups: state.timetable.groups
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        move: bindActionCreators(move, dispatch),
        changeGroup: bindActionCreators(changeGroup, dispatch),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TimeItem)
