import types from './types';

/**
 * Change first data
 *
 * @param date
 * @returns {{type: string, payload: *}}
 */
export const setDate = (date) => {
    return { type: types.SET_DATE, payload: date };
};

/**
 * set state
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
export const setStateTimeTable = data => {
    return { type: types.SET_STATE_TIME_TABLE, payload: data };
};

/**
 * Change time
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
export const changeTime = data => {
    return { type: types.CHANGE_TIME, payload: data };
};

/**
 * Delete Time Item
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
export const deleteTimeItem = data => {
    return { type: types.DELETE_TIME_ITEM, payload: data };
};

/**
 * Add Time Item
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
export const addTimeItem = data => {
    return { type: types.ADD_TIME_ITEM, payload: data };
};
