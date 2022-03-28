import {Directive, Input, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NodeGraph, ForceDirectedGraph } from '../models';
import { D3Service } from '../d3.service';
import {NodeVisualComponentComponent} from "../../node-visual-component/node-visual-component.component";

@Directive({
    selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
    @Input('draggableNode') draggableNode!: NodeGraph;
    @Input('draggableInGraph') draggableInGraph!: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
    }
}
