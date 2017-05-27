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
    article: 'article',
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
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 0,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 1,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 2,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 0,
    groupId: 6,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 0,
    indexItem: 1,
    groupId: 2,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 2,
    indexItem: 0,
    groupId: 3,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 0,
    groupId: 4,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 1,
    groupId: 0,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 0,
    groupId: 5,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 4,
    indexItem: 1,
    groupId: 7,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}, {
    indexTimeItem: 3,
    indexWeek: 0,
    indexDay: 3,
    indexItem: 2,
    groupId: 8,
    lessonId: 0,
    teacherId: 0,
    classNumber: 0,
    article: 'article'
}
];

export default function (state = initial_state, action) {
    switch (action.type) {
        case types.SET_STATE_LESSONS: {
            return [
                ..._.map(action.payload, object => {
                    return Object.assign({}, object);
                })
            ];
        }

        case types.MOVE: {
            const { source, target } = action.payload;

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

        case types.CHANGE_ARTICLE: {
            const { lesson, newArticle } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState, {
                indexWeek: lesson.indexWeek,
                indexTimeItem: lesson.indexTimeItem,
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem,
            });

            newState[lessonIndex].article = newArticle;

            return [ ...checkLessons(newState) ];
        }

        case types.ADD: {
            const newState = _.map(state, object => Object.assign({}, object));

            newState.push(action.payload);

            return [ ...checkLessons(newState) ];
        }

        case types.DELETE: {
            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState, {
                indexWeek: action.payload.indexWeek,
                indexTimeItem: action.payload.indexTimeItem,
                indexDay: action.payload.indexDay,
                indexItem: action.payload.indexItem,
            });

            delete newState[lessonIndex];

            return [ ...checkLessons(newState) ];
        }

        default:
            return checkLessons(state)
    }
}