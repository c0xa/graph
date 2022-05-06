import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { NodeGraph } from './nodeGraph';
import * as d3 from 'd3';

const FORCES = {
    LINKS: 1 / 50,
    COLLISION: 1,
    CHARGE: -1,
    LENGTH: 100
}

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<NodeGraph, Link>> = new EventEmitter();
    public simulation!: d3.Simulation<any, any>;

    public nodes: NodeGraph[] = [];
    public links: Link[] = [];

    constructor(nodes: NodeGraph[], links: Link[], options: { width: number, height: number }) {
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }

    connectNodes(source: NodeGraph, target: NodeGraph, value: number) {
        let link;

        // if (!this.nodes[source] || !this.nodes[target]) {
        //     throw new Error('One of the nodes does not exist');
        // }

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
        // const simulation = d3.forceSimulation(this.nodes)
        //     .force("charge", d3.forceManyBody())
        //     .force("link", d3.forceLink(this.links))
        //     .force("center", d3.forceCenter());
        // simulation.force("charge", null);
        this.simulation.nodes(this.nodes);
    }

    initLinks() {
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
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;

            // this.simulation = d3.forceSimulation()
            //                     .force('charge',
            //                     d3.forceCollide()
            //                     .strength(FORCES.COLLISION)
            //                     .radius((d: any) => d['linkCount'] === 1 ? d['r'] * FORCES.LENGTH : d['linkCount'] * FORCES.LENGTH)
            //                     .iterations(1)
            //                     )
            //     .force("friction", d3.forceCollide())
            //     .force('collide',
            //         d3.forceManyBody()
            //             .strength((d: any) => FORCES.CHARGE * d['r'] + 25)
            //     );
            this.simulation = d3.forceSimulation()
                .force('charge',
                    d3.forceCollide()
                        .strength(FORCES.COLLISION)
                        .radius((d: any) => d['linkCount'] === 1 ? d['r'] * FORCES.LENGTH : d['linkCount'] * FORCES.LENGTH)
                        .iterations(1)
                )
                .force('collide',
                    d3.forceManyBody()
                        .strength((d: any) => FORCES.CHARGE * d['r'] + 25)
                );

            // this.simulation = d3.forceSimulation()
            //                     .force('collide',
            //                     d3.forceCollide()
            //                     .strength(FORCES.COLLISION)
            //                     .radius((d: any) => d['linkCount'] === 1 ? d['r'] + FORCES.LENGTH : d['linkCount'] * FORCES.LENGTH).
            //                     iterations(2)
            //                     );
            // this.simulation = d3.forceSimulation()
            //     .force('charge',
            //         d3.forceManyBody()
            //             .strength((d: any) => FORCES.CHARGE * d['r'] + 25)
            //     )
            //     .force('collide',
            //         d3.forceCollide()
            //             .strength(FORCES.COLLISION)
            //             .radius((d: any) => d['r'] + 25).iterations(2)
            //     );

            // this.simulation = d3.forceSimulation()
            //     .force('charge',
            //         d3.forceCollide()
            //             .strength(FORCES.CHARGE)
            //             .radius((d: any) => 100).
            //         iterations(1)
            //     );

            // Connecting the d3 ticker to an angular event emitter
            // this.simulation.on('start');



            // this.simulation.on('end', function () {
            //     console.log("soak end")
            //     ticker.emit(this);
            // });

            this.simulation.on('tick', function () {
                console.log("soak end")
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
