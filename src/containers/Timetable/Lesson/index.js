import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import flow                 from 'lodash/flow';
import { ItemTypes }        from '../../../constants';
import { DragSource, DropTarget } from 'react-dnd';

import { TextCell, DayCell } from '../../../components';

const lessonSource = {
    beginDrag(props) {
        return {
            day: props.day,
            indexDay: props.indexDay,
            indexItem: props.indexItem,
            indexTimeItem: props.indexTimeItem
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
        console.log("lessonTarget", targetProps);
        const sourceProps = monitor.getItem();

        if ( (sourceProps.indexItem !== targetProps.indexItem) || (targetProps.indexDay !== sourceProps.indexDay)
            || (targetProps.indexTimeItem !== sourceProps.indexTimeItem)) {
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

    render() {
        const { connectDragSource, isOver, canDrop, connectDropTarget, isDragging, group, name, day } = this.props;
        let empty = false;
        if (!group || !name) empty = true;

        if (empty) {
            return connectDropTarget(
                <div className="day-col-item">
                    <div className="group-cell"><TextCell value={' - '} /></div>
                    <DayCell title={' - '} date={' - '} />
                    <div className='Cell'>
                        {isOver && canDrop && <div style={{backgroundColor: 'green', width:10, height: 10}} />}
                        {!isOver && canDrop && <div style={{backgroundColor: 'yellow', width:10, height: 10}} />}
                        {isOver && !canDrop && <div style={{backgroundColor: 'red', width:10, height: 10}} />}
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
               <div className="group-cell"><TextCell value={ group } /></div>
                <DayCell title={ name } date={ day.format('DD.MM') } />
                <div className='Cell'>
                    {isOver && canDrop && <div style={{backgroundColor: 'green', width:10, height: 10}} />}
                    {!isOver && canDrop && <div style={{backgroundColor: 'yellow', width:10, height: 10}} />}
                    {isOver && !canDrop && <div style={{backgroundColor: 'red', width:10, height: 10}} />}
                </div>
            </div>
        ));
    }
}

Lesson.propTypes = {
    group: PropTypes.string,
    name: PropTypes.string,
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
