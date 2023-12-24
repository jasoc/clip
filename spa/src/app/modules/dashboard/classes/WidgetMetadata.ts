import { Type } from "@angular/core";
import { WidgetbaseOptions } from "./WidgetBaseOptions";

export type WidgetMetadata = {
    name: string;
    icon?: string;
    requestedWidth?: number;
    requestedHeight?: number;
    canHaveSubWidgets?: boolean;
    optionType?: Type<WidgetbaseOptions>;
}
