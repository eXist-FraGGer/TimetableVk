import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import moment from 'moment';

import { TextCell, DayCell } from '../../../components';
import { addTimeItem } from '../../../actions/timetable';

import '../../../style/Header.css';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            start: moment().format('HH:mm'),
            end: moment().add(1, 'hours').add(20, 'minutes').format('HH:mm'),
            showAddTimeItemModal: false
        }
    }
    onMouseEnterTimeCellHandler = () => {
        this.setState({ hover: true });
    };

    onMouseLeaveTimeCellHandler = () => {
        this.setState({ hover: false });
    };

    handleShowAddTimeItemModal = () => {
        this.setState({ showAddTimeItemModal: !this.state.showAddTimeItemModal });
    };

    setTimeStart = e => {
        this.setState({
            start: moment(e.target.value, 'HH:mm').format('HH:mm'),
            end: moment(e.target.value, 'HH:mm').add(1, 'hours').add(20, 'minutes').format('HH:mm') });
    };

    setTimeEnd = e => {
        this.setState({ end: moment(e.target.value, 'HH:mm').format('HH:mm') });
    };

    addTimeItem = () => {
        this.props.addTimeItem({ start: this.state.start, end: this.state.end });
        this.setState({ showAddTimeItemModal: false });
    };

    render() {
        return (
            <div className="header">

                <Modal
                    style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showAddTimeItemModal}
                    onHide={this.handleShowAddTimeItemModal}
                    dialogClassName='modal-change-time'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Добавить пару
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form inline>
                            <FormGroup controlId="formInlineName" bsClass="col-xs-3">
                                <ControlLabel>Начало</ControlLabel>
                                {' '}
                                <FormControl type="time" placeholder="2" style={{ width: '100%' }}
                                             value={this.state.start}
                                             onChange={this.setTimeStart} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail" bsClass="col-xs-3">
                                <ControlLabel>Окончание</ControlLabel>
                                {' '}
                                <FormControl type="time" placeholder="2" style={{ width: '100%' }}
                                             value={this.state.end}
                                             onChange={this.setTimeEnd} />
                            </FormGroup>
                            <Button onClick={this.addTimeItem} style={{ marginTop: 10 }}>
                                Готово
                            </Button>
                        </Form>
                        <br/>
                    </Modal.Body>
                </Modal>

                <div className="time-cell"
                     onMouseEnter={this.onMouseEnterTimeCellHandler}
                     onMouseLeave={this.onMouseLeaveTimeCellHandler}>

                    <TextCell value="Часы занятий" />

                    {this.state.hover &&
                    <Button style={{position: 'absolute', left: 15, marginTop: 12}}
                            bsStyle="info" bsSize="xsmall"
                            onClick={this.handleShowAddTimeItemModal}>
                        +
                    </Button>}
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
                	<DayCell first={this.props.first}
                             title="Понедельник"
                             date={this.props.firstDate} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Вторник" date={moment(this.props.firstDate).add(1, 'day')} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Среда" date={moment(this.props.firstDate).add(2, 'day')} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Четверг" date={moment(this.props.firstDate).add(3, 'day')} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Пятница" date={moment(this.props.firstDate).add(4, 'day')} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTimeItem: bindActionCreators(addTimeItem, dispatch)
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Header);
