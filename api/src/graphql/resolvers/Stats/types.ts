export interface StatsArgs {
  timeline: { startDate: string; endDate: string } | null; // maybe Moment
  country: string | null; // Already mapped to locale value from front-end
}

export interface VaccinatedStatsArgs {
  country: string | null;
}

export interface StatsData {
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  newCases: number;
  newDeaths: number;
}

export interface StatsCachedData {
  regionName: string;
  countryName: string;
  lat: number;
  lng: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
}

export interface VaccinatedStatsData {
  vaccinated: number;
}

export type VaccinatedResponse = Array<{
  country: string;
  iso_code: string;
  data: Array<{
    date: string;
    total_vaccinations: number;
    people_vaccinated: number;
    people_fully_vaccinated: number;
    daily_vaccinations_raw: number;
    daily_vaccinations: number;
    total_vaccinations_per_hundred: number;
    people_vaccinated_per_hundred: number;
    daily_vaccinations_per_million: number;
    daily_people_vaccinated: number;
    daily_people_vaccinated_per_hundred: number;
  }>;
}>;

export interface VaccinatedGlobalResponse {
  extents: {
    dateString: [string, string];
    noDosesTotal: [number, number];
    noDosesTotalPer100: [number, number];
    noDosesTotalPerCapita: [number, number];
  };
}
