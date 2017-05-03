import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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
        const lessons = this.state.lessons,
            target = lessons.items[targetProps.day][targetProps.index],
            source = lessons.items[sourceProps.day][sourceProps.index];

        lessons.items[targetProps.day][targetProps.index] = source;
        lessons.items[sourceProps.day][sourceProps.index] = target;

        this.setState({ lessons });

        console.log('MOVE', lessons);
    };

    renderLessons = () => {
        return _.map(this.state.lessons.items, (item, index) => {
           return (
               <DayCollContainer
                   maxLength={_.max(this.state.lessons.items, i => i.length ).length}
                   day={index} lessons={item} key={index}
                   onMove={this.onMove}
               />
           );
        });
    };

    render() {
        return (
            <div className="time-item">
                <div className="time-cell"><TextCell value="8.00-9.20" /></div>

                {this.renderLessons()}

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
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TimeItem)
