import moment from 'moment';

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
export const getHolidaysByYear = year => [
    moment([year, 0, 1]),
    moment([year, 0, 7]),
    moment([year, 2, 8]),
    getEasterDayByYear(year).add(9, 'days'), // радуница
    moment([year, 4, 1]),
    moment([year, 4, 9]),
    moment([year, 6, 3]),
    moment([year, 10, 7]),
    moment([year, 11, 25]),
];

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