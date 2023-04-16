import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  combineLatestWith,
  switchMap,
  tap,
} from 'rxjs';
import { EventDetail } from 'src/app/model/Event';
import { EventFilter } from 'src/app/api/EventFilter';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly filter$ = new BehaviorSubject<EventFilter>({});
  private readonly firstPageNumber = 0;
  private readonly pageNumber$ = new BehaviorSubject<number>(
    this.firstPageNumber
  );
  events: EventDetail[] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  private isLastPage: boolean = false;

  constructor(private eventsService: EventService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.filter$
        .pipe(
          combineLatestWith(this.pageNumber$),
          tap(() => {
            this.isLoading = true;
            this.isError = false;
          }),
          switchMap(([filter, pageNumber]) =>
            this.eventsService.eventSearch(filter, pageNumber)
          )
        )
        .subscribe({
          next: (eventsPage) => {
            if (eventsPage.events) {
              this.events = this.events.concat(eventsPage.events);
            }
            this.isLastPage =
              eventsPage.page.number + 1 >= eventsPage.page.totalPages;
            this.isLoading = false;
          },
          error: (error) => {
            this.isError = true;
            this.isLoading = false;
          },
        })
    );
  }

  /**
   * Handle The user changing the filter.
   * @param newFilter
   */
  filter(newFilter: EventFilter) {
    this.events = [];
    this.isLastPage = false;
    this.pageNumber$.next(this.firstPageNumber);
    this.filter$.next(newFilter);
  }

  /**
   * Fetch the next page of events on scroll.
   */
  onScroll(): void {
    if (!this.isLastPage) {
      this.pageNumber$.next(this.pageNumber$.value + 1);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
