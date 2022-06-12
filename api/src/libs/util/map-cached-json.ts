import { StatsCachedData } from 'api/graphql/resolvers/Stats/types';
import { ParsedCsvToJson } from '../types';

export function mapCachedJson(json: ParsedCsvToJson[]): StatsCachedData[] {
  return json.map((row) => ({
    regionName: row.Province_State,
    countryName: row.Country_Region,
    lat: +row.Lat,
    lng: +row.Long_,
    confirmed: +row.Confirmed || 0,
    deaths: +row.Deaths || 0,
    recovered: +row.Recovered || 0,
    active: +row.Active || 0,
  }));
}
