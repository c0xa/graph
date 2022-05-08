import {ChangeDetectorRef} from "@angular/core";

export class NodeGraph implements d3.SimulationNodeDatum {
    // optional - defining optional implementation properties - required for relevant typing assistance
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    id: string;
    linkCount: number = 0;
    colorAnimation: number = 0;

    constructor(id: string) {
        this.id = id;
    }

    normal = () => {
        return Math.sqrt(this.linkCount);
    }

    get r() {
        const normal = this.normal();
        return 3 + normal * 3;
    }

    get color() {
        return this.colorAnimation === 0 ?  "rgb(61,162,18)" : "rgb(217,46,60)"
    }

    get link() {
        return this.linkCount;
    }

    get fontSize() {
        const normal = this.normal();
        return 6 + normal * 2 + 'px'
    }

    setColorAnimation(colorAnimation: number) {
        this.colorAnimation = colorAnimation;
    }
}
