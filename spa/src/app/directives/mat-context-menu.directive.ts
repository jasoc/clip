import { Directive, Input } from '@angular/core';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';

@Directive({
  selector: '[matContextMenu]',
  standalone: true,
  host: {
    class: 'mat-mdc-menu-trigger',
    '[attr.aria-haspopup]': 'menu ? "menu" : null',
    '[attr.aria-expanded]': 'menuOpen',
    '[attr.aria-controls]': 'menuOpen ? menu.panelId : null',
    '(contextmenu)': '_handleContextMenu($event)',
  },
})
export class MatContextMenuDirective extends MatMenuTrigger {
  @Input('matContextMenu')
  get _matMenuTriggerForContext(): MatMenuPanel | null {
    return this.menu;
  }
  set _matMenuTriggerForContext(v: MatMenuPanel | null) {
    this.menu = v;
  }

  _handleContextMenu($event: MouseEvent): boolean {
    $event?.stopPropagation();
    $event?.preventDefault();
    $event?.stopImmediatePropagation();
    this._handleClick($event);
    return false;
  }
}
