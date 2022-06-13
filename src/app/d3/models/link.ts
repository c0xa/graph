import { NodeGraph } from './index';

export class Link implements d3.SimulationLinkDatum<NodeGraph> {

    // must - defining enforced implementation properties
    source: NodeGraph;
    target: NodeGraph;
    bandwidth: number;
    normalWidth: number = 1;

    constructor(source: NodeGraph, target: NodeGraph, bandwidth: number) {
        this.source = source;
        this.target = target;
        this.bandwidth = bandwidth;

        this.normalWidth =  Math.sqrt(this.bandwidth)
        if (this.bandwidth > 50) {
            let operation = this.bandwidth / 200;
            this.normalWidth = operation < 1 ? 1 : operation;
        }
    }

    get width() {
        return this.normalWidth;
    }
}
