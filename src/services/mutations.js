import { gql } from '@apollo/client';

export const GET_S3_SIGNED_URL = gql`
    mutation ($key: String!, $contentType: String!) {
        getS3SignedURL(key: $key, contentType: $contentType)
    }
`;

export const ADD_SHOW_URL = gql`
    mutation ($show: ShowCreateArgs!) {
        addShow(show: $show) {
            id
        }
    }
`;

export const ADD_CAST_URL = gql`
    mutation ($cast: CastCreateInput!) {
        addCast(cast: $cast) {
            id
        }
    }
`;

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

export const DELETE_CAST = gql`
    mutation ($id: Float!) {
        deleteArtist(id: $id) {
            id
        }
    }
`;

export const DELETE_SHOW = gql`
    mutation ($id: Float!) {
        deleteShow(id: $id) {
            id
        }
    }
`;
