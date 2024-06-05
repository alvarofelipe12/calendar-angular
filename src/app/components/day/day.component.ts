import { Component, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { IEvent } from '../../interfaces/event.interface';
import { SignalsService } from '../../services/signals.service';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {
  day = '';
  month = '';
  year = '';
  events: IEvent[] | undefined;
  constructor(
    private route: ActivatedRoute,
    private signalsService: SignalsService
  ) { }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = params['day'];
      this.month = params['month'];
      this.year = params['year'];
      const date = `${this.day}-${Number(this.month) - 1}-${this.year}`;
      this.events = computed(() => this.signalsService.eventsSignal()!.find(i => i.startDate.includes(date)));
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    if (this.events && this.events.length) {
      moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    }
  }
}
