import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  private eventsSignal = signal([
    { title: 'qwe', startDate: '2024-01-01T01:00', endDate: '2024-01-01T13:00' }
  ]);

  readonly events = this.eventsSignal.asReadonly();

  constructor() { }

  addEvent(item: any) {
    this.eventsSignal.update((ev) => [item, ...ev]);
  }
}
