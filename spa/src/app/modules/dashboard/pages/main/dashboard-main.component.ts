import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';

@Component({
  selector: 'clip-dashboard-main',
  styleUrls: ['dashboard-main.component.scss'],
  templateUrl: 'dashboard-main.component.html',
})
export class DashboardMainComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'columns', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(private dashboardService: DashboardService) {}
  
  async ngOnInit() {
    const data = this.dataSource.data;
    data.push(...(await this.dashboardService.getAll()));
    this.dataSource.data = data;
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}