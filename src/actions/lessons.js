import types from './types';

/**
 * Move lesson
 *
 * @param source
 * @param target
 * @param indexTimeItem
 * @return {{type: string, payload: {source: *, target: *, indexTimeItem: *}}}
 */
export function move(source, target) {
    return { type: types.MOVE, payload: { source, target } };
}

export function changeGroup(lesson, newGroupId) {
    return { type: types.CHANGE_GROUP, payload: { lesson, newGroupId } };
}

export function changeClassNumber(lesson, newClassNumber) {
    return { type: types.CHANGE_CLASS_NUMBER, payload: { lesson, newClassNumber } };
}

export function changeTeacher(lesson, newTeacherId) {
    return { type: types.CHANGE_TEACHER, payload: { lesson, newTeacherId } };
}

export function changeLesson(lesson, newLessonId) {
    return { type: types.CHANGE_LESSON, payload: { lesson, newLessonId } };
}