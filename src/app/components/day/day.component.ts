import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

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
  events = [
    { title: 'qwe', startDate: '2024-01-01T01:00', endDate: '2024-01-01T13:00' }
  ];
  constructor(private route: ActivatedRoute) { }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = params['day'];
      this.month = params['month'];
      this.year = params['year'];
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
  }
}
