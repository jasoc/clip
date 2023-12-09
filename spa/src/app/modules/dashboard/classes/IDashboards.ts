import { WidgetNode } from "./IWidgetNode";

export interface Dashboard {
    id: string;
    name: string;
    json_grid: string;
    columns: number;
    rows: number;
    height: number;
    width: number;
    widgetsTree: WidgetNode;
}