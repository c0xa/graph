import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {HttpService} from "./logic/models/HttpService";
import {NodeGraph} from "./logic/models/NodeGraph";
import {Link} from "./logic/models/Link";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
    dataArray = [20, 40, 100];
    nodeGraph: NodeGraph[] = [];
    links: Link[] = [];

    canvas = d3.select("body")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)

    circle1 = this.canvas.selectAll("circle")
        .data(this.dataArray)
        .enter()
        .append("circle")
        .attr("cx", function (r) {return r + r})
        .attr("cy", function (r) {return r + r})
        .attr("r", function (r) {return r})
        .attr("fill", "red")
        .attr("text", "1");


    constructor(private httpService : HttpService) {}

    ngOnInit() {
        this.httpService.getNodes().subscribe((data: NodeGraph[]) => this.nodeGraph = data);
        this.httpService.getLinks().subscribe((data: Link[]) => this.links = data);
    }

    ngOnDestroy() {

    }
}
