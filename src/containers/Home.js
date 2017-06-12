import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileSaver from 'file-saver';
import { Modal, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader-input';
import moment from 'moment';
import _ from 'lodash';

import { Timetable } from '../containers';
import { isJson } from '../helpFunction/validation';
import { setStateTimeTable } from '../actions/timetable';
import { setStateLessons } from '../actions/lessons';

import '../style/Home.css'


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGetStateModal: false,
            teachersLoad: {}
        }
    }

    handleShowGetStateModal = () => {
        this.setState({ showGetStateModal: !this.state.showGetStateModal });
    };

    componentDidMount() {
        this.calculateTeachersLoad(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.calculateTeachersLoad(nextProps);
    };

    onClickSaveState = () => {
        console.log(this.inputFileName.value);

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
                    </div>
                </Col>
            </Row>
        );
    }
}

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
        setStateLessons: bindActionCreators(setStateLessons, dispatch)
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Home)
