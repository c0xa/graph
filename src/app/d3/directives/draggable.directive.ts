import {Directive, Input, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NodeGraph, ForceDirectedGraph } from '../models';
import { D3Service } from '../d3.service';

@Directive({
    selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
    // @Input('draggableNode') draggableNode!: NodeGraph;
    // @Input('draggableInGraph') draggableInGraph!: ForceDirectedGraph;
    //
    // @ViewChild('number') number: number = 0;
    constructor() { }

    ngOnInit() {
        // this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
    }
}
