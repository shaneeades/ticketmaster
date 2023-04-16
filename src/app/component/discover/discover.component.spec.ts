import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { EventFilter } from 'src/app/api/EventFilter';
import { Observable, of } from 'rxjs';
import { EventsPage } from 'src/app/model/EventsPage';
import { EventService } from 'src/app/service/event.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  let mockEventService: any;

  beforeEach(async () => {
    mockEventService = jasmine.createSpyObj<EventService>('EventService', {
      eventSearch: of({
        page: {
          size: 0,
          totalElements: 0,
          totalPages: 1,
          number: 0,
        },
        events: [],
      }),
    });

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [InfiniteScrollModule],
      declarations: [DiscoverComponent],
      providers: [{ provide: EventService, useValue: mockEventService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DiscoverComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Discover Ticketmaster Events'
    );
  });

  it('should call the event service to find all events upon loading', () => {
    TestBed.createComponent(DiscoverComponent);
    expect(mockEventService.eventSearch).toHaveBeenCalledTimes(1);
  });
});
