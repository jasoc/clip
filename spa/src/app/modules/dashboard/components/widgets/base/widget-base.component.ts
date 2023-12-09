import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ElementRef, HostBinding, OnInit, Renderer2, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { WidgetNode } from "../../../classes/IWidgetNode";
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { DashboardService } from '../../../dashboard.service';
import { geometricNode } from "../../../classes/GeometricNode";
import { WidgetMetadata } from "../../../classes/WidgetMetadata";

@Component({
    selector: 'clip-base-widget',
    templateUrl: './widget-base.component.html',
    styleUrls: ['widget-base.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetBaseComponent extends geometricNode implements AfterViewInit {
    
    @ViewChild('container', {read: ViewContainerRef})
    container: ViewContainerRef | null = null;

    @HostBinding('cdkDragDisabled')
    cdkDragDisabled: boolean = true;

    widgetNode: WidgetNode | undefined;

    composerMode: boolean = false;

    forceDisableDrag: boolean = false;

    rendered: boolean = false;
    
    highlighted: boolean = false;

    metadata: WidgetMetadata = { name: "Widget base" };
 
    constructor(public dashboardService: DashboardService, private hostViewRef: ElementRef, private renderer: Renderer2, private cd: ChangeDetectorRef) {
        super(hostViewRef);
    }

    onClick(event: MouseEvent) {
        if (!this.composerMode) return;
        this.dashboardService.highlightWidget(this.widgetNode!);
        this.highlighted = true;
        this.cd.detectChanges();
    }

    onDragEndEvent(event: CdkDragEnd) {
        if (!this.composerMode || !this.widgetNode) return;
        
        let { x, y } = event.source.getFreeDragPosition();
        if (this.dashboardService.tryAssignNewPositionToWidget(this.widgetNode!, x, y)) {
            this.dashboardService.updateDashboard(this.dashboardService.dashboardByWidget.get(this.widgetNode)!);
        }

        let widgetDashboard = this.dashboardService.dashboardByWidget.get(this.widgetNode);
        if (widgetDashboard) {
            this.dashboardService.renderDashboard(widgetDashboard);
        }
    }

    ngAfterViewInit(): void {
        if (this.widgetNode) this.render();
    }

    public render() {
        this.setGridPosition();
        this.renderSubWidgets();
        this.cd.detectChanges();
        this.rendered = true;
    }

    setGridPosition() {
        this.renderer.setStyle(this.hostViewRef.nativeElement, 'grid-column-start', this.widgetNode!.positionStartX);
        this.renderer.setStyle(this.hostViewRef.nativeElement, 'grid-column-end', this.widgetNode!.positionStartX! + this.getWidth());
        this.renderer.setStyle(this.hostViewRef.nativeElement, 'grid-row-start', this.widgetNode!.positionStartY);
        this.renderer.setStyle(this.hostViewRef.nativeElement, 'grid-row-end', this.widgetNode!.positionStartY! + this.getHeight());
    }

    getWidth(): number {
        if (this.widgetNode && this.widgetNode.width && this.widgetNode.width > (this.metadata.requestedWidth ?? 0)) {
            return this.widgetNode.width;
        }
        return (this.metadata.requestedWidth ?? 1);
    }

    getHeight(): number {
        if (this.widgetNode && this.widgetNode.height && this.widgetNode.height > (this.metadata.requestedHeight ?? 0)) {
            return this.widgetNode.height;
        }
        return (this.metadata.requestedHeight ?? 1);
    }

    renderSubWidgets(): void {
        if (this.container && this.widgetNode!.subComponents && this.widgetNode!.subComponents.length > 0) {
            this.widgetNode!.subComponents.forEach((componentNode) => {
                this.dashboardService.destroyWidget(componentNode);
                let newComponentRef = this.dashboardService.addNodeInContainer(componentNode, this.container!);
                this.dashboardService.spawnSubWidget(this.widgetNode!, componentNode, newComponentRef);
            });
        }
    }
}