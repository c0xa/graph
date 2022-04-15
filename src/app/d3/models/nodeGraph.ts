
export class NodeGraph implements d3.SimulationNodeDatum {
    // optional - defining optional implementation properties - required for relevant typing assistance
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    // index: number;
    id: string;
    linkCount: number = 0;
    colorAnimation?: string;

    constructor(id: string) {
        this.id = id;
        // this.index = index;
        // console.log(this.id);
    }

    normal = () => {
        return Math.sqrt(this.linkCount);
    }

    get r() {
        const normal = this.normal();
        return normal === 0 ? 40 : 50 * normal + 10;
    }

    get color() {
        // console.log("soak color", this.normal())
        return this.colorAnimation === "0" ?  "rgba(162,18,118,0.8)" : "rgba(145,213,85,0.8)"
    }

    get link() {
        return this.linkCount;
    }

    get fontSize() {
        const normal = this.normal();
        return normal === 0 ? 30 + 'px': 30 * normal + 10 + 'px';
    }

    setColorAnimation(colorAnimation: string) {
        this.colorAnimation = colorAnimation;
    }
}
