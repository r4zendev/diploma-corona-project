import { CountryCode } from './enums';

export interface Filters {
  country: CountryCode;
  timestamp: { startDate: string; endDate: string };
}

export interface CovidInfoByCountryResponse {
  countryCode: string;
  country: string;
  lat: number;
  lng: number;
  totalConfirmed: number;
}
