import { Component, Input } from '@angular/core';
import { EventDetail } from 'src/app/model/Event';
import { Venue } from 'src/app/model/Venue';

@Component({
  selector: 'app-event-row',
  templateUrl: './event-row.component.html',
  styleUrls: ['./event-row.component.css'],
})
export class EventRowComponent {
  @Input() event!: EventDetail;
  venue: Venue | undefined;

  ngOnInit(): void {
    this.venue = this.event._embedded?.venues[0];
  }
}
