
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
    colorAnimation: string;

    constructor(id: string) {
        this.id = id;
        this.colorAnimation = "0";
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
        return this.colorAnimation === "0" ?  "rgba(61,162,18,0.8)" : "rgb(217,46,60)"
    }

    get link() {
        return this.linkCount;
    }

    get fontSize() {
        const normal = this.normal();
        return normal === 0 ? 50 + 'px': 50 * normal + 10 + 'px';
    }

    setColorAnimation(colorAnimation: string) {
        this.colorAnimation = colorAnimation;
    }
}
