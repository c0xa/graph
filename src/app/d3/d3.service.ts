import {Injectable, EventEmitter, ChangeDetectorRef} from '@angular/core';
import * as d3 from 'd3';
import { NodeGraph, Link, ForceDirectedGraph } from './models';
import {NodeVisualComponentComponent} from "../node-visual-component/node-visual-component.component";
import {take} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class D3Service {

    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
    constructor() { }

    /** A method to bind a pan and zoom behaviour to an svg element */
    applyZoomableBehaviour(svgElement: Element, containerElement: Element) {
        let svg: d3.Selection<any, unknown, null, undefined>;
        let container: d3.Selection<any, unknown, null, undefined>;

        svg = d3.select(svgElement);
        container = d3.select(containerElement);

        const zoomed = () => {
            const transform = d3.zoomTransform(containerElement);
            // console.log("transform.k", transform.k)
            container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
        }

        const zoom = d3.zoom().on('zoom', zoomed);
        svg.call(zoom);
    }

        /** A method to bind a draggable behaviour to an svg element */
        applyDraggableBehaviour(element: Element, node: NodeGraph, graph: ForceDirectedGraph) {
            const d3element: d3.Selection<any, unknown, null, undefined> = d3.select(element);

            function dragstarted(event: any) {
                d3element.raise().classed("active", true);
                if (!event.active) {
                    graph.simulation.alphaTarget(0.9).restart();
                }
            }

            function dragged(event: any) {
                d3element.attr("fx", node.fx = event.x).attr("fy", node.fy = event.y);
            }

            function dragended(event: any) {
                d3element.attr("fx", node.fx = null).attr("fy", node.fy = null);
                d3element.classed("active", false);
            }

            d3element.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );
        }
    /** The interactable graph we will simulate in this article
    * This method does not interact with the document, purely physical calculations with d3
    */
    getForceDirectedGraph(nodes: NodeGraph[], links: Link[], options: { width: number, height: number }) {
        const sg = new ForceDirectedGraph(nodes, links, options);
        console.log("start")
        return sg;
    }
}
