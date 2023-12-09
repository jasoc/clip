import { Type } from "@angular/core";
import { FlexBoxComponent } from "./flex-box/flex-box.component";
import { LabelComponent } from "./label/label.component";
import { WidgetBaseComponent } from "./base/widget-base.component";

export const widgetsMap: { [key: string]: Type<WidgetBaseComponent> } = {
    'FlexBoxComponent': FlexBoxComponent,
    'LabelComponent': LabelComponent,
}