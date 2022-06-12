import { gql } from 'apollo-boost';

export const GET_COUNTRY_CODE_MAP = gql`
  query GetCountryCode {
    getCountryCodeMap {
      countryName
      countryCode
    }
  }
`;
