import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

import { Timetable } from '../containers';

import '../style/Home.css'


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGetStateModal: false
        }
    }

    handleShowGetStateModal = () => {
        this.setState({ showGetStateModal: !this.state.showGetStateModal });
    };

    onClickSaveState = () => {
        const blob = new Blob([JSON.stringify(this.props.state, null, 4)], { type: 'application/json;charset=utf-8' });
        FileSaver.saveAs(blob, 'TimeTable.json');
        this.setState({ showGetStateModal: false });
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

                <div style={{position: 'absolute', left: 0, top: 0}}>
                    <button onClick={this.handleShowGetStateModal}>Сохранить расписание</button>
                </div>
                {_.map(new Array(1), (value, index) => {
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
        holidays: state.timetable.holidays
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Home)
