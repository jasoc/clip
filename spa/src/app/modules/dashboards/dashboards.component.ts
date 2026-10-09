import { ChangeDetectionStrategy, Component, effect, inject, model, viewChild } from '@angular/core';
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
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatSortModule, RouterModule],
  styleUrls: ['dashboards.component.scss'],
  templateUrl: 'dashboards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly dashboardService = inject(DashboardService);
  private readonly sort = viewChild(MatSort);

  readonly displayedColumns: string[] = ['name', 'actions'];
  readonly dataSource = new MatTableDataSource();

  constructor() {
    this.loadDashboards();

    effect(() => {
      const s = this.sort();
      if (s) {
        this.dataSource.sort = s;
      }
    });
  }

  private async loadDashboards() {
    const data = await this.dashboardService.GetDashboards();
    this.dataSource.data = data;
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
