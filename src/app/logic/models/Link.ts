
export class Link {
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;

    // must - defining enforced implementation properties
    source: string;
    target: string;
    value: number;
    time: number;

    constructor(source: string, target: string, value: number, time: number) {
        this.source = source;
        this.target = target;
        this.value = value;
        this.time = time;
    }
}
