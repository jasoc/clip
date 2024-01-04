import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3ButtonComponent } from 'src/app/components/m3-button/m3-button.component';
import { DashboardMainComponent } from './pages/main/dashboard-main.component';
import { DashboardComposerComponent } from './pages/composer/dashboard-composer.component';
import { HomeRoutingModule } from './dashboard-routing.module';
import { M3InputComponent } from 'src/app/components/m3-input/m3-input.component';
import { DashboardViewerComponent } from './pages/viewer/dashboard-viewer.component';
import { FlexBoxComponent } from './components/widgets/flex-box/flex-box.component';
import { LabelComponent } from './components/widgets/label/label.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from './dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CdkDragPreview, CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { WidgetBaseComponent } from './components/widgets/base/widget-base.component';
import { M3TabsComponent } from "../../components/m3-tabs/m3-tabs.component";
import { M3TabComponent } from 'src/app/components/m3-tabs/m3-tab/m3-tab.component';
import { M3IconComponent } from 'src/app/components/m3-icon/m3-icon.component';
import { ClipWidgetRoot } from './components/widgets/base/widget-base.directive';
import { WidgetsTreeComponent } from './components/widgets-tree/widgets-tree.component';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { M3DropdownComponent } from 'src/app/components/m3-dropdown/m3-dropdown.component';
import { DashboardCanvasComponent } from './components/dashboard-canvas/dashboard-canvas.component';
import { SpacerComponent } from './components/widgets/spacer/spacer.component';

@NgModule({
    declarations: [
        DashboardMainComponent,
        DashboardComposerComponent,
        WidgetsTreeComponent,
        DashboardCanvasComponent,
        DashboardViewerComponent,
        ClipWidgetRoot,
        FlexBoxComponent,
        LabelComponent,
        SpacerComponent,
        WidgetBaseComponent
    ],
    providers: [
        DashboardService,
    ],
    imports: [
        CommonModule,
        M3InputComponent,
        HomeRoutingModule,
        M3ButtonComponent,
        M3IconComponent,
        M3TabsComponent,
        M3DropdownComponent,
        M3TabComponent,
        DynamicFormComponent,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        CdkDrag,
        CdkDragPreview,
        CdkDropList,
        DragDropModule,
        M3TabsComponent
    ]
})
export class DasboardModule { }
