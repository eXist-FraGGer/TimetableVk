import moment from 'moment';
import types from '../actions/types';
import { getFirstMondayByMonthInYear, getHolidaysByYear } from '../helpFunction';
import _ from 'lodash';

const initial_state = {
    firstDate: getFirstMondayByMonthInYear(moment().year(), moment().month()),
    holidays: getHolidaysByYear(moment().year()),
    classNumbers: ['415', '410', '409', 'вк', 'парк', 'поле'],
    teachers: ['Машеро', 'Медведев', 'Жуков', 'Андрейчик', 'Осмоловский'],
    lessons: ['ТактП', 'ПодрД', 'ТСП', 'ОгнП', 'ВТоп', 'БР', 'УОА', 'СпП', 'ТехП', 'ИнжП', 'ИнжЗ'],
    groups: ['МО-1', 'МО-2', 'СО-1', 'СО-2', 'Р-1', 'АО', 'С-1', 'М-1', 'А-1', 'А-2', 'РО'],
    lessonTypes: ['Л', 'П', 'Г', 'ПП', 'ПК'],
    times: {
        0: { start: "8:00", end: "9:20" },
        1: { start: "9:35", end: "10:55" },
        2: { start: "14:35", end: "15:55" },
        3: { start: "16:10", end: "17:30" }
    },
    defaultGroupPosition: [{
        indexGroup: 0,
        indexDay: 0,
        indexTimeItem: 0,
        indexItem: 0
    },{
        indexGroup: 0,
        indexDay: 0,
        indexTimeItem: 1,
        indexItem: 0
    },{
        indexGroup: 0,
        indexDay: 2,
        indexTimeItem: 0,
        indexItem: 0
    },{
        indexGroup: 0,
        indexDay: 2,
        indexTimeItem: 1,
        indexItem: 0
    },{
        indexGroup: 1,
        indexDay: 0,
        indexTimeItem: 2,
        indexItem: 0
    },{
        indexGroup: 1,
        indexDay: 2,
        indexTimeItem: 2,
        indexItem: 0
    },{
        indexGroup: 1,
        indexDay: 0,
        indexTimeItem: 3,
        indexItem: 0
    },{
        indexGroup: 1,
        indexDay: 2,
        indexTimeItem: 3,
        indexItem: 0
    },{
        indexGroup: 2,
        indexDay: 1,
        indexTimeItem: 0,
        indexItem: 0
    },{
        indexGroup: 2,
        indexDay: 4,
        indexTimeItem: 0,
        indexItem: 0
    },{
        indexGroup: 2,
        indexDay: 1,
        indexTimeItem: 1,
        indexItem: 0
    },{
        indexGroup: 2,
        indexDay: 4,
        indexTimeItem: 1,
        indexItem: 0
    },{
        indexGroup: 3,
        indexDay: 4,
        indexTimeItem: 2,
        indexItem: 1
    },{
        indexGroup: 3,
        indexDay: 2,
        indexTimeItem: 2,
        indexItem: 2
    },{
        indexGroup: 3,
        indexDay: 4,
        indexTimeItem: 3,
        indexItem: 1
    },{
        indexGroup: 3,
        indexDay: 2,
        indexTimeItem: 3,
        indexItem: 2
    },{
        indexGroup: 4,
        indexDay: 0,
        indexTimeItem: 2,
        indexItem: 1
    },{
        indexGroup: 4,
        indexDay: 1,
        indexTimeItem: 2,
        indexItem: 3
    },{
        indexGroup: 4,
        indexDay: 0,
        indexTimeItem: 3,
        indexItem: 1
    },{
        indexGroup: 4,
        indexDay: 1,
        indexTimeItem: 3,
        indexItem: 3
    },{
        indexGroup: 5,
        indexDay: 0,
        indexTimeItem: 2,
        indexItem: 2
    },{
        indexGroup: 5,
        indexDay: 2,
        indexTimeItem: 2,
        indexItem: 1
    },{
        indexGroup: 5,
        indexDay: 0,
        indexTimeItem: 3,
        indexItem: 2
    },{
        indexGroup: 5,
        indexDay: 2,
        indexTimeItem: 3,
        indexItem: 1
    },{
        indexGroup: 6,
        indexDay: 0,
        indexTimeItem: 0,
        indexItem: 1
    },{
        indexGroup: 6,
        indexDay: 2,
        indexTimeItem: 0,
        indexItem: 1
    },{
        indexGroup: 6,
        indexDay: 0,
        indexTimeItem: 1,
        indexItem: 1
    },{
        indexGroup: 6,
        indexDay: 2,
        indexTimeItem: 1,
        indexItem: 1
    },{
        indexGroup: 7,
        indexDay: 1,
        indexTimeItem: 2,
        indexItem: 0
    },{
        indexGroup: 7,
        indexDay: 4,
        indexTimeItem: 2,
        indexItem: 0
    },{
        indexGroup: 7,
        indexDay: 1,
        indexTimeItem: 3,
        indexItem: 0
    },{
        indexGroup: 7,
        indexDay: 4,
        indexTimeItem: 3,
        indexItem: 0
    },{
        indexGroup: 8,
        indexDay: 1,
        indexTimeItem: 2,
        indexItem: 1
    },{
        indexGroup: 8,
        indexDay: 3,
        indexTimeItem: 2,
        indexItem: 0
    },{
        indexGroup: 8,
        indexDay: 1,
        indexTimeItem: 3,
        indexItem: 1
    },{
        indexGroup: 8,
        indexDay: 3,
        indexTimeItem: 3,
        indexItem: 0
    },{
        indexGroup: 9,
        indexDay: 1,
        indexTimeItem: 2,
        indexItem: 2
    },{
        indexGroup: 9,
        indexDay: 3,
        indexTimeItem: 2,
        indexItem: 1
    },{
        indexGroup: 9,
        indexDay: 1,
        indexTimeItem: 3,
        indexItem: 2
    },{
        indexGroup: 9,
        indexDay: 3,
        indexTimeItem: 3,
        indexItem: 1
    },{
        indexGroup: 10,
        indexDay: 3,
        indexTimeItem: 2,
        indexItem: 2
    },{
        indexGroup: 10,
        indexDay: 4,
        indexTimeItem: 2,
        indexItem: 2
    },{
        indexGroup: 10,
        indexDay: 3,
        indexTimeItem: 3,
        indexItem: 2
    },{
        indexGroup: 10,
        indexDay: 4,
        indexTimeItem: 3,
        indexItem: 2
    }]
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case types.SET_STATE_TIME_TABLE: {
            const { firstDate, classNumbers, teachers, lessons, groups, times } = action.payload;

            const date = moment(firstDate);

            return {
                ...state,
                firstDate: date,
                holidays: getHolidaysByYear(date.year()),
                classNumbers, teachers, lessons, groups, times
            }
        }

        case types.SET_DATE: {
            const date = action.payload;

            return {
                ...state,
                firstDate: moment(date),
                holidays: getHolidaysByYear(date.year())
            };
        }

        case types.CHANGE_TIME: {
            const { indexTimeItem, times } = action.payload;

            return {
                ...state,
                times: {
                    ...state.times,
                    [indexTimeItem]: times
                }
            };
        }

        case types.DELETE_TIME_ITEM: {
            const { indexTimeItem } = action.payload;

            const newTimes = Object.assign({}, state.times);
            delete newTimes[`${indexTimeItem}`];

            return {
                ...state,
                times: newTimes
            };
        }

        case types.ADD_TIME_ITEM: {
            let newId = 0;
            _.each(state.times, (times, index) => {
                newId = index > newId ? index : newId;
            });

            return {
                ...state,
                times: {
                    ...state.times,
                    [newId + 1]: action.payload
                }
            }
        }

        case types.SET_SETTINGS: {
            return {
                ...state,
                ...action.payload
            }
        }

        case types.ADD_DEFAULT_GROUP: {
            return {
                ...state,
                defaultGroupPosition: [
                    ...state.defaultGroupPosition,
                    {
                        ...action.payload
                    }
                ]
            }
        }

        case types.DELETE_DEFAULT_GROUP: {
            return {
                ...state,
                defaultGroupPosition: [
                    ..._.without(state.defaultGroupPosition, state.defaultGroupPosition[action.payload])
                ]
            }
        }

        default: return state
    }
}
