import { gql } from '@apollo/client';

export const GET_S3_SIGNED_URL = gql`
    mutation ($key: String!, $contentType: String!) {
        getS3SignedURL(key: $key, contentType: $contentType)
    }
`;

//shows
export const ADD_SHOW_URL = gql`
    mutation ($show: ShowCreateArgs!) {
        addShow(show: $show) {
            id
            languageId
        }
    }
`;

export const UPDATE_SHOW_URL = gql`
    mutation ($show: ShowUpdateArgs!) {
        updateShow(show: $show) {
            id
            languageId
        }
    }
`;

export const DELETE_SHOW = gql`
    mutation ($id: String!) {
        deleteShow(id: $id) {
            id
        }
    }
`;

//cats
export const ADD_CAST_URL = gql`
    mutation ($cast: CastCreateInput!) {
        addCast(cast: $cast) {
            id
        }
    }
`;

export const DELETE_CAST = gql`
    mutation ($id: Float!) {
        deleteCast(id: $id) {
            id
        }
    }
`;

export const UPDATE_CAST_URL = gql`
    mutation ($cast: CastUpdateInput!) {
        updateCast(cast: $cast) {
            id
        }
    }
`;

//sections
export const CREATE_SECTION_URL = gql`
    mutation ($id: Float, $section: SectionInput!) {
        createSection(id: $id, section: $section) {
            id
        }
    }
`;

export const CREATE_SECTION_ENTRY_URL = gql`
    mutation ($id: Float, $sectionEntry: SectionEntryInput!) {
        createSectionEntry(id: $id, sectionEntry: $sectionEntry) {
            id
        }
    }
`;

export const DELETE_SECTION = gql`
    mutation ($id: Float!) {
        deleteSection(id: $id) {
            id
        }
    }
`;

export const DELETE_SECTION_ETRY = gql`
    mutation ($id: Float!) {
        deleteSectionEntry(id: $id) {
            id
        }
    }
`;

//charcters
export const ADD_CHARACTER_URL = gql`
    mutation ($character: CharacterCreateArgs!) {
        addCharacter(character: $character) {
            id
        }
    }
`;

export const UPDATE_CHARACTER_URL = gql`
    mutation ($character: CharacterUpdateArgs!) {
        updateCharacter(character: $character) {
            id
        }
    }
`;

export const DELETE_CHARACTER_URL = gql`
    mutation ($id: String!) {
        deleteCharacter(id: $id) {
            id
        }
    }
`;

//language
export const ADD_SHOW_LANGUAGE = gql`
    mutation ($showId: String!, $language: String!) {
        addLanguageToShow(showId: $showId, language: $language) {
            id
        }
    }
`;

//watch source
export const ADD_WATCH_SOURCE_URL = gql`
    mutation ($showId: String!, $watch: WatchCreateInput!) {
        addWatch(showId: $showId, watch: $watch) {
            id
        }
    }
`;

export const UPDATE_WATCH_SOURCE_URL = gql`
    mutation ($id: String!, $showId: String!, $watch: WatchCreateInput!) {
        updateWatch(id: $id, showId: $showId, watch: $watch) {
            id
        }
    }
`;

//Genres
export const UPDATE_GENRES_URL = gql`
    mutation ($remove: Boolean = false, $showId: String!, $genre: String!) {
        updateGenres(remove: $remove, showId: $showId, genre: $genre) {
            id
        }
    }
`;

export const ADD_PLATFORM_URL = gql`
    mutation ($source: SourceCreateArgs!) {
        addSource(source: $source) {
            source
        }
    }
`;

//seasons
export const ADD_SEASON_URL = gql`
    mutation ($showId: String!, $season: SeasonCreateArgs!) {
        addSeason(showId: $showId, season: $season) {
            id
        }
    }
`;

export const UPDATE_SEASON_URL = gql`
    mutation ($showId: String!, $season: SeasonUpdateArgs!) {
        updateSeason(showId: $showId, season: $season) {
            id
        }
    }
`;
