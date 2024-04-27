import { Component } from '@angular/core';
import { M3ButtonComponent } from '../../components/m3-button/m3-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { M3IconComponent } from "../../components/m3-icon/m3-icon.component";

@Component({
    selector: 'clip-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        M3ButtonComponent,
        MatButtonModule,
        MatIconModule,
        M3IconComponent
    ]
})
export class HomeMainComponent {

}
