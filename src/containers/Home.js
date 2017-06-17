import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileSaver from 'file-saver';
import { Modal, Form, Table, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader-input';
import moment from 'moment';
import _ from 'lodash';

import { Timetable } from '../containers';
import { isJson } from '../helpFunction/validation';
import { setStateTimeTable, setSettings, addDefaultGroup, deleteDefaultGroup } from '../actions/timetable';
import { setStateLessons } from '../actions/lessons';

import '../style/Home.css'


export class Home extends Component {
    constructor(props) {
        super(props);

        const { classNumbers, teachers, lessons, groups, lessonTypes } = this.props.state.timetable;

        this.state = {
            showGetStateModal: false,
            showSettingsStateModal: false,
            teachersLoad: {},
            classNumbers: classNumbers.join(';'),
            teachers: teachers.join(';'),
            lessons: lessons.join(';'),
            groups: groups.join(';'),
            lessonTypes: lessonTypes.join(';'),
            showAddDefaultGroupModal: false
        }
    }

    handleShowGetStateModal = () => {
        this.setState({ showGetStateModal: !this.state.showGetStateModal });
    };

    handleShowSettingsStateModal = () => {
        this.setState({ showSettingsStateModal: !this.state.showSettingsStateModal });
    };

    handleShowAddDefaultGroupModal = () => {
        this.setState({ showAddDefaultGroupModal: !this.state.showAddDefaultGroupModal });
    };

    componentDidMount() {
        this.calculateTeachersLoad(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.calculateTeachersLoad(nextProps);

        const { classNumbers, teachers, lessons, groups, lessonTypes } = nextProps.state.timetable;

        this.setState({
            classNumbers: classNumbers.join(';'),
            teachers: teachers.join(';'),
            lessons: lessons.join(';'),
            groups: groups.join(';'),
            lessonTypes: lessonTypes.join(';')
        });
    };

    onClickSaveState = () => {
        const blob = new Blob([JSON.stringify(this.props.state, null, 4)], { type: 'application/json;charset=utf-8' });
        FileSaver.saveAs(blob, `${this.inputFileName.value || 'Рассписание'}.json`);
        this.setState({ showGetStateModal: false });
    };

    onClickExportState = () => {
        const { lessons, timetable } = this.props.state;
        const value = { lessons, timetable };

        fetch("http://localhost:8000/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        }).then(res => res.json()).then(data => {
            if (data.message !== 'successfully') {
                new Error('Ошибка...');
            }
            window.open('http://localhost:8000/download', '_blank').focus();
        }).catch(err => alert(JSON.stringify(err)));
        this.setState({ showGetStateModal: false });
    };

    calculateTeachersLoad = props => {
        const lessonsGroupByTeacher = _.groupBy(_.filter(props.lessons, lesson =>
            props.times.hasOwnProperty(`${lesson.indexTimeItem}`)), 'teacherId');
        const teachersLoad = {};

        _.map(lessonsGroupByTeacher, (lessons, index) => {
            if (index !== 'undefined') {
                teachersLoad[index] = 0;
            }
        });

        _.map(lessonsGroupByTeacher, (lessons, index) => {
           if (index !== 'undefined') {
               const lessonsGroupByDay = _.groupBy(lessons, 'indexDay');

               _.map(lessonsGroupByDay, lessonsByDay => {
                   _.map(lessonsByDay, lesson => {
                       if (!_.some(props.holidays, holiday => moment(holiday, 'YYYY-MM-DD')
                               .isSame(moment(moment(props.firstDate)
                                   .add(lesson.indexDay, 'days'), 'YYYY-MM-DD')) )) {

                           teachersLoad[index] += 1;
                       }
                   });
               });
           }
        });
        this.setState({ teachersLoad });
    };

    handleFile = (e, results) => {
        results.forEach(result => {
            const [e] = result;
            if (isJson(e.target.result)) {
                const objectTimeTable = JSON.parse(e.target.result);
                const { timetable, lessons } = objectTimeTable;

                this.props.setStateTimeTable(timetable);
                this.props.setStateLessons(lessons);
            } else {
                alert('Не верные данные!');
            }
        });
    };

    onClickSettingsState = () => {
        this.props.setSettings({
            classNumbers: this.inputClassNumbers.value.split(';'),
            teachers: this.inputTeachers.value.split(';'),
            lessons: this.inputLessons.value.split(';'),
            groups: this.inputGroups.value.split(';'),
            lessonTypes: this.inputLessonTypes.value.split(';')
        });
        this.setState({ showSettingsStateModal: false });
    };

    onChangeDefaultGroupPosition = index => {
        this.setState({ showAddDefaultGroupModal: true }, () => {
            this.inputNewDefaultGroup.value = this.props.state.timetable.defaultGroupPosition[index].indexGroup;
            this.inputNewDefaultGroupDay.value = this.props.state.timetable.defaultGroupPosition[index].indexDay;
            this.inputNewDefaultGroupTimeItem.value = this.props.state.timetable.defaultGroupPosition[index].indexTimeItem;
            this.inputNewDefaultGroupItem.value = this.props.state.timetable.defaultGroupPosition[index].indexItem;
        });
    };

    onClickAddDefaultGroup = () => {
        this.props.addDefaultGroup({
            indexGroup: +this.inputNewDefaultGroup.value,
            indexDay: +this.inputNewDefaultGroupDay.value,
            indexTimeItem: +this.inputNewDefaultGroupTimeItem.value,
            indexItem: +this.inputNewDefaultGroupItem.value
        });
        this.setState({ showAddDefaultGroupModal: false });
    };

    onClickDeleteDefaultGroup = index => {
        this.props.deleteDefaultGroup(index);
        this.setState({ showAddDefaultGroupModal: false });
    };

    render() {
        const lessonsByWeek = _.groupBy(this.props.lessons, 'indexWeek');

        return (
            <Row>
                <Modal
                    style={{ textAlign: 'center', fontWeight: 700, borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showGetStateModal}
                    onHide={this.handleShowGetStateModal}
                    dialogClassName='modal-get-state'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Сохранить расписание
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Данные</ControlLabel>
                            {' '}
                            <FormControl componentClass="textarea" placeholder="Данные"
                                         value={JSON.stringify(this.props.state, null, 4)}
                                         bsSize="small" style={{minHeight: 300}} disabled />
                        </FormGroup>
                        {' '}
                        <FormGroup controlId="formControlsFileName">
                            <ControlLabel>Имя файла</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Имя файла"
                                         defaultValue="Рассписание"
                                         inputRef={input => this.inputFileName = input}
                                         bsSize="small" />
                        </FormGroup>
                        {' '}
                        <Button bsStyle='success' onClick={this.onClickSaveState}>Сохранить</Button>
                        <Button bsStyle='success' onClick={this.onClickExportState}>Экспортировать в DOCX</Button>
                    </Modal.Body>
                </Modal>
                <Modal
                    style={{ textAlign: 'center', fontWeight: 700, borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showSettingsStateModal}
                    onHide={this.handleShowSettingsStateModal}
                    dialogClassName='modal-get-state'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Задать аргументы
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup controlId="formControlsClassNumbersText">
                                <ControlLabel>Аудитории</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Аудитории"
                                             inputRef={input => this.inputClassNumbers = input}
                                             defaultValue={this.state.classNumbers} bsSize="small" />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsTeachersText">
                                <ControlLabel>Преподаватели</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Преподаватели"
                                             inputRef={input => this.inputTeachers = input}
                                             defaultValue={this.state.teachers} bsSize="small" />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsLessonsText">
                                <ControlLabel>Занятия</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Занятия"
                                             inputRef={input => this.inputLessons = input}
                                             defaultValue={this.state.lessons} bsSize="small" />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsClassGroupsText">
                                <ControlLabel>Группы</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Группы"
                                             inputRef={input => this.inputGroups = input}
                                             defaultValue={this.state.groups} bsSize="small" />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsLessonTypesGroupsText">
                                <ControlLabel>Типы занятий</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="Типы занятий"
                                             inputRef={input => this.inputLessonTypes = input}
                                             defaultValue={this.state.lessonTypes} bsSize="small" />
                            </FormGroup>
                            {' '}
                            <h6>Группы по умолчанию</h6>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr><th>Группа</th><th>№ пары</th><th>№ дня</th><th>№ п/п</th><th></th></tr>
                                </thead>
                                <tbody>
                                {_.map(this.props.state.timetable.defaultGroupPosition, (position, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{this.props.state.timetable.groups[position.indexGroup]}</td>
                                            <td>{position.indexTimeItem}</td>
                                            <td>{position.indexDay}</td>
                                            <td>{position.indexItem}</td>
                                            <td>
                                                <Button bsStyle='danger' bsSize='small'
                                                        onClick={this.onClickDeleteDefaultGroup.bind(this, index)}>
                                                    -</Button>
                                                <Button bsStyle='primary' bsSize='small'
                                                        onClick={this.onChangeDefaultGroupPosition.bind(this, index).bind(this, index)}>
                                                    *</Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <Button bsStyle='success' onClick={this.handleShowAddDefaultGroupModal}>+</Button>
                                </tr>
                                </tbody>
                            </Table>
                            {' '} <br/> {' '}
                            <Button bsStyle='primary' onClick={this.onClickSettingsState}>Сохранить</Button>
                            <Button bsStyle='success' onClick={this.handleShowSettingsStateModal}>Отмена</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal
                    style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showAddDefaultGroupModal}
                    onHide={this.handleShowAddDefaultGroupModal}
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
                                <FormControl componentClass="select" placeholder="Выберите группу" defaultValue={0}
                                             inputRef={input => this.inputNewDefaultGroup = input}>
                                    {_.map(this.props.state.timetable.groups, (group, index) => {
                                        return (<option key={index} value={index}>{group}</option>);
                                    })}
                                </FormControl>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsSelectDay" bsClass="col-xs-3">
                                <ControlLabel>День</ControlLabel>
                                {' '}
                                <FormControl componentClass="select" placeholder="Выберите день" defaultValue={0}
                                             inputRef={input => this.inputNewDefaultGroupDay = input}>
                                    {_.map(new Array(5), (v, index) => {
                                        return (<option key={index} value={index}>{index}</option>);
                                    })}
                                </FormControl>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsSelectDay" bsClass="col-xs-3">
                                <ControlLabel>Пара</ControlLabel>
                                {' '}
                                <FormControl componentClass="select" placeholder="Выберите пару" defaultValue={0}
                                             inputRef={input => this.inputNewDefaultGroupTimeItem = input}>
                                    {_.map(new Array(Object.keys(this.props.state.timetable.times).length), (v, index) => {
                                        return (<option key={index} value={index}>{index}</option>);
                                    })}
                                </FormControl>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formControlsSelectDay" bsClass="col-xs-3">
                                <ControlLabel>Номер по порядку</ControlLabel>
                                {' '}
                                <FormControl componentClass="select" placeholder="Выберите номер" defaultValue={0}
                                             inputRef={input => this.inputNewDefaultGroupItem = input}>
                                    {_.map(new Array(4), (v, index) => {
                                        return (<option key={index} value={index}>{index}</option>);
                                    })}
                                </FormControl>
                            </FormGroup>
                            {' '}
                        </Form>
                        {' '}
                        <Row>
                            <Button bsStyle='success' onClick={this.onClickAddDefaultGroup}>Добавить</Button>
                            <Button bsStyle='danger' type="submit" onClick={this.handleShowAddDefaultGroupModal}>Отмена</Button>
                        </Row>
                    </Modal.Body>
                </Modal>

                <Col xs={10} style={{backgroundColor: 'rgba(249, 255, 0, 0.25)'}}>
                    {_.map(new Array(4), (value, index) => {
                        return (
                            <Timetable key={index} first={index===0} indexWeek={index} lessons={lessonsByWeek[index]}
                                       firstDate={moment(this.props.firstDate).add(index * 7, 'days')} />
                        )
                    })}
                    {' '} <br/><br/> {' '}
                </Col>

                <Col xs={2} style={{
                    position: 'fixed',
                    right: 0,
                    backgroundColor: 'rgba(249, 255, 0, 0.25)',
                    height: '100%',
                    paddingTop: 30
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderBottomWidth: -10,
                        marginBottom: -20,
                        borderBottom: '2px solid red',
                        flexDirection: 'column'
                    }}>
                        <button onClick={this.handleShowGetStateModal}>Сохранить расписание</button>
                        {' '} <br/> {' '}
                        <FileReaderInput as="text" id="my-file-input" accept=".json"
                                         onChange={this.handleFile} />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: 'column',
                            paddingTop: 10
                        }}>{
                            _.map(this.state.teachersLoad, (load, id) => {
                                return (
                                    <div key={id} style={{padding: 10, textAlign: 'right'}}>
                                        <span>{this.props.state.timetable.teachers[id]}:</span>
                                        <span style={{marginLeft: 10}}>{load}</span>
                                    </div>
                                )
                            })
                        }</div>
                        {' '} <br/> {' '}
                        <Button bsStyle='info' onClick={this.handleShowSettingsStateModal}>Настройки</Button>
                    </div>
                </Col>
            </Row>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        state: state,
        lessons: state.lessons,
        firstDate: state.timetable.firstDate,
        holidays: state.timetable.holidays,
        times: state.timetable.times
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStateTimeTable: bindActionCreators(setStateTimeTable, dispatch),
        setStateLessons: bindActionCreators(setStateLessons, dispatch),
        setSettings: bindActionCreators(setSettings, dispatch),
        addDefaultGroup: bindActionCreators(addDefaultGroup, dispatch),
        deleteDefaultGroup: bindActionCreators(deleteDefaultGroup, dispatch)
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Home);
