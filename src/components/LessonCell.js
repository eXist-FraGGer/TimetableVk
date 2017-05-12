import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import moment from 'moment';
import { changeLesson, changeTeacher, changeClassNumber } from '../actions/lessons';
import { Dropdown } from '../components';
import _ from 'lodash';

import styles from '../style/LessonCells';
import '../style/Cells.css';

class LessonCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    clickLessonsSelectItem = (index) => {
        this.props.changeLesson({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem
        }, index);
    };

    clickTeachersSelectItem = (index) => {
        this.props.changeTeacher({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem
        }, index);
    };

    clickClassNumbersSelectItem = (index) => {
        this.props.changeClassNumber({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexTimeItem: this.props.indexTimeItem
        }, index);
    };

    render() {
        const { lessons, article, teachers, classNumbers,
            lessonId, teacherId, classNumber } = this.props;

        return (
            <div className="day-cell">
                <div style={styles.line}>
                    <Dropdown className="name" data={lessons} title={lessons[lessonId]} currentIndex={lessonId}
                              styleSelectContainer={styles.selectContainer}
                              styleSelectItem={styles.selectItem}
                              clickSelectItem={this.clickLessonsSelectItem} />
                    <div className="article">
                        {article || 'article'}
                    </div>
                </div>
                <div style={styles.line}>
                    <Dropdown className="teacher" data={teachers} title={teachers[teacherId]} currentIndex={teacherId}
                              styleSelectContainer={styles.selectContainer}
                              styleSelectItem={styles.selectItem}
                              clickSelectItem={this.clickTeachersSelectItem} />

                    <Dropdown className="class-number" data={classNumbers} title={classNumbers[classNumber]} currentIndex={classNumber}
                              styleSelectContainer={styles.selectContainer}
                              styleSelectItem={styles.selectItem}
                              clickSelectItem={this.clickClassNumbersSelectItem} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        classNumbers: state.timetable.classNumbers,
        teachers: state.timetable.teachers,
        lessons: state.timetable.lessons,
        groups: state.timetable.groups
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeClassNumber: bindActionCreators(changeClassNumber, dispatch),
        changeTeacher: bindActionCreators(changeTeacher, dispatch),
        changeLesson: bindActionCreators(changeLesson, dispatch)
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(LessonCell);
