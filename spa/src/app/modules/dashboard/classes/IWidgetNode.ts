export interface WidgetNode {
    className: string;
    positionStartX?: number;
    positionStartY?: number;
    width?: number;
    height?: number;
    values?: any;
    subComponents?: WidgetNode[];
}
