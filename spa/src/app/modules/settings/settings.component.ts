import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { M3CardComponent } from '../../components/m3-card/m3-card.component';
import { M3CardAction } from '../../domain';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'clip-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [MatIconModule, M3CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly router = inject(Router);
  readonly themeService = inject(ThemeService);

  settingsHeaders: {
    title: string;
    redirect: string;
    link?: string;
    description: string;
    icon: string;
    actions?: M3CardAction[];
  }[] = [
    {
      title: 'Personal settings',
      description: 'Manage your personal settings and preferences.',
      icon: 'settings',
      redirect: '/settings/personal',
    },
    {
      title: 'Models settings',
      description: 'Manage your API models and access permissions.',
      redirect: '/settings/models',
      icon: 'notifications',
    },
  ];

  constructor() {
    this.themeService.watermarks['/settings'] = 'settings';
  }
}
