import { gql } from '@apollo/client';

export const getLanguageListGQL = gql`
    query {
        getLanguagesList {
            language
        }
    }
`;

export const getSectionsListGQL = gql`
    query allSections($skip: Float = 0, $take: Float = 20, $search: String = "") {
        allSections(skip: $skip, take: $take, search: $search) {
            hits
            data {
                id
                title
                type
                place
                shown
                startTime
                endTime
            }
        }
    }
`;

export const searchShowsGQL = gql`
    query searchShows($skip: Float = 0, $take: Float = 20, $type: String, $query: String = "") {
        searchShows(take: $take, skip: $skip, type: $type, query: $query) {
            hits
            data {
                id
                title
            }
        }
    }
`;

export const searchListsGQL = gql`
    query searchLists($skip: Float = 0, $take: Float = 20, $query: String = "") {
        searchLists(take: $take, skip: $skip, query: $query) {
            hits
            data {
                id
                name
            }
        }
    }
`;

export const searchUsersGQL = gql`
    query searchUsers($skip: Float = 0, $take: Float = 20, $query: String = "") {
        searchUsers(take: $take, skip: $skip, query: $query) {
            hits
            data {
                id
                name
            }
        }
    }
`;

export const searchCastGQL = gql`
    query searchArtists($skip: Float = 0, $take: Float = 20, $query: String = "") {
        searchArtists(take: $take, skip: $skip, query: $query) {
            hits
            data {
                id
                name
            }
        }
    }
`;

export const getSectionEntriesGQL = gql`
    query section($id: Float!) {
        section(id: $id) {
            id
            title
            sectionEntries {
                id
                hidden
                sequence
                updatedAt
                showId
                userId
                listId
                castId
                cast {
                    id
                    name
                }
                show {
                    id
                    title
                }
                list {
                    id
                    name
                }
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const getSectionGQL = gql`
    query section($id: Float!) {
        section(id: $id) {
            title
            type
            place
            shown
            startTime
            endTime
            remark
            description
            sequence
        }
    }
`;

export const getCastListGQL = gql`
    query searchArtists($skip: Float = 0, $take: Float = 20, $query: String = "") {
        searchArtists(take: $take, skip: $skip, query: $query) {
            hits
            data {
                id
                name
                entityId
                biography
                thumbnail
            }
        }
    }
`;

export const getShowsListGQL = gql`
    query searchShows($skip: Float = 0, $take: Float = 20, $type: String = "TV", $query: String = "") {
        searchShows(take: $take, skip: $skip, type: $type, query: $query) {
            hits
            data {
                id
                title
                language
                inFavorites
                releaseDate
                isIndianOTT
            }
        }
    }
`;

export const getMoviesListGQL = gql`
    query searchShows($skip: Float = 0, $take: Float = 20, $type: String = "MOVIE", $query: String = "") {
        searchShows(take: $take, skip: $skip, type: $type, query: $query) {
            hits
            data {
                id
                title
                language
                inFavorites
                releaseDate
                isIndianOTT
            }
        }
    }
`;

export const getShowGQL = gql`
    query getShow($id: String!) {
        getShow(id: $id) {
            id
            title
            description
            releaseDate
            keywords
            languageId
            backdropUrl
            thumbnailUrl
            trailerUrl
            duration
            tagline
            isIndianOTT
            type
        }
    }
`;

export const getShowCharactersGQL = gql`
    query getShow($id: String!) {
        getShow(id: $id) {
            id
            characters {
                id
                character
                cast {
                    id
                    name
                }
            }
        }
    }
`;
