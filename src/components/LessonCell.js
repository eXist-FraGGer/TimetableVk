import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import moment from 'moment';
import { changeLesson, changeTeacher, changeClassNumber } from '../actions/lessons';
import { Dropdown, Article } from '../components';
// import _ from 'lodash';

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
            indexWeek: this.props.indexWeek,
            indexTimeItem: this.props.indexTimeItem
        }, index);
    };

    clickTeachersSelectItem = (index) => {
        this.props.changeTeacher({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexWeek: this.props.indexWeek,
            indexTimeItem: this.props.indexTimeItem
        }, index);
    };

    clickClassNumbersSelectItem = (index) => {
        this.props.changeClassNumber({
            indexDay: this.props.indexDay,
            indexItem: this.props.indexItem,
            indexWeek: this.props.indexWeek,
            indexTimeItem: this.props.indexTimeItem
        }, index);
    };

    render() {
        const { lessons, article, teachers, classNumbers, collision,
            lessonId, teacherId, classNumber } = this.props;

        let stylesLesson = styles.left,
            stylesTeacher = styles.left,
            stylesClass = styles.right;

        if (collision.lesson) {
            stylesLesson = Object.assign({}, stylesLesson, styles.collision);
        }
        if (collision.teacher) {
            stylesTeacher = Object.assign({}, stylesTeacher, styles.collision);
        }
        if (collision.class) {
            stylesClass = Object.assign({}, stylesClass, styles.collision);
        }

        // console.log(this.props);

        return (
            <div className="day-cell">
                <div style={styles.line}>
                    <Dropdown style={stylesLesson} data={lessons} title={lessons[lessonId]}
                              currentIndex={lessonId}
                              styleSelectContainer={styles.selectContainer}
                              styleSelectItem={styles.selectItem}
                              styleHoverItem={styles.hoverItem}
                              clickSelectItem={this.clickLessonsSelectItem} />
                    <Article style={styles.right} value={article || 'article'} />
                </div>
                <div style={styles.line}>
                    <Dropdown style={stylesTeacher} data={teachers} title={teachers[teacherId]}
                              currentIndex={teacherId}
                              styleSelectContainer={styles.selectContainer}
                              styleSelectItem={styles.selectItem}
                              styleHoverItem={styles.hoverItem}
                              clickSelectItem={this.clickTeachersSelectItem} />

                    <Dropdown style={stylesClass} data={classNumbers} title={classNumbers[classNumber]}
                              currentIndex={classNumber}
                              styleSelectContainer={styles.selectContainer}
                              styleSelectItem={styles.selectItem}
                              styleHoverItem={styles.hoverItem}
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
