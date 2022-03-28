import APP_CONFIG from '../../../../../angular-d3-graph-example/src/app/app.config';

export class NodeGraph implements d3.SimulationNodeDatum {
    // optional - defining optional implementation properties - required for relevant typing assistance
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    index: number;
    id: string;
    linkCount: number = 0;

    constructor(id: string, index: number) {
        this.id = id;
        this.index = index;
        // console.log(this.id);
    }

    normal = () => {
        return Math.sqrt(this.linkCount / APP_CONFIG.N);
    }

    get r() {
        return 50 * this.normal() + 10;
    }

    get link() {
        return this.linkCount;
    }

    get fontSize() {
        return (30 * this.normal() + 10) + 'px';
    }

    get color() {
        let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
        return APP_CONFIG.SPECTRUM[index];
    }
}
