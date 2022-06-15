import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import axios from 'axios';

import { mapCountryCode } from 'api/libs/util';
import {
  StatsData,
  StatsArgs,
  VaccinatedResponse,
  VaccinatedStatsArgs,
  VaccinatedStatsData,
  StatsCachedData,
} from './types';
import { mapCachedJson } from 'api/libs/util';
import { ParsedCsvToJson } from 'api/libs/types';

export const statsResolvers = {
  Query: {
    stats: async (
      _root: undefined,
      { timestamp, country }: StatsArgs
    ): Promise<StatsData> => {
      try {
        const returnObj: Partial<StatsData> = {};

        if (timestamp && !country) {
          throw new Error(
            'If specifying timestamp, you should also specify a country to filter data for.'
          );
        }

        if (country) {
          const { data } = await axios.get(
            `http://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${country}`
          );

          returnObj.confirmed = data[0].totalConfirmed;
          returnObj.deaths = data[0].totalDeaths;
          returnObj.recovered = data[0].totalRecovered;
          returnObj.active = data[0].activeCases;
        }

        if (timestamp) {
          const { data } = await axios.get(
            `http://api.coronatracker.com/v5/analytics/trend/country?countryCode=${country}&startDate=${timestamp.startDate}&endDate=${timestamp.endDate}`
          );

          returnObj.confirmed =
            data.slice(-1)[0].total_confirmed - data[0].total_confirmed;
          returnObj.deaths =
            data.slice(-1)[0].total_deaths - data[0].total_deaths;
          returnObj.recovered =
            data.slice(-1)[0].total_recovered - data[0].total_recovered;
        }

        const { data: globalData } = await axios.get(
          'https://api.coronatracker.com/v3/stats/worldometer/global'
        );

        if (!returnObj.hasOwnProperty('active')) {
          returnObj.active = globalData.totalActiveCases;
        }

        if (!country) {
          returnObj.confirmed = globalData.totalConfirmed;
          returnObj.deaths = globalData.totalDeaths;
          returnObj.recovered = globalData.totalRecovered;
        }

        returnObj.newCases = globalData.totalNewCases;
        returnObj.newDeaths = globalData.totalNewDeaths;

        return returnObj as StatsData;
      } catch (error) {
        throw new Error(`Failed to query data: ${error}`);
      }
    },
    statsVaccinated: async (
      _root: undefined,
      { country }: VaccinatedStatsArgs
    ): Promise<VaccinatedStatsData> => {
      let vaccinated: number;

      const { data: vaccinatedData } = await axios.get<VaccinatedResponse>(
        'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json'
      );

      if (country) {
        const threeLetterCountryCode = await mapCountryCode(country);

        const { data } = vaccinatedData.find(
          (element) => element.iso_code === threeLetterCountryCode
        );

        const totalCases = data.slice(-1)[0].total_vaccinations;

        vaccinated = totalCases;
      } else {
        vaccinated = vaccinatedData.reduce((accum, { data }) => {
          let total = data.slice(-1)[0].total_vaccinations;

          if (total) {
            return accum + total;
          }

          const healedDataWithVaccinations = data
            .slice(-10)
            .reverse()
            .find((el) => el.hasOwnProperty('total_vaccinations'));

          if (healedDataWithVaccinations) {
            return accum + healedDataWithVaccinations.total_vaccinations;
          } else {
            return accum;
          }
        }, 0);
      }

      return { vaccinated };
    },
    statsCached: async (): Promise<StatsCachedData[]> => {
      const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const fileName = `${yesterdayDate
        .getMonth()
        .toString()
        .padStart(2, '0')}-${yesterdayDate
        .getDate()
        .toString()
        .padStart(2, '0')}-${yesterdayDate.getFullYear()}.csv`;

      const csvStream = await axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${fileName}`,
        { responseType: 'stream' }
      );

      const appDir = path.dirname(require.main.filename);

      const csvPath = path.resolve(appDir, 'temp', fileName);

      try {
        fs.promises.stat(csvPath);

        const jsonArray = await csv().fromFile(csvPath);

        return mapCachedJson(jsonArray);
      } catch (error) {
        const writer = fs.createWriteStream(csvPath);

        csvStream.data.pipe(writer);

        const json: ParsedCsvToJson[] = await new Promise((resolve, reject) => {
          writer.on('close', async () => {
            const jsonArray = await csv().fromFile(csvPath);

            resolve(jsonArray);
          });

          writer.on('error', (error) => {
            reject(error);
          });
        });

        return mapCachedJson(json);
      }
    },
  },
};
