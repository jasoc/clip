import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3ButtonComponent } from '../components/m3-button/m3-button.component';
import { ShellRoutingModule } from './shell-routing.module';
import { NavigationDrawerComponent } from '../components/shell/navigation-drawer/navigation-drawer.component';
import { ShellComponent } from './shell.component';
import { NavigationBarComponent } from '../components/shell/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    M3ButtonComponent,
    NavigationDrawerComponent,
    NavigationBarComponent
  ]
})
export class ShellModule { }
