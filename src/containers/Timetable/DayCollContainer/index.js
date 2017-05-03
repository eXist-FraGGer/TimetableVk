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

    generateLessons = () => {
        const lessons = _.map(this.props.lessons, (lesson, index) => {
            return (<Lesson
                onMove={this.props.onMove}
                day={this.props.day}
                index={index} key={index} {...lesson} />);
        });
        const diff = this.props.maxLength - lessons.length;

        console.log(this.props);

        if (diff) {
            for(let i = 0; i < diff; i++) {
                lessons.push(
                    (<Lesson
                        onMove={this.props.onMove}
                        day={this.props.day}
                        index={lessons.length + i}
                        key={lessons.length + i}
                        empty
                    />)
                );
            }
        }

        return lessons;
    };

    render() {
        return (
            <div className="day-col">
                {this.generateLessons()}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DayCollContainer);
