import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WidgetNode } from '../../classes/IWidgetNode';

@Component({
    selector: 'clip-widgets-tree',
    templateUrl: './widgets-tree.component.html',
    styleUrls: ['./widgets-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsTreeComponent {

    private _node: WidgetNode = undefined!;

    @Input("node")
    public set setNode(node: WidgetNode) {
        console.log(node)
        this._node = node;
        this.flatList = [];
        this.flattenTree(this._node, 0);
    }

    @Output()
    public nodeUpdated = new EventEmitter<WidgetNode>();

    public flatList: WidgetNode[] = [];
    private dragNodes: WidgetNode[] = [];

    ngOnInit() {
        // this.flattenTree(this._node, 0);
    }

    flattenTree(node: WidgetNode, level: number) {
        let flatNode = { ...node, level: level };
        this.flatList.push(flatNode);
        if (node.subComponents) {
            node.subComponents.forEach(subNode => this.flattenTree(subNode, level + 1));
        }
    }

    dragStart(event: DragEvent, index: number) {
        event.dataTransfer!.setData('text', (event.target as HTMLElement).id);

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

    drop(event: DragEvent, index: number) {
        event.preventDefault();
    
        // Ottieni il livello del nodo su cui è stato rilasciato il drag
        const dropLevel = this.flatList[index].level;
    
        // Calcola la differenza di livello tra il nodo trascinato e il nodo di rilascio
        let levelDiff = dropLevel! - this.dragNodes[0].level!;
    
        if (this.flatList[index].className == "FlexBoxComponent") {
            levelDiff += 1;
            index += 1;
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
    
        // Inserisci i nodi trascinati nella nuova posizione
        this.flatList.splice(index, 0, ...this.dragNodes);
    
        this.dragNodes = [];
    }

    allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    dropOutside(event: DragEvent) {
        event.preventDefault();

        // Rimuovi i nodi trascinati dalla lista flat
        this.dragNodes.forEach(node => {
            let index = this.flatList.indexOf(node);
            if (index !== -1) {
                this.flatList.splice(index, 1);
            }
        });

        this.dragNodes = [];

        // Ricostruisci l'albero
        this._node = this.rebuildTree();
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

        this.nodeUpdated.emit(root);
        return root;
    }
}