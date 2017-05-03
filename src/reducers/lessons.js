const initial_state = {
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
};

export default function (state = initial_state, action) {
    switch (action.type) {

        default:
            return state
    }
}