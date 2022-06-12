import { CountryCode } from './enums';

export interface Filters {
  country: CountryCode;
  timestamp: { startDate: string; endDate: string };
}
