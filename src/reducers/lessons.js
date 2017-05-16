import types from '../actions/types';
import _ from 'lodash';

import { checkLessons } from '../helpFunction';

const initial_state = [{
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    collision: {
        group: false,
        teacher: false,
        class: false
    }
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0
}
];

export default function (state = initial_state, action) {
    switch (action.type) {

        case types.MOVE: {
            const { source, target } = action.payload;

            // console.log(source, target);

            let newState = _.map(state, object => Object.assign({}, object));

            let sourceIndex = _.findIndex(newState, {
                    indexWeek: source.indexWeek,
                    indexTimeItem: source.indexTimeItem,
                    indexDay: source.indexDay,
                    indexItem: source.indexItem,
                }),
                targetIndex = _.findIndex(newState, {
                    indexWeek: target.indexWeek,
                    indexTimeItem: target.indexTimeItem,
                    indexDay: target.indexDay,
                    indexItem: target.indexItem
                });

            if (targetIndex === -1) {
                newState.push(Object.assign({}, newState[sourceIndex], {
                    indexWeek: target.indexWeek,
                    indexTimeItem: target.indexTimeItem,
                    indexDay: target.indexDay,
                    indexItem: target.indexItem
                }));
                delete newState[sourceIndex];
            } else {
                newState.push(Object.assign({}, newState[targetIndex], {
                    indexWeek: source.indexWeek,
                    indexTimeItem: source.indexTimeItem,
                    indexDay: source.indexDay,
                    indexItem: source.indexItem,
                }));
                newState.push(Object.assign({}, newState[sourceIndex], {
                    indexWeek: target.indexWeek,
                    indexTimeItem: target.indexTimeItem,
                    indexDay: target.indexDay,
                    indexItem: target.indexItem
                }));

                delete newState[sourceIndex];
                delete newState[targetIndex];
            }

            newState = _.compact(newState);

            newState = checkLessons(newState);

            return [ ...newState ];
        }

        case types.CHANGE_GROUP: {
            const { lesson, newGroupId } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState, {
                indexWeek: lesson.indexWeek,
                indexTimeItem: lesson.indexTimeItem,
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem,
            });

            newState[lessonIndex].groupId = newGroupId;

            return [ ...checkLessons(newState) ];
        }

        case types.CHANGE_TEACHER: {
            const { lesson, newTeacherId } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState, {
                indexWeek: lesson.indexWeek,
                indexTimeItem: lesson.indexTimeItem,
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem,
            });

            newState[lessonIndex].teacherId = newTeacherId;

            return [ ...checkLessons(newState) ];
        }

        case types.CHANGE_CLASS_NUMBER: {
            const { lesson, newClassNumber } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState, {
                indexWeek: lesson.indexWeek,
                indexTimeItem: lesson.indexTimeItem,
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem,
            });

            newState[lessonIndex].classNumber = newClassNumber;

            return [ ...checkLessons(newState) ];
        }

        case types.CHANGE_LESSON: {
            const { lesson, newLessonId } = action.payload;

            console.log(lesson, newLessonId);

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState, {
                indexWeek: lesson.indexWeek,
                indexTimeItem: lesson.indexTimeItem,
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem,
            });

            newState[lessonIndex].lessonId = newLessonId;

            return [ ...checkLessons(newState) ];
        }

        default:
            return checkLessons(state)
    }
}