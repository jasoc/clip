import { Type } from "@angular/core";
import { WidgetbaseOptions } from "./WidgetBaseOptions";
import { RecursiveInputTypes } from "src/app/components/dynamic-form";

export type WidgetMetadata = {
    name: string;
    icon?: string;
    requestedWidth?: number;
    requestedHeight?: number;
    canHaveSubWidgets?: boolean;
    properties?: RecursiveInputTypes;
}
