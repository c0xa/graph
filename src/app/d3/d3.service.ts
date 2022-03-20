import { Injectable, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { NodeGraph, Link, ForceDirectedGraph } from './models';

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
            container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
        }

        const zoom = d3.zoom().on('zoom', zoomed);
        svg.call(zoom);
    }

        /** A method to bind a draggable behaviour to an svg element */
        applyDraggableBehaviour(element: Element, node: NodeGraph, graph: ForceDirectedGraph) {
            const d3element: d3.Selection<any, unknown, null, undefined> = d3.select(element);

            function started(event: any) {
                const circle = d3.select(element).classed("dragging", true);

                event.on("drag", dragged).on("end", ended);

                function dragged(event: any, d: any) {
                    console.log("soak x", event.x);
                    console.log("soak x", event.y)
                    node.fx = event.x;
                    node.fy = event.y;
                }

                function ended() {
                    circle.classed("dragging", false);
                    console.log("soak end");
                }
            }

            d3element.call(d3.drag()
              .on('start', started));
        }

        /** The interactable graph we will simulate in this article
        * This method does not interact with the document, purely physical calculations with d3
        */
        getForceDirectedGraph(nodes: NodeGraph[], links: Link[], options: { width: number, height: number }) {
            const sg = new ForceDirectedGraph(nodes, links, options);
            return sg;
        }
}
