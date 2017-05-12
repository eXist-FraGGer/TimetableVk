import types from '../actions/types';
import _ from 'lodash';

const initial_state = [{
    times: {
        start: "8:00",
        end: "9:20"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        groupId: 6,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 0,
        indexItem: 1,
        groupId: 2,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 2,
        indexItem: 0,
        groupId: 3,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 0,
        groupId: 4,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 1,
        groupId: 0,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 0,
        groupId: 5,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 1,
        groupId: 7,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 2,
        groupId: 8,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }]
}, {
    times: {
        start: "9:35",
        end: "10:55"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        groupId: 6,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 0,
        indexItem: 1,
        groupId: 2,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 2,
        indexItem: 0,
        groupId: 3,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 0,
        groupId: 4,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 1,
        groupId: 0,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 0,
        groupId: 5,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 1,
        groupId: 7,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 2,
        groupId: 8,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }]
}, {
    times: {
        start: "14:35",
        end: "15:55"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        groupId: 6,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 0,
        indexItem: 1,
        groupId: 2,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 2,
        indexItem: 0,
        groupId: 3,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 0,
        groupId: 4,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 1,
        groupId: 0,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 0,
        groupId: 5,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 1,
        groupId: 7,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 2,
        groupId: 8,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }]
},{
    times: {
        start: "16:10",
        end: "17:30"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        groupId: 6,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 0,
        indexItem: 1,
        groupId: 2,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 2,
        indexItem: 0,
        groupId: 3,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 0,
        groupId: 4,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 3,
        indexItem: 1,
        groupId: 0,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 0,
        groupId: 5,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 1,
        groupId: 7,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }, {
        indexDay: 4,
        indexItem: 2,
        groupId: 8,
        lessonId: 0,
        teacherId: 0,
        classNumber: 0
    }]
}];

export default function (state = initial_state, action) {
    switch (action.type) {

        case types.MOVE: {
            const {source, target} = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            let sourceIndex = _.findIndex(newState[source.indexTimeItem].items, {
                    indexDay: source.indexDay,
                    indexItem: source.indexItem
                }),
                targetIndex = _.findIndex(newState[target.indexTimeItem].items, {
                    indexDay: target.indexDay,
                    indexItem: target.indexItem
                });

            if (targetIndex === -1) {
                if (target.indexTimeItem === source.indexTimeItem) {
                    newState[source.indexTimeItem].items[sourceIndex].indexItem = target.indexItem;
                    newState[source.indexTimeItem].items[sourceIndex].indexDay = target.indexDay;
                } else {
                    newState[target.indexTimeItem].items.push(Object.assign({},
                        newState[source.indexTimeItem].items[sourceIndex], {
                            indexItem: target.indexItem,
                            indexDay: target.indexDay
                        }));
                    delete newState[source.indexTimeItem].items[sourceIndex];
                }
            } else {
                newState[target.indexTimeItem].items.push(Object.assign({},
                    newState[source.indexTimeItem].items[sourceIndex],
                    { indexItem: target.indexItem, indexDay: target.indexDay }));
                newState[source.indexTimeItem].items.push(Object.assign({},
                    newState[target.indexTimeItem].items[targetIndex],
                    { indexItem: source.indexItem, indexDay: source.indexDay }));

                delete newState[source.indexTimeItem].items[sourceIndex];
                delete newState[target.indexTimeItem].items[targetIndex];
            }

            return [ ...newState ];
        }

        case types.CHANGE_GROUP: {
            const { lesson, newGroupId } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState[lesson.indexTimeItem].items, {
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem
            });

            newState[lesson.indexTimeItem].items[lessonIndex].groupId = newGroupId;

            return [ ...newState ];
        }

        case types.CHANGE_TEACHER: {
            const { lesson, newTeacherId } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState[lesson.indexTimeItem].items, {
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem
            });

            newState[lesson.indexTimeItem].items[lessonIndex].teacherId = newTeacherId;

            return [ ...newState ];
        }

        case types.CHANGE_CLASS_NUMBER: {
            const { lesson, newClassNumber } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState[lesson.indexTimeItem].items, {
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem
            });

            newState[lesson.indexTimeItem].items[lessonIndex].classNumber = newClassNumber;

            return [ ...newState ];
        }

        case types.CHANGE_LESSON: {
            const { lesson, newLessonId } = action.payload;

            const newState = _.map(state, object => Object.assign({}, object));

            const lessonIndex = _.findIndex(newState[lesson.indexTimeItem].items, {
                indexDay: lesson.indexDay,
                indexItem: lesson.indexItem
            });

            newState[lesson.indexTimeItem].items[lessonIndex].lessonId = newLessonId;

            return [ ...newState ];
        }

        default:
            return state
    }
}