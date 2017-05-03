import types from './types';

/**
 * Change first data
 *
 * @param date
 * @returns {{type: null, text: *}}
 */
export function setDate(date) {
    return { type: types.SET_DATE, payload: date };
}
