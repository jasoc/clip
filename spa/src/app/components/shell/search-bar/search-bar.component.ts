import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [MatIconModule, MatRippleModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  readonly text = model('');
  readonly colored = signal(false);
  readonly contextMenuOpen = signal(false);

  onFocus(_event: Event) {
    this.contextMenuOpen.set(true);
    this.colored.set(true);
  }

  onFocusOut(_event: Event) {
    const t = this.text();
    if (!t) {
      this.contextMenuOpen.set(false);
      this.colored.set(false);
      return;
    }

    if (t.length > 0) {
      this.contextMenuOpen.set(true);
      this.colored.set(false);
      return;
    }
  }
}
