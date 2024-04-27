import { Component } from '@angular/core';
import { M3ButtonComponent } from '../../components/m3-button/m3-button.component';

@Component({
  selector: 'clip-home',
  standalone: true,
  imports: [
    M3ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeMainComponent {

}
