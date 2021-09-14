import moment from 'moment';

export const formatDateTimeByFormatString = (dateTime, formatString = 'l LT', noUtc = false) => {
    let formattedDateTime = noUtc ? moment(dateTime) : moment.utc(dateTime);
    // formattedDateTime = formattedDateTime.format('YYYY-MM-DD HH:mm:SS');

    return moment(formattedDateTime).format(formatString);
};
