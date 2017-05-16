import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import moment from 'moment';
import _ from 'lodash';

import Lesson   from '../Lesson';
import styles from '../../../style/Lesson';

class DayCollContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        const lessons = _.sortBy(this.props.lessons, 'indexItem'),
            lesson = [];
        lesson[0] = _.find(lessons, { indexItem: 0 }) || { indexItem: 0, indexDay: this.props.indexDay, empty: true };
        lesson[1] = _.find(lessons, { indexItem: 1 }) || { indexItem: 1, indexDay: this.props.indexDay, empty: true };
        lesson[2] = _.find(lessons, { indexItem: 2 }) || { indexItem: 2, indexDay: this.props.indexDay, empty: true };
        lesson[3] = _.find(lessons, { indexItem: 3 }) || { indexItem: 3, indexDay: this.props.indexDay, empty: true };

        // console.log(lessons, lesson);

        if (_.some(this.props.holidays, value =>
                moment(value, 'YYYY-MM-DD').isSame(moment(this.props.day, 'YYYY-MM-DD')) )) {
            return (
                <div className="day-col">
                    <div style={styles.holiday}>
                        Выходной
                    </div>
                </div>
            );
        }

        return (
            <div className="day-col">
                {_.map(lesson, (lesson, index) => {
                    return (
                        <Lesson onMove={this.props.onMove} day={this.props.day} key={index} {...lesson}
                                indexTimeItem={this.props.indexTimeItem} indexWeek={this.props.indexWeek}
                                groups={this.props.groups} changeGroup={this.props.changeGroup} />
                    );
                })}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DayCollContainer);
