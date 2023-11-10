import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3ButtonComponent } from 'src/app/components/m3-button/m3-button.component';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { M3InputComponent } from 'src/app/components/m3-input/m3-input.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    M3InputComponent,
    M3ButtonComponent,
    CommonModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
