import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import {HttpService} from "./logic/models/HttpService";
import {Link, NodeGraph} from "./d3";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {InputBoxComponent} from "./input-box/input-box.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
    nodes: NodeGraph[] = [];
    links: Link[] = [];
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

    dataJson: string = "";
    ngOnInit(){}
    ngOnDestroy() {

    }

    constructor(httpService: HttpService, private cd: ChangeDetectorRef) {
        const N = 3

        /** constructing the nodes array */
        // for (let i = 1; i <= N; i++) {
        //     this.nodes.push(new NodeGraph(String((i))));
        // }
        // // this.nodes.push(new NodeGraph("1"));
        // // this.nodes.push(new NodeGraph("2"));
        // console.log("soak node ",   this.nodes);
        // this.links.push(new Link(this.nodes[0], this.nodes[1], 0, 0));
        // this.nodes[0].linkCount++;
        // this.nodes[1].linkCount++;
        this.parsing(this.defaultData);

    }


    parsing(data: string) {
        let objJson = JSON.parse(data);
        for(const event in objJson){
            const dataCopy = objJson[event];
            for (let key in dataCopy){
                if (event == "nodes") {
                    this.mapNodes.set(dataCopy[key].id, new NodeGraph(dataCopy[key].id, this.cd))
                } else if (event == "links") {
                    let source = this.mapNodes.get(dataCopy[key].source);
                    let target = this.mapNodes.get(dataCopy[key].target);
                    if (source && target) {
                        this.links.push(new Link(source, target, dataCopy[key].value, dataCopy[key].time));
                        source.linkCount++;
                        target.linkCount++;
                    }
                }
            }
        }
        this.mapNodes.forEach((key, value) => {
            this.nodes.push(key);
        });
        console.log("soak n", this.nodes)
    }

    onSubmit() {
        this.nodes = [];
        this.links = [];
        this.mapNodes = new Map<string, NodeGraph>();
        console.log("soak");
        this.dataJson = document.forms[0]['text_area_name'].value;
        this.parsing(this.dataJson);
        this.cd.detectChanges();
    }
}
