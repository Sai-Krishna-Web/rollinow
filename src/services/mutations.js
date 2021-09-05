import { gql } from '@apollo/client';

export const GET_S3_SIGNED_URL = gql`
mutation ($key: String!, $contentType: String!) {
  getS3SignedURL(
    key:$key, 
    contentType:$contentType
  )
}
`;


export const ADD_SHOW_URL = gql`
    mutation($show:ShowCreateArgs!) {
            addShow(
                show:$show
            ){
                id
            }
}`;

export const ADD_CAST_URL = gql`
    mutation($cast:CastCreateInput!) {
            addCast(
                show:$show
            ){
                id
            }
}`;
