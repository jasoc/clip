import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { WidgetNode } from '../../classes/WidgetNode';
import { widgetsMap } from '../widgets';
import { Observable, firstValueFrom } from 'rxjs';
import { CdkDragDrop, CdkDragEnter, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';

export interface WidgetNode {
    className: string;
    positionStartX?: number;
    positionStartY?: number;
    width?: number;
    height?: number;
    values?: any;
    subComponents?: WidgetNode[];
    level?: number;
    show?: boolean;
}

@Component({
    selector: 'clip-widgets-tree',
    templateUrl: './widgets-tree.component.html',
    styleUrls: ['./widgets-tree.component.scss'],
})
export class WidgetsTreeComponent {

    @Input("node")
    public nodeObservable: Observable<WidgetNode> | undefined;                                                                                               

    private node: WidgetNode | undefined;

    @Output()
    public onWidgetTreeChanged = new EventEmitter<WidgetNode>();

    public flatList: WidgetNode[] = [];
    private dragNodes: WidgetNode[] = [];

    constructor() { }

    ngOnInit() {
        if (this.nodeObservable) {
            this.nodeObservable.subscribe((node) => {
                if (node) {
                    this.node = node;
                    this.flatList = this.flattenTree(this.node, 0);
                }
            });
        }
    }

    onNodeClick(node: WidgetNode) {
        if ((node.subComponents?.length ?? 0) > 0) {
            let nodeIndex = this.flatList.indexOf(node);
            const close: boolean = this.flatList[nodeIndex + 1].show!;
            while (true) {
                if (this.flatList[nodeIndex].level! >= node.level! + 1) {
                    this.flatList[nodeIndex].show = !close;
                }
                nodeIndex += 1;
                if (this.flatList[nodeIndex].level == node.level) {
                    break;
                }
            }
        }
    }

    flattenTree(node: WidgetNode, level: number): WidgetNode[] {
        let flatList: WidgetNode[] = [];
        node.level = level;
        node.show = true;
        flatList.push(node);
        if (node.subComponents) {
            node.subComponents.forEach(subNode => {
                flatList = flatList.concat(this.flattenTree(subNode, level + 1));
            });
        }
        return flatList;
    }

    dragStart(event: CdkDragStart, index: number) {
        this.dragNodes = [];
        let level = this.flatList[index].level;
        do {
            this.dragNodes.push(this.flatList[index]);
            index++;
        } while (index < this.flatList.length && this.flatList[index].level! > level!);
    }

    dragOver(event: DragEvent, index: number) {
        // console.log("dragOver", index);
        event.preventDefault();
        // // Evita il rilascio di un nodo su se stesso
        // if (this.dragNodes.includes(this.flatList[index])) {
        //     event.dataTransfer!.dropEffect = 'none';
        // } else {
        //     event.dataTransfer!.dropEffect = 'move';
        // }
    }

    drop(event: CdkDragDrop<WidgetNode[]>) {
        let index = event.currentIndex;
        const canInnest: boolean =  widgetsMap[this.flatList[index].className]
        ? widgetsMap[this.flatList[index].className].prototype.metadata.canHaveSubWidgets
        : false;

        if (index < 1) {
            index = 1;
        }

        	        
        let indexDiff = event.currentIndex - event.previousIndex;
        if (this.flatList[index] == this.dragNodes[0] || (indexDiff > 0 && indexDiff < this.dragNodes.length)) {
            return;
        }
        
        // Ottieni il livello del nodo su cui è stato rilasciato il drag
        let dropLevel = this.flatList[index].level;
    
        // Calcola la differenza di livello tra il nodo trascinato e il nodo di rilascio
        let levelDiff = dropLevel! - this.dragNodes[0].level!;

        if (canInnest && event.previousIndex < event.currentIndex) {
            levelDiff += 1;
            index += 1;
        }

        if (levelDiff < 0) {
            levelDiff == 1;
        }

        // Aggiorna il livello di ogni nodo trascinato
        this.dragNodes.forEach(node => node.level! += levelDiff);
    
        // Rimuovi i nodi trascinati dalla lista flat
        this.dragNodes.forEach(node => {
            let index = this.flatList.indexOf(node);
            if (index !== -1) {
                this.flatList.splice(index, 1);
            }
        });
    
        
        if (event.previousIndex <= event.currentIndex) {
            index -= this.dragNodes.length - 1;
        }

        // Inserisci i nodi trascinati nella nuova posizione
        this.flatList.splice(index, 0, ...this.dragNodes);
    
        this.dragNodes = [];

        this.node = this.rebuildTree();
    }
    
    getChildrenCount(node: WidgetNode): number {
        let count = 0;
        let level = node.level!;
        for (let i = this.flatList.indexOf(node) + 1; i < this.flatList.length && this.flatList[i].level! > level; i++) {
            count++;
        }
        return count;
    }

    allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    dropOutside(event: DragEvent) {
        event.preventDefault();
        // this.drop(event, 1);
    }

    rebuildTree(): WidgetNode {
        let root: WidgetNode = { ...this.flatList[0], subComponents: [] };
        let nodeStack: WidgetNode[] = [root];

        for (let i = 1; i < this.flatList.length; i++) {
            let node = { ...this.flatList[i], subComponents: [] };
            while (node.level! <= nodeStack[nodeStack.length - 1].level!) {
                nodeStack.pop();
            }
            nodeStack[nodeStack.length - 1].subComponents!.push(node);
            nodeStack.push(node);
        }

        this.onWidgetTreeChanged.emit(root);
        return root;
    }
}