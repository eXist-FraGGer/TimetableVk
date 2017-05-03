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

        return (
            <div className="time-item">
                <div className="time-cell"><TextCell value="8.00-9.20" /></div>

                <DayCollContainer
                    day={moment(this.props.firstDate).add(0, 'days')} indexDay={0}
                    lessons={lessonsGroupByDay['0'] || []} key={0} onMove={this.onMove}
                    indexTimeItem={this.props.indexTimeItem} />
                <DayCollContainer
                    day={moment(this.props.firstDate).add(1, 'days')} indexDay={1}
                    lessons={lessonsGroupByDay['1'] || []} key={1} onMove={this.onMove}
                    indexTimeItem={this.props.indexTimeItem} />
                <DayCollContainer
                    day={moment(this.props.firstDate).add(2, 'days')} indexDay={2}
                    lessons={lessonsGroupByDay['2'] || []} key={2} onMove={this.onMove}
                    indexTimeItem={this.props.indexTimeItem} />
                <DayCollContainer
                    day={moment(this.props.firstDate).add(3, 'days')} indexDay={3}
                    lessons={lessonsGroupByDay['3'] || []} key={3} onMove={this.onMove}
                    indexTimeItem={this.props.indexTimeItem} />
                <DayCollContainer
                    day={moment(this.props.firstDate).add(4, 'days')} indexDay={4}
                    lessons={lessonsGroupByDay['4'] || []} key={4} onMove={this.onMove}
                    indexTimeItem={this.props.indexTimeItem} />

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
        move: bindActionCreators(move, dispatch),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TimeItem)
