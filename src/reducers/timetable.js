import moment from 'moment';
import types from '../actions/types';
import { getFirstMondayByMonthInYear, getHolidaysByYear } from '../helpFunction';

const initial_state = {
    firstDate: getFirstMondayByMonthInYear(moment().year(), moment().month()),
    holidays: getHolidaysByYear(moment().year()),
    classNumbers: ['415', '410', '409', 'вк', 'парк', 'поле'],
    teachers: ['Машеро', 'Медведев', 'Жуков', 'Андрейчик', 'Осмоловский'],
    lessons: ['ТактП', 'ПодрД', 'ТСП', 'ОгнП', 'ВТоп', 'БР', 'УОА', 'СпП', 'ТехП', 'ИнжП', 'ИнжЗ'],
    groups: ['МО-1', 'МО-2', 'СО-1', 'СО-2', 'Р-1', 'АО', 'С-1', 'М-1', 'А-1', 'А-2', 'РО']
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case types.SET_DATE: {
            const date = action.payload;

            return {
                ...state,
                firstDate: getFirstMondayByMonthInYear(date.year(), date.month()),
                holidays: getHolidaysByYear(date.year())
            };
        }

        default: return state
    }
}
