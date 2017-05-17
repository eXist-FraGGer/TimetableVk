import types from './types';

/**
 * Move lesson
 *
 * @param source
 * @param target
 * @returns {{type: string, payload: {source: *, target: *}}}
 */
export const move = (source, target) => {
    return { type: types.MOVE, payload: { source, target } };
};

/**
 * Change group lesson
 *
 * @param lesson
 * @param newGroupId
 * @returns {{type: string, payload: {lesson: *, newGroupId: *}}}
 */
export const changeGroup = (lesson, newGroupId) => {
    return { type: types.CHANGE_GROUP, payload: { lesson, newGroupId } };
};

/**
 * Change class lesson
 *
 * @param lesson
 * @param newClassNumber
 * @returns {{type: string, payload: {lesson: *, newClassNumber: *}}}
 */
export const changeClassNumber = (lesson, newClassNumber) => {
    return { type: types.CHANGE_CLASS_NUMBER, payload: { lesson, newClassNumber } };
};

/**
 * Change teacher lesson
 *
 * @param lesson
 * @param newTeacherId
 * @returns {{type: string, payload: {lesson: *, newTeacherId: *}}}
 */
export const changeTeacher = (lesson, newTeacherId) => {
    return { type: types.CHANGE_TEACHER, payload: { lesson, newTeacherId } };
};

/**
 * Change name lesson
 *
 * @param lesson
 * @param newLessonId
 * @returns {{type: string, payload: {lesson: *, newLessonId: *}}}
 */
export const changeLesson = (lesson, newLessonId) => {
    return { type: types.CHANGE_LESSON, payload: { lesson, newLessonId } };
};

/**
 * Change article lesson
 *
 * @param lesson
 * @param newArticle
 * @returns {{type: string, payload: {lesson: *, newArticle: *}}}
 */
export const changeArticle = (lesson, newArticle) => {
    return { type: types.CHANGE_ARTICLE, payload: { lesson, newArticle } }
};

/**
 * Add lesson
 *
 * @param lesson
 * @returns {{type: string, payload: *}}
 */
export const addLesson = (lesson) => {
    return { type: types.ADD, payload: lesson }
};

/**
 * delete lesson
 *
 * @param lesson
 * @returns {{type: string, payload: *}}
 */
export const deleteLesson = (lesson) => {
    return { type: types.DELETE, payload: lesson };
};
