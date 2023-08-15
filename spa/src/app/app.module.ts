import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewModule } from './main-view/main-view.module';
import { CommonModule } from '@angular/common';
import { M3ChipComponent } from './components/m3-chip/m3-chip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { M3ButtonComponent } from './components/m3-button/m3-button.component';
import { NavigationDrawerComponent } from './components/shell/navigation-drawer/navigation-drawer.component';
import { NavigationBarComponent } from './components/shell/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    M3ButtonComponent,
    M3ChipComponent,
    NavigationDrawerComponent,
    NavigationBarComponent,
    BrowserModule,
    AppRoutingModule,
    MainViewModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
