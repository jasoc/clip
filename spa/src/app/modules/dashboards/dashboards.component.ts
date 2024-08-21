import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'clip-dashboards',
  standalone: true,
  providers: [DashboardService],
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
  ],
  styleUrls: ['dashboards.component.scss'],
  templateUrl: 'dashboards.component.html',
})
export class DashboardsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource();

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    const data = this.dataSource.data;
    data.push(...(await this.dashboardService.GetDashboards()));
    this.dataSource.data = data;
    console.log(data)
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
