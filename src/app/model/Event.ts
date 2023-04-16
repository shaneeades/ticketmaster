import { Venue } from './Venue';

export interface EventStartDate {
  localDate: string;
  localTime: string;
}

export interface EventDate {
  start: EventStartDate;
}

export interface EmbeddedEventDetail {
  venues: Venue[];
}

export interface EventDetail {
  id: string;
  name: string;
  url: string;
  info: string;
  _embedded: EmbeddedEventDetail;
  dates: EventDate;
}
