import { Moment } from 'moment';

export interface Filters {
  country: string;
  vaccinated: boolean;
  time: Moment;
}
