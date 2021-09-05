import { gql } from '@apollo/client';

export const getLanguageListGQL = gql`query {
    getLanguagesList{
      language
    }
  }`;
