import { EventDetail } from './Event';
import { Page } from './Page';

export interface EventsPage {
  page: Page;
  events: EventDetail[];
}
