import {
    searchShowsGQL,
    searchListsGQL,
    searchUsersGQL,
    searchCastGQL,
    searchLanguageListGQL,
    searchGenresGQL,
    searchPlatformsGQL
} from 'services/queries';

export const sectionPlace = {
    HOME: 'HOME',
    DISCOVER: 'DISCOVER',
    BOTH: 'BOTH',
    GENRE: 'GENRE',
    LANGUAGE: 'LANGUAGE',
    ARTIST: 'ARTIST',
    PLATFORM: 'PLATFORM',
    SHOW: 'SHOW'
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
    CAST: searchCastGQL,
    LANGUAGE: searchLanguageListGQL,
    ARTIST: searchCastGQL,
    GENRE: searchGenresGQL,
    PLATFORM: searchPlatformsGQL
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
