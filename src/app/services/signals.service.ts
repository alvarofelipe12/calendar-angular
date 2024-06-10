import { Injectable, signal } from '@angular/core';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  eventsSignal = signal<IEvent[] | undefined>([
    { title: 'qwe', startDate: '2024-06-10T01:00', endDate: '2024-06-10T13:00' }
  ]);

  constructor() { }

  addEvent(item: any) {
    this.eventsSignal.update((ev) => [item, ...ev!]);
  }

  removeEvent(eventTitle: string) {
    this.eventsSignal.update(evts => {
      return [...evts!.filter(i => i.title !== eventTitle)];
    });
  }
}
