import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Stats {
    confirmed: Int!
    deaths: Int!
    recovered: Int!
    vaccinated: Int!
    active: Int!
    newCases: Int!
    newDeaths: Int!
  }

  type Query {
    stats(timeline: String, country: String): Stats!
  }
`;
