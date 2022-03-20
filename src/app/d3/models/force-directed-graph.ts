import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { NodeGraph } from './nodeGraph';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<NodeGraph, Link>> = new EventEmitter();
    public simulation!: d3.Simulation<any, any>;

    public nodes: NodeGraph[] = [];
    public links: Link[] = [];

    constructor(nodes: NodeGraph[], links: Link[], options: { width: number, height: number }) {
        console.log("ForceDirectedGraph");
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }

    connectNodes(source: NodeGraph, target: NodeGraph, value: number, time: number) {
        console.log("connectNodes")
        let link;

        // if (!this.nodes[source] || !this.nodes[target]) {
        //     throw new Error('One of the nodes does not exist');
        // }

        link = new Link(source, target, value, time);
        this.simulation.stop();
        this.links.push(link);
        this.simulation.alphaTarget(0.3).restart();

        this.initLinks();
    }

    initNodes() {
        console.log("initNodes")
        if (!this.simulation) {
          throw new Error('simulation was not initialized yet');
        }

        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        console.log("initLinks")
        if (!this.simulation) {
          throw new Error('simulation was not initialized yet');
        }

        this.simulation.force('links',
            d3.forceLink(this.links)
                .id((d: any) => d['id'])
                .strength(FORCES.LINKS)
            );
        }

    initSimulation(options: { width: number, height: number }) {
        console.log("init similation")
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;

            this.simulation = d3.forceSimulation()
                                .force('charge',
                                d3.forceManyBody()
                                .strength((d: any) => FORCES.CHARGE * d['r'])
                                )
                                .force('collide',
                                d3.forceCollide()
                                .strength(FORCES.COLLISION)
                                .radius((d: any) => d['r'] + 5).iterations(2)
                                );

            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
            ticker.emit(this);
            });

            this.initNodes();
            this.initLinks();
        }

        /** Updating the central force of the simulation */
        this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

        /** Restarting the simulation internal timer */
        this.simulation.restart();
    }
}