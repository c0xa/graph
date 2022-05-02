import {ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {HttpService} from "./logic/models/HttpService";
import {Link, NodeGraph} from "./d3";
import {Observable} from "rxjs";
import {scaleRadial} from "d3";
import {Constant} from "./data";
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    @ViewChild("slider") slider: ElementRef | undefined;


    httpService: HttpService;

    nodes: NodeGraph[] = [];
    links: Link[] = [];

    isVisualization: boolean = false;

    dataJson: Observable<any> = new Observable;
    mapNodes: Map<string, NodeGraph> = new Map<string, NodeGraph>();
    allLinks: Link[] = [];

    count: number = 0;
    maxCount: number = 0;
    dataJsonString: string = "";
    animationData: string[] = [];
    subscriptionText: any;
    subscriptionAnimation: any;
    interval: number = 0;

    //variable for switching theme; default - dark theme
    isSwitchTheme: boolean = false;
    isError: boolean = false;

    constructor(httpService: HttpService) {
        this.httpService = httpService;

        this.subscriptionText = httpService.getData().subscribe((data: string) => {
            this.dataJsonString = data;
            this.parsing(this.dataJsonString);
        });

        this.subscriptionAnimation = httpService.getDataAnimation().subscribe((data: string) => {
            this.animationData = data.split("\n");
            this.maxCount = this.animationData.length - 1;
        });

        // setTimeout(() => {
        //     SubscriptionText.unsubscribe();
        //     // SubscriptionAnimation.unsubscribe();
        // }, 200);

    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptionText.unsubscribe();
        this.subscriptionAnimation.unsubscribe();
        clearInterval(this.interval);

    }

    parsing(data: string) {
        let objJson;
        try {
            objJson = JSON.parse(data);
        } catch (e) {
            this.isVisualization = false;
            this.isError = true;
            console.log("soak", e)
            return;
        }
        this.isError = false;
        for (const event in objJson){
            const dataCopy = objJson[event];
            for (let key in dataCopy){
                if (event == "Nodes") {
                    this.mapNodes.set(dataCopy[key].ID, new NodeGraph(dataCopy[key].ID))
                } else if (event == "Links") {
                    let source = this.mapNodes.get(dataCopy[key].SourceID);
                    let target = this.mapNodes.get(dataCopy[key].TargetID);
                    if (source && target) {
                        this.allLinks.push(new Link(source, target, dataCopy[key].Bandwidth))
                        this.links.push(new Link(source, target, dataCopy[key].Bandwidth));
                        source.linkCount++;
                        target.linkCount++;
                    }
                }
            }
        }
        this.mapNodes.forEach((key, value) => {
            this.nodes.push(key);
        });
    }


    onSubmitData() {
        this.isVisualization = true
        this.nodes = [];
        this.links = [];
        // if (this.slider) {
        //     this.time = this.slider.nativeElement.value;
        // }
        this.mapNodes = new Map<string, NodeGraph>();
        this.allLinks = [];
        this.dataJsonString = document.forms[0]['textarea'].value;
        this.parsing(this.dataJsonString);
    }

    isExit() {
        this.isVisualization = false;
        clearInterval(this.interval);
    }

    animationStep() {
        clearInterval(this.interval);
        if (this.slider) {
            this.count = this.slider.nativeElement.value;
        }
        if (this.animationData) {
            const rowAnimation = this.animationData[this.count].split(",");
            for (let column = 0; column < rowAnimation.length; column++) {
                const columnAnimation = rowAnimation[column].trim();
                this.nodes[column]?.setColorAnimation(columnAnimation)
            }
        }
    }

    animation() {
        if (this.slider) {
            this.count = this.slider.nativeElement.value;
        }
        // this.count++;
        // // for (let row = 0; row < this.animationData.length; row++) {
    // // // for (let row = 105; row < 106; row++) {
    //     const rowAnimation =  this.animationData[this.count].split(",");
    //     console.log(rowAnimation)
    //     for (let column = 0; column < rowAnimation.length; column++) {
    //         const columnAnimation =  rowAnimation[column];
    //         // console.log(  this.nodes[column])
    //         this.nodes[column].setColorAnimation(columnAnimation)
    //         // setTimeout(() => {},100);
    //     }
    // }
    //     console.log("rime", this.animationData[this.count].split(","),  this.nodes);
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            // console.log(this.nodes)
            // console.log("rime", thi  s.animationData[this.count].split(","),  this.count);
            if (this.count < 372 && this.animationData)  {
                const rowAnimation =  this.animationData[this.count].split(",");
                for (let column = 0; column < rowAnimation.length; column++) {
                    const columnAnimation = rowAnimation[column].trim();
                    // console.log( columnAnimation, this.nodes[column], column)
                    this.nodes[column]?.setColorAnimation(columnAnimation);
                }
                this.count++;
            }
        },200);
    }

    switchTheme() {
        this.isSwitchTheme = !this.isSwitchTheme;
    }
}
