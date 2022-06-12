import { gql } from 'apollo-boost';

export const STATS = gql`
  query Stats($country: String, $timeline: StatsDateInput) {
    stats(country: $country, timeline: $timeline) {
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
