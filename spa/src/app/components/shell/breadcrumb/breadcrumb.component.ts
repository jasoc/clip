import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { Breadcrumb, BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'clip-breadcrumb',
  standalone: true,
  imports: [RouterModule, MatChipsModule, MatIconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  public breadcrumbService: BreadcrumbService = inject(BreadcrumbService);

  constructor() {
    this.breadcrumbService.breadcrumbs.subscribe((bcs: Breadcrumb[]) => {
      this.breadcrumbs = bcs;
      console.log(this.breadcrumbs);
    });
  }
}
