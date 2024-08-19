import { reflectComponentType } from '@angular/core';
import { GridstackComponent } from 'gridstack/dist/angular';

export function getAllWidgetsSelector(): Array<string> {
  return Object.keys(GridstackComponent.selectorToType)
    .map((x) => reflectComponentType(GridstackComponent.selectorToType[x])?.selector)
    .filter((x) => x != undefined) as Array<string>;
}
