import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes            from 'prop-types';
import flow                 from 'lodash/flow';
import { ItemTypes }        from '../../../constants';
import {
    Button,
    Modal,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Col, Row
} from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import _ from 'lodash';

import { TextCell, DayCell, LessonCell, Dropdown } from '../../../components';
import { changeGroup, addLesson, deleteLesson } from '../../../actions/lessons';
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
    },
    // isDragging(targetProps, monitor) {
    //     // const sourceProps = monitor.getItem();
    //    // console.log('isDragging', sourceProps, targetProps);
    // }
};

const lessonTarget = {
    // canDrop(targetProps, monitor) {
    //     const sourceProps = monitor.getItem();
    //     return (sourceProps.indexItem !== targetProps.indexItem) || (targetProps.indexDay !== sourceProps.indexDay)
    //         || (targetProps.indexTimeItem !== sourceProps.indexTimeItem)
    //         || (targetProps.indexWeek !== sourceProps.indexWeek);
    // },
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();

        if ( (sourceProps.indexItem !== targetProps.indexItem) || (targetProps.indexDay !== sourceProps.indexDay)
            || (targetProps.indexTimeItem !== sourceProps.indexTimeItem)
            || (targetProps.indexWeek !== sourceProps.indexWeek) ) {
            targetProps.onMove(sourceProps, targetProps);
        }
    },
    // hover(props, monitor, component) {
    //     const sourceProps = monitor.getItem();
    //     // console.log('hover', sourceProps, props, component);
    // }
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

        const currentGroup = _.find(this.props.defaultGroupPosition, {
            indexDay: this.props.indexDay,
            indexTimeItem: this.props.indexTimeItem,
            indexItem: this.props.indexItem
        });

        this.state = {
            hover: false,
            newGroupId: currentGroup ? currentGroup.indexGroup : 0,
            newLessonId: 0,
            newTeacherId: 0,
            newClassNumber: 0,
            showDeleteLessonModal: false,
            showAddLessonModal: false,

            lessonTypeId: 0,
            subject: '2',
            lesson: '2',
            hour: '2',
        }
    };

    onMove = (sourceProps, targetProps) => {
        this.props.onMove(sourceProps, targetProps);
        this.disHover();
    };

    clickSelectItem = (index) => {
        this.props.changeGroup({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem,
            indexWeek: this.props.indexWeek
        }, index);
        this.disHover();
    };

    disHover = () => {
        this.setState({ hover: false });
    };

    // canDrop = () => {
    //     return true;
    // };

    onMouseEnterHandler = () => {
        this.setState({ hover: true });
    };

    onMouseLeaveHandler = () => {
        this.setState({ hover: false });
    };

    handleShowAddLessonModal = () => {
        this.setState({ showAddLessonModal: !this.state.showAddLessonModal });
    };

    handleShowDeleteLessonModal = () => {
        this.setState({ showDeleteLessonModal: !this.state.showDeleteLessonModal });
    };

    addLesson = () => {
        this.props.addLesson({
            groupId: this.state.newGroupId,
            lessonId: this.state.newLessonId,
            teacherId: this.state.newTeacherId,
            classNumber: this.state.newClassNumber,
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem,
            indexWeek: this.props.indexWeek,
            article: `${this.state.subject}-${this.state.lesson}-${this.state.hour}${this.props.lessonTypes[this.state.lessonTypeId]}`
        });
        this.setState({ showAddLessonModal: false });
    };

    deleteLesson = () => {
        this.props.deleteLesson({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem,
            indexWeek: this.props.indexWeek
        });
        this.setState({ showDeleteLessonModal: false });
    };

    selectNewGroup = e => {
        this.setState({ newGroupId: +e.target.value });
    };

    selectNewLesson = e => {
        this.setState({ newLessonId: +e.target.value });
    };

    selectNewTeacher = e => {
        this.setState({ newTeacherId: +e.target.value });
    };

    selectNewClassNumber = e => {
        this.setState({ newClassNumber: +e.target.value });
    };

    selectLessonType = e => {
        this.setState({ lessonTypeId: +e.target.value });
    };

    setSubject = e => {
        this.setState({ subject: e.target.value });
    };

    setLesson = e => {
        this.setState({ lesson: e.target.value });
    };

    setHour = e => {
        this.setState({ hour: e.target.value });
    };

    render() {
        const { connectDragSource, isOver, canDrop, connectDropTarget, collision,
            isDragging, groupId, lessonId, day, teacherId, classNumber, empty, article } = this.props;

        // console.log(currentGroup, { indexDay: this.props.indexDay, indexTimeItem: this.props.indexTimeItem, indexItem: this.props.indexItem }, groupId);

        if (empty) {
            return connectDropTarget(
                <div className="day-col-item"
                     onMouseEnter={this.onMouseEnterHandler}
                     onMouseLeave={this.onMouseLeaveHandler} >

                    <Modal
                        style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                        show={this.state.showAddLessonModal}
                        onHide={this.handleShowAddLessonModal}
                        dialogClassName='modal-add-lesson'>
                        <Modal.Header closeButton>
                            <Modal.Title id='contained-modal-title-lg' >
                                Добавить занятие
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal>
                                <FormGroup controlId="formControlsSelectGroup" bsClass="col-xs-3">
                                    <ControlLabel>Группа</ControlLabel>
                                    {' '}
                                    <FormControl componentClass="select" placeholder="Выберите группу"
                                                 value={this.state.newGroupId}
                                                 onChange={this.selectNewGroup}>
                                        {_.map(this.props.groups, (group, index) => {
                                            return (<option key={index} value={index}>{group}</option>);
                                        })}
                                    </FormControl>
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formControlsSelectLesson" bsClass="col-xs-3">
                                    <ControlLabel>Предмет</ControlLabel>
                                    {' '}
                                    <FormControl componentClass="select" placeholder="Выберите предмет"
                                                 value={this.state.newLessonId} onChange={this.selectNewLesson}>
                                        {_.map(this.props.lessons, (lesson, index) => {
                                            return (<option key={index} value={index}>{lesson}</option>);
                                        })}
                                    </FormControl>
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formControlsSelectTeacher" bsClass="col-xs-3">
                                    <ControlLabel>Преподаватель</ControlLabel>
                                    {' '}
                                    <FormControl componentClass="select" placeholder="Выберите преподавателя"
                                                 value={this.state.newTeacherId} onChange={this.selectNewTeacher}>
                                        {_.map(this.props.teachers, (teacher, index) => {
                                            return (<option key={index} value={index}>{teacher}</option>);
                                        })}
                                    </FormControl>
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formControlsSelectClass" bsClass="col-xs-3">
                                    <ControlLabel>Место проведения</ControlLabel>
                                    {' '}
                                    <FormControl componentClass="select" placeholder="Выберите место проведения занятия"
                                                 value={this.state.newClassNumber} onChange={this.selectNewClassNumber}>
                                        {_.map(this.props.classNumbers, (classNumber, index) => {
                                            return (<option key={index} value={index}>{classNumber}</option>);
                                        })}
                                    </FormControl>
                                </FormGroup>
                                {' '}
                            </Form>

                            <Form inline bsClass="col-xs-12 " style={{ marginBottom: 10 }}>
                                <FormGroup controlId="formInlineName" bsClass="col-xs-3">
                                    <ControlLabel>Тема</ControlLabel>
                                    {' '}
                                    <FormControl type="text" placeholder="2" style={{ width: '100%' }}
                                                 onChange={this.setSubject} />
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formInlineEmail" bsClass="col-xs-3">
                                    <ControlLabel>Занятие</ControlLabel>
                                    {' '}
                                    <FormControl type="text" placeholder="2" style={{ width: '100%' }}
                                                 onChange={this.setLesson} />
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formInlineEmail" bsClass="col-xs-3">
                                    <ControlLabel>Часы</ControlLabel>
                                    {' '}
                                    <FormControl type="text" placeholder="2" style={{ width: '100%' }}
                                                 onChange={this.setHour} />
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formControlsSelectGroup" bsClass="col-xs-3">
                                    <ControlLabel>Тип занятия</ControlLabel>
                                    <FormControl componentClass="select" placeholder="Вид занятия"
                                                 style={{ width: '100%' }}
                                                 value={this.state.lessonTypeId}
                                                 onChange={this.selectLessonType}>
                                        {_.map(this.props.lessonTypes, (lessonType, index) => {
                                            return (<option key={index} value={index}>{lessonType}</option>);
                                        })}
                                    </FormControl>
                                </FormGroup>
                                {' '}
                            </Form>
                            {' '}
                            <Row>
                                <Button bsStyle='success' onClick={this.addLesson}>Добавить</Button>
                                <Button bsStyle='danger' type="submit" onClick={this.handleShowAddLessonModal}>Отмена</Button>
                            </Row>
                        </Modal.Body>
                    </Modal>


                    {this.state.hover &&
                    <Button style={{position: 'absolute'}} bsStyle="info" bsSize="xsmall"
                            onClick={this.handleShowAddLessonModal}>
                        +
                    </Button>}

                    <div className="group-cell"><TextCell value={' - '} /></div>
                    <DayCell empty />
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
                 onMouseEnter={this.onMouseEnterHandler}
                 onMouseLeave={this.onMouseLeaveHandler}
                 style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>

                <Modal
                    style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showDeleteLessonModal}
                    onHide={this.handleShowDeleteLessonModal}
                    dialogClassName='modal-add-lesson'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Удалить занятие
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="formControlsDialog">
                            <Col componentClass={ControlLabel} xsOffset={4} sm={2}>
                                <Button bsStyle='success' onClick={this.deleteLesson}>Да</Button>
                            </Col>
                            <Col sm={2}>
                                <Button bsStyle='danger' type="submit"
                                        onClick={this.handleShowDeleteLessonModal}>Отмена</Button>
                            </Col>
                        </FormGroup>
                        <br/>
                    </Modal.Body>
                </Modal>

                {this.state.hover &&
                <Button style={{position: 'absolute'}} bsStyle="danger" bsSize="xsmall"
                        onClick={this.handleShowDeleteLessonModal}>
                    -
                </Button>}

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
                            article={article}
                            disHover={this.disHover}
                            indexTimeItem={this.props.indexTimeItem} />
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
    groupId: PropTypes.number,
    lessonId: PropTypes.number,
    teacherId: PropTypes.number,
    classNumber: PropTypes.number,
    day: PropTypes.object,

    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
    return {
        classNumbers: state.timetable.classNumbers,
        teachers: state.timetable.teachers,
        lessons: state.timetable.lessons,
        groups: state.timetable.groups,
        lessonTypes: state.timetable.lessonTypes,
        defaultGroupPosition: state.timetable.defaultGroupPosition
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeGroup: bindActionCreators(changeGroup, dispatch),
        addLesson: bindActionCreators(addLesson, dispatch),
        deleteLesson: bindActionCreators(deleteLesson, dispatch),
    }
};

Lesson = flow(
    DragSource(ItemTypes.LESSON, lessonSource, collectSource),
    DropTarget(ItemTypes.LESSON, lessonTarget, collectTarget)
)(Lesson);

export default connect( mapStateToProps, mapDispatchToProps )(Lesson);
