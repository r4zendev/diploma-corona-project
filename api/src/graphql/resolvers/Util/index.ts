import { getCountryCodeMap } from 'api/libs/util';
import { CountryCodeMap } from './types';

export const utilResolvers = {
  Query: {
    getCountryCodeMap: async (): Promise<CountryCodeMap[]> => {
      return getCountryCodeMap();
    },
  },
};
