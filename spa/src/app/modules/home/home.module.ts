import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3ButtonComponent } from 'src/app/components/m3-button/m3-button.component';
import { HomeMainComponent } from './pages/main/home-main.component';
import { HomeAboutComponent } from './pages/about/home-about.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeMainComponent,
    HomeAboutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    M3ButtonComponent
  ]
})
export class HomeModule { }
