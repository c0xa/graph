import { Component, Input, OnInit } from '@angular/core';
import {NodeGraph} from "../logic/models/NodeGraph";
import {Link} from "../logic/models/Link";

@Component({
  selector: 'app-node-visual-component',
  templateUrl: './node-visual-component.component.html',
  styleUrls: ['./node-visual-component.component.less']
})
export class NodeVisualComponentComponent  {
    @Input() nodesGraph: NodeGraph[] = [];
    @Input() links: Link[] = [];

    radius = 54;
    circumference = 2 * Math.PI * this.radius;
    dashoffset: number = 0;

    constructor() {
        console.log(this.nodesGraph.length);
        this.nodesGraph.forEach((data: NodeGraph) => {
            console.log("soak", data.id);
        })
    }

}
