import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileSaver from 'file-saver';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
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
        const blob = new Blob([JSON.stringify(this.props.state, null, 4)], { type: 'application/json;charset=utf-8' });
        FileSaver.saveAs(blob, 'TimeTable.json');
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
            <div>
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
                            <FormControl componentClass="textarea" placeholder="Данные"
                                         value={JSON.stringify(this.props.state, null, 4)}
                                         bsSize="small" style={{minHeight: 300}} disabled />
                        </FormGroup>
                        <Button bsStyle='success' onClick={this.onClickSaveState}>Сохранить</Button>
                    </Modal.Body>
                </Modal>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderBottomWidth: -10,
                    marginBottom: -20,
                    borderBottom: '2px solid red'
                }}>
                    <button onClick={this.handleShowGetStateModal}>Сохранить расписание</button>
                    <FileReaderInput as="text" id="my-file-input" accept=".json"
                                     onChange={this.handleFile} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flex: 0.8,
                    }}>{
                        _.map(this.state.teachersLoad, (load, id) => {
                            return (
                                <div key={id}>
                                    <span>{this.props.state.timetable.teachers[id]}:</span>
                                    <span style={{marginLeft: 10}}>{load}</span>
                                </div>
                            )
                        })
                    }</div>
                </div>
                {_.map(new Array(4), (value, index) => {
                    return (
                        <Timetable key={index} first={index===0} indexWeek={index} lessons={lessonsByWeek[index]}
                                   firstDate={moment(this.props.firstDate).add(index * 7, 'days')} />
                    )
                })}
            </div>
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
