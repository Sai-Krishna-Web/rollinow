import { searchShowsGQL, searchListsGQL, searchUsersGQL } from 'services/queries';
export const sectionPlace = {
    HOME: 'Home',
    DISCOVER: 'Discover',
    BOTH: 'Both'
};

export const sectionType = {
    MOVIE: 'MOVIE',
    TV: 'TV',
    SHOW: 'SHOW',
    LIST: 'LIST',
    CAST: 'CAST',
    USER: 'USER'
};

export const searchQueryType = {
    MOVIE: searchShowsGQL,
    TV: searchShowsGQL,
    SHOW: searchShowsGQL,
    LIST: searchListsGQL,
    USER: searchUsersGQL
};
