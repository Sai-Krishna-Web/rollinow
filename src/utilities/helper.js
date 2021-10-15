import moment from 'moment';
import { imageBaseUrl } from 'utilities/constants';
export const formatDateTimeByFormatString = (dateTime, formatString = 'l LT', noUtc = false, noUnix = false) => {
    let formattedDateTime = dateTime;
    formattedDateTime = noUnix ? moment(formattedDateTime) : moment.unix(formattedDateTime / 1000);
    formattedDateTime = noUtc ? moment(formattedDateTime) : moment.utc(formattedDateTime);
    // formattedDateTime = formattedDateTime.format('YYYY-MM-DD HH:mm:SS');

    return moment(formattedDateTime).format(formatString);
};

export const tmdbLink = (link) => {
    if (link.startsWith('/t/p')) return imageBaseUrl + link;
    return link;
};
