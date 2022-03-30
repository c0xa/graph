import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnChanges, OnDestroy,
    OnInit
} from '@angular/core';

import {D3Service, ForceDirectedGraph, Link, NodeGraph} from "../d3";
import {Observable, Subject, Subscription} from "rxjs";
import {take, takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-node-visual-component',
    templateUrl: './node-visual-component.component.html',
    styleUrls: ['./node-visual-component.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeVisualComponentComponent implements OnInit, OnChanges, OnDestroy {
    @Input('nodes') nodes: NodeGraph[] = [];
    @Input('links') links: Link[] = [];

    graph!: ForceDirectedGraph;
    _options: { width: number, height: number } = {width: 400, height: 400};
    subscription: Subscription = new Subscription();
    observable: Observable<any> = new Observable<any>();
    notifier = new Subject();

    @HostListener('resize')
    onResize() {
        this.graph.initSimulation(this.options);
    }

    ngOnChanges() {
        this.unsubscribing();
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
        this.subscribing();
        this.graph.initSimulation(this.options);
    }

    constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        /** Receiving an initialized simulated graph from our custom d3 service */
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

        /** Binding change detection check on each tick
         * This along with an onPush change detection strategy should enforce checking only when relevant!
         * This improves scripting computation duration in a couple of tests I've made, consistently.
         * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
         */
        this.subscribing();
    }

    subscribing() {
        this.subscription = this.graph.ticker.pipe(takeUntil(this.notifier)).subscribe(() => {
            this.ref.markForCheck();
        });
    }

    unsubscribing() {
        this.notifier.next();
        this.subscription.unsubscribe()
    }


    ngAfterViewInit() {
        this.graph.initSimulation(this.options);
    }

    get options() {
        // const innerWidth = (window.innerWidth * 0.4) > 300 ? (window.innerWidth * 0.4) : 300;
        // const innerHeight = (window.innerHeight * 0.45) > 200 ? (window.innerHeight * 0.45) : 200;
        const innerWidth = window.innerWidth < 600 ? (window.innerWidth * 0.4) : window.innerWidth - 300;
        const innerHeight = window.innerHeight < 600 ? (window.innerHeight * 0.45) : window.innerHeight - 300;
        return this._options = {
            width: innerWidth,
            height: innerHeight
        };
    }

    ngOnDestroy() {
        this.unsubscribing();
    }
}
