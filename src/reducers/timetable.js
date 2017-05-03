import moment from 'moment';
import types from '../actions/types';
import { getFirstMondayByMonthInYear, getHolidaysByYear } from '../helpFunction';

const initial_state = {
    firstDate: getFirstMondayByMonthInYear(moment().year(), moment().month()),
    holidays: getHolidaysByYear(moment().year())
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case types.SET_DATE: {
            const date = action.payload;

            return {
                firstDate: getFirstMondayByMonthInYear(date.year(), date.month()),
                holidays: getHolidaysByYear(date.year())
            };
        }

        default: return state
    }
}
