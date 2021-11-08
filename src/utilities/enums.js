import { searchShowsGQL, searchListsGQL, searchUsersGQL, searchCastGQL } from 'services/queries';

export const sectionPlace = {
    HOME: 'Home',
    DISCOVER: 'Discover',
    BOTH: 'Both',
    GENRE: 'Genre',
    LANGUAGE: 'Langauge',
    ARTIST: 'Artist',
    PLATFORM: 'Platform',
    SHOW: 'Show'
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
    USER: searchUsersGQL,
    CAST: searchCastGQL
};

export const sourceType = {
    Ads: 'Ads',
    Stream: 'Stream',
    Buy: 'Buy',
    Rent: 'Rent',
    Free: 'Free'
};

export const entityTypePath = {
    MOVIE: 'movies',
    TV: 'shows',
    SHOW: 'shows',
    SECTION: 'sections',
    CAST: 'casts'
};
