import {NodeGraph} from "./NodeGraph";

export class Link {
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;

    // must - defining enforced implementation properties
    source?: HTMLElement;
    target?: HTMLElement;
    sourceName: string;
    targetName: string;
    value: number;
    time: number;

    constructor(source: string, target: string, value: number, time: number) {
        this.sourceName = source;
        this.targetName = target;
        this.value = value;
        this.time = time;
    }

    getX(): number {
        console.log("soak setSourceAndTarget")
        this.source = document.getElementById(this.sourceName) || undefined;
        this.target = document.getElementById(this.targetName) || undefined;
        console.log("id", this.sourceName, "x", this.source)
        return 2;
        // return document.querySelector("." + this.sourceName);
    }

    getPosition(el: HTMLElement | null): { x: number; y: number } {
        var xPos = 0;
        var yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    }
}
