import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEventComponent } from './components/add-event/add-event.component';
import { SignalsService } from './services/signals.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    RouterOutlet,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    CommonModule,
    MatGridListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selected: Date | null = new Date();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private signalsService: SignalsService,
  ) { }

  ngOnInit(): void {
    this.onSelect(this.selected!);
  }

  public onSelect(event: Date) {
    console.log(event);
    const month = event.getUTCMonth() + 1; // months from 1-12
    const day = event.getUTCDate();
    const year = event.getUTCFullYear();
    this.router.navigate(['/day', year, month, day]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.signalsService.addEvent(result);
    });
  }
}
