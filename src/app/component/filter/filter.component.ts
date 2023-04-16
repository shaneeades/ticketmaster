import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EventFilter } from 'src/app/api/EventFilter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() onFilterChange: EventEmitter<EventFilter> = new EventEmitter();

  filterForm = new FormGroup({
    city: new FormControl(),
    countryCode: new FormControl(),
    startDateTime: new FormControl(),
    endDateTime: new FormControl(),
  });

  ngOnInit() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(
          (prev, curr) =>
            prev.city === curr.city &&
            prev.countryCode === curr.countryCode &&
            prev.startDateTime === curr.startDateTime &&
            prev.endDateTime === curr.endDateTime
        )
      )
      .subscribe((formValue) => {
        if (this.filterForm.valid) {
          this.onFilterChange.emit({
            city: formValue.city,
            countryCode: formValue.countryCode,
            startDateTime: formValue.startDateTime
              ? new Date(formValue.startDateTime)
              : null,
            endDateTime: formValue.endDateTime
              ? new Date(formValue.endDateTime)
              : null,
          });
        }
      });
  }
}
