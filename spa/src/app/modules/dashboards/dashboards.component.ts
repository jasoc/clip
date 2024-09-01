import { AfterViewInit, Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'clip-dashboards',
  standalone: true,
  providers: [DashboardService],
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatIconModule, MatSortModule, RouterModule],
  styleUrls: ['dashboards.component.scss'],
  templateUrl: 'dashboards.component.html',
})
export class DashboardsComponent implements OnInit, AfterViewInit {
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource();

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    const data = this.dataSource.data;
    data.push(...(await this.dashboardService.GetDashboards()));
    this.dataSource.data = data;
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  newDashboard() {
    this.dialog
      .open(NewDashboardDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result !== undefined) {
          this.dashboardService.CreateDashboard({
            name: result,
            json_grid: '',
          });
        }
      });
  }
}

@Component({
  selector: 'clip-new-dashboar-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  template: `
    <h2 mat-dialog-title>New dashboard</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Dashboard name</mat-label>
        <input matInput [(ngModel)]="animal" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
      <button mat-button [mat-dialog-close]="animal()" cdkFocusInitial>Confirm</button>
    </mat-dialog-actions>
  `,
})
export class NewDashboardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewDashboardDialogComponent>);
  readonly animal = model();

  onClose(): void {
    this.dialogRef.close();
  }
}
