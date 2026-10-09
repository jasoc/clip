import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'clip-breadcrumb',
  standalone: true,
  imports: [RouterModule, MatChipsModule, MatIconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  readonly breadcrumbService = inject(BreadcrumbService);
  readonly breadcrumbs = this.breadcrumbService.breadcrumbs;
}
