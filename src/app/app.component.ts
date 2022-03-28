import {ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {HttpService} from "./logic/models/HttpService";
import {Link, NodeGraph} from "./d3";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {InputBoxComponent} from "./input-box/input-box.component";
import {scaleRadial} from "d3";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

    @ViewChild("slider") slider: ElementRef | undefined;

    time: number = 0;
    nodes: NodeGraph[] = [];
    links: Link[] = [];

    state: number = 2;

    dataJson: Observable<any> = new Observable;
    mapNodes: Map<string, NodeGraph> = new Map<string, NodeGraph>();
    defaultData = "{\n" +
        "    \"nodes\": [\n" +
        "        {\n" +
        "            \"id\" : \"toto\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\" : \"2\"\n" +
        "        }\n" +
        "    ],\n" +
        "    \"links\": [ {\n" +
        "            \"source\": \"toto\",\n" +
        "            \"target\": \"2\",\n" +
        "            \"value\": 100,\n" +
        "            \"time\": 1\n" +
        "        }]\n" +
        "}\n";

    dataJsonString: string = "";

    constructor(private httpService: HttpService, private cd: ChangeDetectorRef) {
        const N = 3
        /** constructing the nodes array */
        for (let i = 1; i <= N; i++) {
            this.nodes.push(new NodeGraph(String(i), this.nodes.length));
        }
        // // this.nodes.push(new NodeGraph("1"));
        // // this.nodes.push(new NodeGraph("2"));
        // console.log("soak node ",   this.nodes);
        // this.links.push(new Link(this.nodes[0], this.nodes[1], 0, 0));
        // this.nodes[0].linkCount++;
        // this.nodes[1].linkCount++;
        this.parsing(this.defaultData);

    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    parsing(data: string) {
        let objJson = JSON.parse(data);
        for(const event in objJson){
            const dataCopy = objJson[event];
            for (let key in dataCopy){
                if (event == "nodes") {
                    this.mapNodes.set(dataCopy[key].id, new NodeGraph(dataCopy[key].id, this.nodes.length))
                } else if (event == "links") {
                    let source = this.mapNodes.get(dataCopy[key].source);
                    let target = this.mapNodes.get(dataCopy[key].target);
                    if (source && target) {
                        if (Number(dataCopy[key].time) === Number(this.time)) {
                            this.links.push(new Link(source, target, dataCopy[key].value, dataCopy[key].time));
                            source.linkCount++;
                            target.linkCount++;
                        }
                    }
                }
            }
        }
        this.mapNodes.forEach((key, value) => {
            this.nodes.push(key);
        });
    }

    changeMain(state: number) {
        if (state !== this.state) {
            this.state = state;
            switch (state) {
                case 1:
                    console.log("1")
                    break;
                case 2:
                    console.log("2")
                    break;
                case 3:
                    console.log("3")
                    break;
            }
        }
    }

    onSubmit() {
        console.log( this.nodes)
        this.nodes = [];
        this.links = [];
        this.time = 1;
        if (this.slider) {
            this.time = this.slider.nativeElement.value;
        }
        this.mapNodes = new Map<string, NodeGraph>();
        this.dataJsonString = document.forms[0]['text_area_name'].value;
        this.parsing(this.dataJsonString);
    }
}
