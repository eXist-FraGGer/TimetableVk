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
            lesson0 = _.find(lessons, { indexItem: 0 }) || { indexItem: 0, indexDay: this.props.indexDay, empty: true },
            lesson1 = _.find(lessons, { indexItem: 1 }) || { indexItem: 1, indexDay: this.props.indexDay, empty: true },
            lesson2 = _.find(lessons, { indexItem: 2 }) || { indexItem: 2, indexDay: this.props.indexDay, empty: true },
            lesson3 = _.find(lessons, { indexItem: 3 }) || { indexItem: 3, indexDay: this.props.indexDay, empty: true };

        //console.log(lessons, lesson0, lesson1, lesson2);

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
                <Lesson onMove={this.props.onMove} day={this.props.day} key={0} {...lesson0}
                        indexTimeItem={this.props.indexTimeItem} groups={this.props.groups}
                        changeGroup={this.props.changeGroup} />
                <Lesson onMove={this.props.onMove} day={this.props.day} key={1} {...lesson1}
                        indexTimeItem={this.props.indexTimeItem} groups={this.props.groups}
                        changeGroup={this.props.changeGroup} />
                <Lesson onMove={this.props.onMove} day={this.props.day} key={2} {...lesson2}
                        indexTimeItem={this.props.indexTimeItem} groups={this.props.groups}
                        changeGroup={this.props.changeGroup} />
                <Lesson onMove={this.props.onMove} day={this.props.day} key={3} {...lesson3}
                        indexTimeItem={this.props.indexTimeItem} groups={this.props.groups}
                        changeGroup={this.props.changeGroup} />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DayCollContainer);
