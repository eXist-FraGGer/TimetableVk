import types from '../actions/types';
import _ from 'lodash';

const initial_state = [{
    times: {
        start: "08:00",
        end: "09:20"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        group: 'C-1',
        name: 'ТакП.'
    }, {
        indexDay: 0,
        indexItem: 1,
        group: 'C-1-1',
        name: 'ТакП.'
    }, {
        indexDay: 2,
        indexItem: 0,
        group: 'C-2',
        name: 'ТакП.'
    }, {
        indexDay: 3,
        indexItem: 0,
        group: 'C-3',
        name: 'ТакП.'
    }, {
        indexDay: 3,
        indexItem: 1,
        group: 'C-4',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 0,
        group: 'C-5',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 1,
        group: 'C-6',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 2,
        group: 'C-7',
        name: 'ТакП.'
    }]
}, {
    times: {
        start: "08:00",
        end: "09:20"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        group: 'C-1',
        name: 'ТакП.'
    }, {
        indexDay: 0,
        indexItem: 1,
        group: 'C-1-1',
        name: 'ТакП.'
    }, {
        indexDay: 2,
        indexItem: 0,
        group: 'C-2',
        name: 'ТакП.'
    }, {
        indexDay: 3,
        indexItem: 0,
        group: 'C-3',
        name: 'ТакП.'
    }, {
        indexDay: 3,
        indexItem: 1,
        group: 'C-4',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 0,
        group: 'C-5',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 1,
        group: 'C-6',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 2,
        group: 'C-7',
        name: 'ТакП.'
    }]
}, {
    times: {
        start: "08:00",
        end: "09:20"
    },
    items: [{
        indexDay: 0,
        indexItem: 0,
        group: 'C-1',
        name: 'ТакП.'
    }, {
        indexDay: 0,
        indexItem: 1,
        group: 'C-1-1',
        name: 'ТакП.'
    }, {
        indexDay: 2,
        indexItem: 0,
        group: 'C-2',
        name: 'ТакП.'
    }, {
        indexDay: 3,
        indexItem: 0,
        group: 'C-3',
        name: 'ТакП.'
    }, {
        indexDay: 3,
        indexItem: 1,
        group: 'C-4',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 0,
        group: 'C-5',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 1,
        group: 'C-6',
        name: 'ТакП.'
    }, {
        indexDay: 4,
        indexItem: 2,
        group: 'C-7',
        name: 'ТакП.'
    }]
}];

export default function (state = initial_state, action) {
    switch (action.type) {

        case types.MOVE: {
            const {source, target} = action.payload;

            const newState = state.slice();
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
                const copySource = Object.assign({}, newState[source.indexTimeItem].items[sourceIndex]),
                    copyTarget = Object.assign({}, newState[target.indexTimeItem].items[targetIndex]);
                delete newState[source.indexTimeItem].items[sourceIndex];
                delete newState[target.indexTimeItem].items[targetIndex];

                newState[source.indexTimeItem].items.push(copyTarget);
                newState[target.indexTimeItem].items.push(copySource);
            }

            return [
                Object.assign({}, newState[0]),
                Object.assign({}, newState[1]),
                Object.assign({}, newState[2]),
            ];
        }

        default:
            return state
    }
}