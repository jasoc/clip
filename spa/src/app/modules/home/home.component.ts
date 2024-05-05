import { Component } from '@angular/core';
import { M3ButtonComponent } from '../../components/m3-button/m3-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { M3IconComponent } from "../../components/m3-icon/m3-icon.component";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'clip-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        M3ButtonComponent,
        MatButtonModule,
        MatIconModule,
        M3IconComponent,
        MatSlideToggleModule,
        MatFormFieldModule, MatInputModule, MatCardModule, FormsModule, MatButtonModule, MatIconModule
    ]
})
export class HomeMainComponent {
  value = 'Clear me';
}
