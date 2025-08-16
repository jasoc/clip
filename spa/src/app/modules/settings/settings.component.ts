import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { M3CardAction, M3CardComponent } from '../../components/m3-card/m3-card.component';

@Component({
  selector: 'clip-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [MatIconModule, M3CardComponent],
})
export class SettingsComponent {
  public router = inject(Router);
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
}
