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
    nodeGraph: NodeGraph[] = [];
    links: Link[] = [];

    constructor(private httpService : HttpService) {}

    ngOnInit() {
        this.httpService.getNodes().subscribe((data: NodeGraph[]) => this.nodeGraph = data);
        this.httpService.getLinks().subscribe((data: Link[]) => this.links = data);
    }

    ngOnDestroy() {

    }
}
