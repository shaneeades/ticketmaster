import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventFilter } from '../api/EventFilter';
import { Observable, map, retry } from 'rxjs';
import { EventsPage } from '../model/EventsPage';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  // TODO: Move to config
  private readonly baseUrl = 'https://app.ticketmaster.com/discovery/v2/';
  // TODO: Move to config and add the apiKey parameter to all requests.
  private readonly apiKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

  /**
   * The API requires the Date/Time in ISO format, but without milliseconds.
   * @param dateTime as a Date object
   * @returns a string representation of the Date that the API will accept.
   */
  private formatDateTime(dateTime: Date): string {
    return dateTime.toISOString().split('.')[0] + 'Z';
  }

  eventSearch(
    filter: Partial<EventFilter>,
    pageNumber: number = 0
  ): Observable<EventsPage> {
    const url = `${this.baseUrl}events`;
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('apikey', this.apiKey)
      .append('pageNumber', pageNumber);
    if (filter.startDateTime) {
      queryParams = queryParams.append(
        'startDateTime',
        this.formatDateTime(filter.startDateTime)
      );
    }
    if (filter.endDateTime) {
      queryParams = queryParams.append(
        'endDateTime',
        this.formatDateTime(filter.endDateTime)
      );
    }
    if (filter.city) {
      queryParams = queryParams.append('city', filter.city);
    }
    if (filter.countryCode) {
      queryParams = queryParams.append('countryCode', filter.countryCode);
    }

    return this.http.get<any>(url, { params: queryParams }).pipe(
      map((response) => {
        return {
          page: response.page,
          events: response._embedded?.events,
        };
      }),
      retry(3) // retry a failed request up to 3 times
      // catchError((e) : this.handleError) // TODO: handle the error elegantly here
    );
  }
}
