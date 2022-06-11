import axios from 'axios';
import flatten from 'lodash.flatten';

import { Stats } from 'api/libs/types';
import { mapCountryCode } from 'api/libs/util';
import { StatsArgs, VaccinatedResponse } from './types';

export const statsResolvers = {
  Query: {
    stats: async (
      _root: undefined,
      { timeline, country }: StatsArgs
    ): Promise<Stats> => {
      try {
        const returnObj: Partial<Stats> = {};

        if (timeline && !country) {
          throw new Error(
            'If specifying timeline, you should also specify a country to filter data for.'
          );
        }

        const { data: vaccinatedData } = await axios.get<VaccinatedResponse>(
          'https://www.bloomberg.com/graphics/covid-vaccine-tracker-global-distribution/data/charts/global-historical-doses-total-rates.json'
        );

        if (country) {
          const threeLetterCountryCode = await mapCountryCode(country);

          const vaccinatedCountryData =
            vaccinatedData[
              threeLetterCountryCode as unknown as keyof typeof vaccinatedData
            ];

          const totalCases = vaccinatedCountryData.reduce(
            (accum, [, , number]) => accum + (number || 0),
            0
          );

          returnObj.vaccinated = totalCases;
        } else {
          returnObj.vaccinated = flatten(Object.values(vaccinatedData)).reduce(
            (accum, [, , number]) => accum + (number || 0),
            0
          );
        }

        if (timeline) {
          const { data } = await axios.get(
            `http://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${country}&startDate=${timeline[0]}&endDate=${timeline[1]}`
          );

          returnObj.confirmed =
            data[0].total_confirmed - data.slice(-1)[0].total_confirmed;
          returnObj.deaths =
            data[0].total_deaths - data.slice(-1)[0].total_deaths;
          returnObj.recovered =
            data[0].total_recovered - data.slice(-1)[0].total_recovered;
        }

        if (country && !timeline) {
          const { data } = await axios.get(
            `http://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${country}`
          );

          returnObj.confirmed = data[0].totalConfirmed;
          returnObj.deaths = data[0].totalDeaths;
          returnObj.recovered = data[0].totalRecovered;
        }

        const { data: globalData } = await axios.get(
          'https://api.coronatracker.com/v3/stats/worldometer/global'
        );

        returnObj.active = globalData.totalActiveCases;
        returnObj.newCases = globalData.totalNewCases;
        returnObj.newDeaths = globalData.totalNewDeaths;

        return returnObj as Stats;
      } catch (error) {
        throw new Error(`Failed to query data: ${error}`);
      }
    },
  },
};
