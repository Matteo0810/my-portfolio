import moment from 'moment/min/moment-with-locales';

/**
 * @description transform a date to a locale date
 * @param {String|Date} date a provided date
 * @return {String}  the date in a local format
 */
function toLocaleDate(date) {
    const locale = navigator.language.substring(0, 2) || import.meta.env.VITE_FALLBACK_LANG;
    if(date instanceof String)
        date = new Date(date);
    moment.locale(locale);
    return moment(date).format("MMMM YYYY");
}

export {
    toLocaleDate
}