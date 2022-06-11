import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { NodeGraph } from './nodeGraph';
import * as d3 from 'd3';
import {SimulationNodeDatum} from "d3";

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<NodeGraph, Link>> = new EventEmitter();
    public simulation!: d3.Simulation<SimulationNodeDatum, undefined>;

    public nodes: NodeGraph[] = [];
    public links: Link[] = [];

    constructor(nodes: NodeGraph[], links: Link[], options: { width: number, height: number }) {
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }

    connectNodes(source: NodeGraph, target: NodeGraph, value: number) {
        let link;

        link = new Link(source, target, value);
        this.simulation.stop();
        this.links.push(link);
        this.simulation.alphaTarget(0.3).restart();

        this.initLinks();
    }

    initNodes() {
        if (!this.simulation) {
          throw new Error('simulation was not initialized yet');
        }
        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        if (!this.simulation) {
          throw new Error('simulation was not initialized yet');
        }

        this.simulation.force('links',
            d3.forceLink(this.links)
                .id((d: any) => d['id'])
            );
        }

    initSimulation(options: { width: number, height: number }) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;

            this.simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d:any) { return d.id; }))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(options.width / 2, options.height / 2));


            this.simulation.on('tick', function () {
                ticker.emit()
            });
            this.initNodes();
            this.initLinks();
        }

        /** Restarting the simulation internal timer */
        this.simulation.restart();
    }
}
