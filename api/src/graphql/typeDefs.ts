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
    title: String!
  }

  type Query {
    stats(timeline: StatsDateInput, country: String): Stats!
    statsVaccinated(country: String): StatsVaccinated!
    news(country: String): [News]!
  }
`;
