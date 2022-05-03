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
    colorAnimation: string;

    constructor(id: string) {
        this.id = id;
        this.colorAnimation = "0";
    }

    normal = () => {
        return Math.sqrt(this.linkCount);
    }

    get r() {
        const normal = this.normal();
        return normal === 0 ? 40 : 50 * normal + 10;
    }

    get color() {
        return this.colorAnimation === "0" ?  "rgb(61,162,18)" : "rgb(217,46,60)"
    }

    get link() {
        return this.linkCount;
    }

    get fontSize() {
        const normal = this.normal();
        return normal === 0 ? 50 + 'px': 50 * normal + 10 + 'px';
    }

    setColorAnimation(colorAnimation: string) {
        console.log("setColorAnimation", this.colorAnimation)
        this.colorAnimation = colorAnimation;
    }
}
