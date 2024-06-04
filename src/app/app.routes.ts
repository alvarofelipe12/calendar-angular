import { Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';

export const routes: Routes = [
  { path: 'day/:year/:month/:day', component: DayComponent },
];
