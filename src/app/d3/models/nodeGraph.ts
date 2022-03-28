
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
        return Math.sqrt(this.linkCount);
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
}
