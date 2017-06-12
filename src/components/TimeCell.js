import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Row
} from 'react-bootstrap';
import moment from 'moment';

class TimeCell extends Component {
    constructor(props) {
        super(props);

        const times = props.value.split('-');

        this.state = {
            showChangeTimeModal: false,
            start: moment(times[0], 'HH:mm').format('HH:mm'),
            end: moment(times[1], 'HH:mm').format('HH:mm'),
            hover: false,
            showDeleteTimeItemModal: false
        }
    };

    componentWillReceiveProps(nextProps) {
        const times = nextProps.value.split('-');

        this.setState({
            start: moment(times[0], 'HH:mm').format('HH:mm'),
            end: moment(times[1], 'HH:mm').format('HH:mm')
        });
    };

    setTimeStart = e => {
        this.setState({ start: e.target.value });
    };

    setTimeEnd = e => {
        this.setState({ end: e.target.value });
    };

    handleShowChangeTimeModal = () => {
        this.setState({ showChangeTimeModal: !this.state.showChangeTimeModal });
    };

    onMouseEnterHandler = () => {
        this.setState({ hover: true });
    };

    onMouseLeaveHandler = () => {
        this.setState({ hover: false });
    };

    onChangeTime = () => {
        if (moment(this.state.start, 'HH:mm').isValid() &&
            moment(this.state.end, 'HH:mm').isValid()) {
            this.props.changeTime({
                start: this.state.start,
                end: this.state.end,
            });
            this.setState({ showChangeTimeModal: false });
        } else {
            alert('Не валидная дата!');
        }
    };

    handleShowDeleteTimeItemModal = () => {
        this.setState({ showDeleteTimeItemModal: !this.state.showDeleteTimeItemModal });
    };

    deleteTimeItem = () => {
        this.props.delteTimeItem();
        this.setState({ showDeleteTimeItemModal: false });
    };

    render() {
        return (
            <div onMouseEnter={this.onMouseEnterHandler}
                onMouseLeave={this.onMouseLeaveHandler}
                style={{ display: 'flex', flex: 1 }}>

                <Modal
                    style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showDeleteTimeItemModal}
                    onHide={this.handleShowDeleteTimeItemModal}
                    dialogClassName='modal-delete-time-item'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Удаление пары
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {' '}
                        <Row>
                            <Button bsStyle='success' onClick={this.deleteTimeItem}>Удалить</Button>
                            <Button bsStyle='danger' type="submit" onClick={this.handleShowDeleteTimeItemModal}>
                                Отмена
                            </Button>
                        </Row>
                        <br/>
                    </Modal.Body>
                </Modal>

                <Modal
                    style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showChangeTimeModal}
                    onHide={this.handleShowChangeTimeModal}
                    dialogClassName='modal-change-time'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Изменить время занятия
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form inline>
                            <FormGroup controlId="formInlineName" bsClass="col-xs-3">
                                <ControlLabel>Начало</ControlLabel>
                                {' '}
                                <FormControl type="time" placeholder="2" style={{ width: '100%' }}
                                             defaultValue={this.state.start}
                                             onChange={this.setTimeStart} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail" bsClass="col-xs-3">
                                <ControlLabel>Окончание</ControlLabel>
                                {' '}
                                <FormControl type="time" placeholder="2" style={{ width: '100%' }}
                                             defaultValue={this.state.end}
                                             onChange={this.setTimeEnd} />
                            </FormGroup>
                            <Button onClick={this.onChangeTime} style={{ marginTop: 10 }}>
                                Готово
                            </Button>
                        </Form>
                        <br/>
                    </Modal.Body>
                </Modal>

                <div
                    className="time-cell"
                    onClick={this.handleShowChangeTimeModal}
                    style={{backgroundColor: this.props.color || 'transparent'}}>

                    <span>{ this.props.value }</span>

                </div>

                {this.state.hover &&
                <Button style={{position: 'absolute', left: 15, marginTop: 55}}
                        bsStyle="danger" bsSize="xsmall"
                        onClick={this.handleShowDeleteTimeItemModal}>
                    -
                </Button>}

            </div>
        );
    }
}

export default TimeCell;
