import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainViewRoutingModule } from './main-view-routing.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { M3ButtonComponent } from '../components/m3-button/m3-button.component';

@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent
  ],
  imports: [
    CommonModule,
    MainViewRoutingModule,
    M3ButtonComponent
  ]
})
export class MainViewModule { }
