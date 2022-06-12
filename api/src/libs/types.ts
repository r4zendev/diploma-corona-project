export interface Stats {
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  newCases: number;
  newDeaths: number;
  vaccinated: number;
}

export enum NewsType {
  REDDIT = 'Reddit Post',
  NYT = 'New York Times Article',
}

export interface ParsedCsvToJson {
  FIPS?: string;
  Admin2?: string;
  Province_State?: string;
  Country_Region: string;
  Last_Update: string;
  Lat: string;
  Long_: string;
  Confirmed: string;
  Deaths: string;
  Recovered: string;
  Active: string;
  Combined_Key: string;
  Incident_Rate: string;
  Case_Fatality_Ratio: string;
}
