import { gql } from 'apollo-boost';

export const STATS = gql`
  query Stats($country: String, $timestamp: StatsDateInput) {
    stats(country: $country, timestamp: $timestamp) {
      confirmed
      deaths
      recovered
      active
      newCases
      newDeaths
    }
  }
`;

export const STATS_VACCINATED = gql`
  query StatsVaccinated($country: String) {
    statsVaccinated(country: $country) {
      vaccinated
    }
  }
`;

export const STATS_CACHED = gql`
  query StatsCached {
    statsCached {
      regionName
      countryName
      lat
      lng
      confirmed
      deaths
      recovered
      active
    }
  }
`;
