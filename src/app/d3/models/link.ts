import { NodeGraph } from './index';

export class Link implements d3.SimulationLinkDatum<NodeGraph> {

    // must - defining enforced implementation properties
    source: NodeGraph;
    target: NodeGraph;
    value: number;

    constructor(source: NodeGraph, target: NodeGraph, value: number) {
        this.source = source;
        this.target = target;
        this.value = value;
    }
}
