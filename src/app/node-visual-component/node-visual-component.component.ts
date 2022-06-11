import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';

import {D3Service, ForceDirectedGraph, Link, NodeGraph} from "../d3";
import {Observable, Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-node-visual-component',
    templateUrl: './node-visual-component.component.html',
    styleUrls: ['./node-visual-component.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeVisualComponentComponent implements OnInit, OnDestroy {
    @Input('nodes') nodes: NodeGraph[] = [];
    @Input('links') links: Link[] = [];
    @Input('switchTheme') isSwitchTheme: boolean = false;
    @Input('stepAnimation') stepAnimation: number = 1;

    graph!: ForceDirectedGraph;
    _options: { width: number, height: number } = {width: 400, height: 400};
    subscription: Subscription = new Subscription();
    observable: Observable<any> = new Observable<any>();
    notifier = new Subject();
    activeNodeID: string = "";

    @HostListener('window:resize')
    onResize() {
        this._options = {
            width: window.innerWidth,
            height: window.innerHeight
        };
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

    get options() {
        return this._options = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    ngOnDestroy() {
        this.unsubscribing();
    }

    active(id: string) {
        this.activeNodeID = id;
    }
}
