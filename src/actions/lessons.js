import types from './types';

/**
 * Move lesson
 *
 * @param source
 * @param target
 * @param indexTimeItem
 * @return {{type: string, payload: {source: *, target: *, indexTimeItem: *}}}
 */
export function move(source, target, indexTimeItem) {
    return { type: types.MOVE, payload: { source, target, indexTimeItem } };
}
