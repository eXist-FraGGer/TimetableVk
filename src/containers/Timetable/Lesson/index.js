import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import flow                 from 'lodash/flow';
import { ItemTypes }        from '../../../constants';
import { DragSource, DropTarget } from 'react-dnd';

import { TextCell, DayCell, LessonCell, Dropdown } from '../../../components';
import stylesLessonCells from '../../../style/LessonCells';

const lessonSource = {
    beginDrag(props) {
        return {
            day: props.day,
            indexDay: props.indexDay,
            indexItem: props.indexItem,
            indexTimeItem: props.indexTimeItem,
            indexWeek: props.indexWeek,
            groupId: props.groupId,
            lessonId: props.lessonId,
            teacherId: props.teacherId,
            classNumber: props.classNumber
        };
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return null;
        }

        // const item = monitor.getItem();
        // const dropResult = monitor.getDropResult();
    }
};

const lessonTarget = {
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();

        if ( (sourceProps.indexItem !== targetProps.indexItem) || (targetProps.indexDay !== sourceProps.indexDay)
            || (targetProps.indexTimeItem !== sourceProps.indexTimeItem)
            || (targetProps.indexWeek !== sourceProps.indexWeek) ) {
            targetProps.onMove(sourceProps, targetProps);
        }
    }
};

const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

const collectTarget = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver()
    }
};

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    onMove = (sourceProps, targetProps) => {
        this.props.onMove(sourceProps, targetProps);
    };

    clickSelectItem = (index) => {
        this.props.changeGroup({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem,
            indexWeek: this.props.indexWeek
        }, index);
    };

    canDrop = () => {
        return false;
    };

    render() {
        const { connectDragSource, isOver, canDrop, connectDropTarget, collision,
            isDragging, groupId, lessonId, day, teacherId, classNumber, empty } = this.props;

        if (empty) {
            return connectDropTarget(
                <div className="day-col-item">
                    <div className="group-cell"><TextCell value={' - '} /></div>
                    <DayCell title={' - '} date={' - '} />
                    <div className='Cell'>
                        {isOver && canDrop && this.canDrop.call(this) && <div style={{backgroundColor: 'green', width:10, height: 10}} />}
                        {!isOver && canDrop && <div style={{backgroundColor: 'yellow', width:10, height: 10}} />}
                        {isOver && canDrop && !this.canDrop.call(this) && <div style={{backgroundColor: 'red', width:10, height: 10}} />}
                    </div>
                </div>
            );
        }

        return connectDragSource(connectDropTarget(
            <div className="day-col-item"
                 style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }}>
                <Dropdown className='group-cell' data={this.props.groups} currentIndex={groupId}
                          style={collision.group ? stylesLessonCells.collision : {}}
                          title={<TextCell value={this.props.groups[groupId]} />}
                          styleSelectContainer={stylesLessonCells.selectContainer}
                          styleSelectItem={stylesLessonCells.selectItem}
                          styleHoverItem={stylesLessonCells.hoverItem}
                          clickSelectItem={this.clickSelectItem} />

                <LessonCell lessonId={lessonId} day={day} teacherId={teacherId} classNumber={classNumber}
                            collision={collision}
                            indexDay={this.props.indexDay}
                            indexItem={this.props.indexItem}
                            indexWeek={this.props.indexWeek}
                            indexTimeItem={this.props.indexTimeItem} />
                <div className='Cell'>
                    {isOver && canDrop && this.canDrop.call(this) && <div style={{backgroundColor: 'green', width:10, height: 10}} />}
                    {!isOver && canDrop && <div style={{backgroundColor: 'yellow', width:10, height: 10}} />}
                    {isOver && canDrop && !this.canDrop.call(this) && <div style={{backgroundColor: 'red', width:10, height: 10}} />}
                </div>
            </div>
        ));
    }
}

Lesson.propTypes = {
    groupId: PropTypes.number,
    lessonId: PropTypes.number,
    teacherId: PropTypes.number,
    classNumber: PropTypes.number,
    day: PropTypes.object,

    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

Lesson = flow(
    DragSource(ItemTypes.LESSON, lessonSource, collectSource),
    DropTarget(ItemTypes.LESSON, lessonTarget, collectTarget)
)(Lesson);

export default Lesson;
