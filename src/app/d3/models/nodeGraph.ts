import {ChangeDetectorRef} from "@angular/core";
import {LogicalFileSystem} from "@angular/compiler-cli";

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
    throughput: number = 0;

    constructor(id: string, throughput: number = 0) {
        this.id = id;
        this.throughput = throughput;
    }

    normalRelativeLink = () => {
        return Math.sqrt(this.linkCount);
    }

    normalRelativeBandwidth = () => {
        if (this.throughput > 10) {
            this.throughput /= 2
        }
        return Math.sqrt(this.throughput);
    }

    get r() {
        const normal = this.normalRelativeLink();
        return 3 + normal * 3;
    }

    get color() {
        if (this.colorAnimation === 1) {
            return "hsl(15, 100%, 33%)";
        }
        if (this.colorAnimation === 0) {
            return "hsl(100, 100%, 33%)";
        }
        let normalColor = 85 - this.colorAnimation * 85;
        return "hsl(" + normalColor + ", 100%, 33%)"
    }

    get link() {
        return this.linkCount;
    }

    get fontSize() {
        const normal = this.normalRelativeLink();
        return 6 + normal * 2 + 'px'
    }

    setColorAnimation(colorAnimation: number) {
        this.colorAnimation = colorAnimation;
    }
}
