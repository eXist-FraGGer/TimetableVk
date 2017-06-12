import React, { Component } from 'react';
import { connect }          from 'react-redux';
// import { bindActionCreators } from 'redux';
import {
    Button,
    Modal,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';
import _ from 'lodash';

class Article extends Component {
    constructor(props) {
        super(props);

        const values = this.props.value.split('-');

        let hourAndType, lessonTypeId;

        if (values.length === 3) {
            hourAndType = values[2].replace(/(\d+)(\D+)/, '$1,$2').split(',');
            lessonTypeId = _.indexOf(this.props.lessonTypes, hourAndType[1]);
        }

        this.state = {
            lessonTypeId: lessonTypeId || 0,
            showChangeArticleModal: false,
            subject: (values.length === 3) ? values[0] : '2',
            lesson: (values.length === 3) ? values[1] : '2',
            hour: (values.length === 3) ? hourAndType[0] : '2',
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            const values = nextProps.value.split('-');

            let hourAndType, lessonTypeId;

            if (values.length === 3) {
                hourAndType = values[2].replace(/(\d+)(\D+)/, '$1,$2').split(',');
                lessonTypeId = _.indexOf(this.props.lessonTypes, hourAndType[1]);
            }

            this.setState({
                lessonTypeId: lessonTypeId || 0,
                showChangeArticleModal: false,
                subject: (values.length === 3) ? values[0] : '2',
                lesson: (values.length === 3) ? values[1] : '2',
                hour: (values.length === 3) ? hourAndType[0] : '2',
            });
        }
    };

    handleShowChangeArticleModal = () => {
        const values = this.props.value.split('-');

        let hourAndType, lessonTypeId;

        if (values.length === 3) {
            hourAndType = values[2].replace(/(\d+)(\D+)/, '$1,$2').split(',');
            lessonTypeId = _.indexOf(this.props.lessonTypes, hourAndType[1]);
        }

        this.setState({
            lessonTypeId: lessonTypeId || 0,
            subject: (values.length === 3) ? values[0] : '2',
            lesson: (values.length === 3) ? values[1] : '2',
            hour: (values.length === 3) ? hourAndType[0] : '2',
            showChangeArticleModal: !this.state.showChangeArticleModal
        });
    };

    changeArticle = () => {
        const value = `${this.state.subject}-${this.state.lesson}-${this.state.hour}${this.props.lessonTypes[this.state.lessonTypeId]}`;

        this.props.changeArticle(value);
        this.setState({ showChangeArticleModal: false });
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
        return (
            <div style={this.props.style} >
                <Modal
                    style={{ textAlign: 'center', borderRadius: 20, backgroundColor: 'transparent' }}
                    show={this.state.showChangeArticleModal}
                    onHide={this.handleShowChangeArticleModal}
                    dialogClassName='modal-add-lesson'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg' >
                            Изменить артикул
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form inline>
                            <FormGroup controlId="formInlineName" bsClass="col-xs-3">
                                <ControlLabel>Тема</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="2" style={{ width: '100%' }}
                                             defaultValue={this.state.subject}
                                             onChange={this.setSubject} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail" bsClass="col-xs-3">
                                <ControlLabel>Занятие</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="2" style={{ width: '100%' }}
                                             defaultValue={this.state.lesson}
                                             onChange={this.setLesson} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail" bsClass="col-xs-3">
                                <ControlLabel>Часы</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="2" style={{ width: '100%' }}
                                             defaultValue={this.state.hour}
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
                            <Button onClick={this.changeArticle} style={{ marginTop: 10 }}>
                                Готово
                            </Button>
                        </Form>
                        <br/>
                    </Modal.Body>
                </Modal>
                <span type="text" onChange={this.changeArticle}
                       onClick={this.handleShowChangeArticleModal}
                       style={{
                           width: '100%',
                           borderRadius: 5,
                           paddingLeft: 5,
                           borderWidth: 0
                       }} >
                    {this.props.value}
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lessonTypes: state.timetable.lessonTypes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};


export default connect( mapStateToProps, mapDispatchToProps )(Article);
