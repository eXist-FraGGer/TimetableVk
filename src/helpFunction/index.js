import moment from 'moment';
import _ from 'lodash';

/**
 * Method for calculate easter day by year
 *
 * @param year
 * @return {*|moment.Moment}
 */
export const getEasterDayByYear = year => {
    const c = ((year % 19) * 19 + 15) % 30,
        a = year % 4,
        b = year % 7,
        d = (2 * a + 4 * b + 6 * c + 6) % 7,
        day = 4 + c + d;

    return day > 30 ? moment([year, 2, day]) : moment([year, 3, day]);
};

/**
 * Method for getting holidays in year
 *
 * @param year
 */
export const getHolidaysByYear = year => {
    const dates = [
        moment([year, 0, 1]),
        moment([year, 0, 7]),
        moment([year, 2, 8]),
        getEasterDayByYear(year).add(9, 'days'), // радуница вторник
        getEasterDayByYear(year).add(8, 'days'), // понедельник перед радуницей
        moment([year, 4, 1]),
        moment([year, 4, 9]),
        moment([year, 6, 3]),
        moment([year, 10, 7]),
        moment([year, 11, 25]),
    ];

    if (moment([year, 4, 9]).day() === 2) { // если 9 мая вторник, то и понедельник выходной
        dates.push(moment([year, 4, 8]));
    }

    return dates;
};

/**
 1 января – Новый год;
 7 января – Рождество Христово (православное Рождество);
 8 марта – День женщин;
 по календарю православной конфессии – Радуница;
 1 мая – Праздник труда;
 9 мая – День Победы;
 3 июля – День Независимости Республики Беларусь (День Республики);
 7 ноября – День Октябрьской революции;
 25 декабря – Рождество Христово (католическое Рождество).
 */

/**
 * Method for getting first Monday by month in a year
 *
 * @param year
 * @param month
 * @return {Moment|number}
 */
export const getFirstMondayByMonthInYear = (year, month) => {
    const first = moment([year, month, 1]);

    return first.day('Monday');

    /*
    if (first.day() > 5) {
        first.add(8 - first.day(), 'days');
    }

    return first.day('Monday');
    */
};

export const checkLessons = (lessons) => {
    lessons = _.map(lessons, lesson => Object.assign({}, lesson, {
        collision: { group: false, lesson: false, teacher: false, class: false, article: false }
    }));

    const lessonsByWeek = _.groupBy(lessons, 'indexWeek');
    let newLessons = [];

    _.each(lessonsByWeek, lessons => {
        const lessonsByTimeItem = _.groupBy(lessons, 'indexTimeItem');
        _.each(lessonsByTimeItem, lessons => {
            const lessonsByDay = _.groupBy(lessons, 'indexDay');
            _.each(lessonsByDay, lessons => {
                for (let i = 0; i < lessons.length; i++) {
                    let lesson = lessons[i];
                    const lessonsWithoutLesson = _.without(lessons, lesson);

                    if (_.find(lessonsWithoutLesson, { groupId: lesson.groupId })) {
                        lesson.collision.group = true;
                    }
                    if (_.find(lessonsWithoutLesson, { teacherId: lesson.teacherId })) {
                        lesson.collision.teacher = true;
                    }
                    if (_.find(lessonsWithoutLesson, { classNumber: lesson.classNumber })) {
                        lesson.collision.class = true;
                    }

                    newLessons.push(lesson);
                }
            });
        });
    });

    return lessons;
};
