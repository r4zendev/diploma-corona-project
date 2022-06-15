import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Stats {
    confirmed: Float!
    deaths: Float!
    recovered: Float!
    active: Float!
    newCases: Float!
    newDeaths: Float!
  }

  type StatsVaccinated {
    vaccinated: Float!
  }

  input StatsDateInput {
    startDate: String!
    endDate: String!
  }

  type News {
    type: String!
    title: String!
    url: String!
    createdDate: Int!
    imageUrl: String!
    byString: String!
  }

  type StatsCached {
    regionName: String
    countryName: String!
    lat: Float!
    lng: Float!
    confirmed: Float!
    deaths: Float!
    recovered: Float!
    active: Float!
  }

  type CountryCodeMap {
    countryName: String!
    countryCode: String!
  }

  type Query {
    stats(timestamp: StatsDateInput, country: String): Stats!
    statsVaccinated(country: String): StatsVaccinated!
    statsCached: [StatsCached]!
    news: [News]!
    getCountryCodeMap: [CountryCodeMap]!
  }
`;
