import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { IEvent } from '../../interfaces/event.interface';
import { SignalsService } from '../../services/signals.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatIconModule, CommonModule, MatGridListModule],
  providers: [DatePipe],
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
      const date = new Date(`${this.year}-${this.month}-${this.day}`);
      this.events = this.signalsService.eventsSignal()!.filter(
        i => this.sameDay(new Date(i.startDate), date) || this.sameDay(new Date(i.endDate), date)
      );
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    if (this.events && this.events.length) {
      moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    }
  }

  sameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  delete(title: string) {
    this.signalsService.removeEvent(title);
  }
}
