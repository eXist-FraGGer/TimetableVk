import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import timetable from './timetable';
import lessons from './lessons';

export default combineReducers({
    routing: routerReducer,
    timetable,
    lessons,
});
