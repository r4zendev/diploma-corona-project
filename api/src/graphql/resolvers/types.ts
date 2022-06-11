export interface StatsArgs {
  timeline: [string, string] | null; // maybe Moment
  country: string | null; // Already mapped to locale value from front-end
}

export type VaccinatedResponse = Record<
  string,
  Array<[string, number | null, number | null]>
>;
