import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3ButtonComponent } from 'src/app/components/m3-button/m3-button.component';
import { HomeMainComponent } from './pages/main/home-main.component';
import { HomeAboutComponent } from './pages/about/home-about.component';
import { HomeRoutingModule } from './home-routing.module';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    HomeMainComponent,
    HomeAboutComponent
  ],
  imports: [
    CommonModule,
    DynamicFormComponent,
    HomeRoutingModule,
    M3ButtonComponent
  ]
})
export class HomeModule { }
