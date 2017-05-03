import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import Lesson   from '../Lesson';

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
            lesson2 = _.find(lessons, { indexItem: 2 }) || { indexItem: 2, indexDay: this.props.indexDay, empty: true };

        //console.log(lessons, lesson0, lesson1, lesson2);

        return (
            <div className="day-col">
                <Lesson onMove={this.props.onMove} day={this.props.day} key={0} {...lesson0}
                        indexTimeItem={this.props.indexTimeItem} />
                <Lesson onMove={this.props.onMove} day={this.props.day} key={1} {...lesson1}
                        indexTimeItem={this.props.indexTimeItem} />
                <Lesson onMove={this.props.onMove} day={this.props.day} key={2} {...lesson2}
                        indexTimeItem={this.props.indexTimeItem} />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DayCollContainer);
