import { GridstackComponent } from "gridstack/dist/angular";
import { DashboardsWidgetCardComponent } from "./widgets/card/dashboards-widget-card.component";
import { DashboardsWidgetSpacerComponent } from "./widgets/spacer/dashboards-widget-spacer.component";

export function InitGridstackWidgets() {
    GridstackComponent.addComponentToSelectorType([DashboardsWidgetCardComponent, DashboardsWidgetSpacerComponent]);
}