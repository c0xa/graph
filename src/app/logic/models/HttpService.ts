import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Link, NodeGraph} from "../../d3";

@Injectable()
export class HttpService {

    private _fileNameJsonData: string = "assets/data/graph/data2.json";
    // private _fileNameJsonData: string = "assets/data/graph/materials.json";
    // private _fileNameJsonData: string = "assets/data/graph/materials.json";
    // private _fileNameAnimationBlock: string = "assets/data/workload/animation-block.txt";
    private _fileNameAnimationBlock: string = "assets/data/workload/animation.txt";
    data: string = ""

    dataJson: Observable<any>;
    private links: Link[] = [];
    private nodeGraph: NodeGraph[] = [];
    products: any = [];
    constructor(private http: HttpClient) {
        this.dataJson = this.http.get(this._fileNameJsonData)
    }

    getData() {
        return this.http.get(this._fileNameJsonData, {responseType: 'text'});
    }

    getDataAnimation() {
        return this.http.get(this._fileNameAnimationBlock, {responseType: 'text'});
    }

    // getNodes(): void {
    //     console.log("this.products soak", this.products);
    //     return this.products["nodes"];
    // }

    // getLinks() :Link[] {
    //     this.getObservableLinks().subscribe((data: Link[]) => this.links = data);
    //     return this.links;
    // }
    //
    // getNodeGraph() :NodeGraph[] {
    //     this.getObservableNodes().subscribe((data: NodeGraph[]) => this.nodeGraph = data);
    //     return this.nodeGraph;
    // }


    getObservableLinks() : Observable<Link[]> {
        return this.dataJson.pipe(map((data:any)=> {
            let links = data["links"];
            return links.map(function(link: any): Link {
                return new Link(link.source, link.target, link.value);
            });
        }));
    }

    getObservableNodes() : Observable<NodeGraph[]> {
        return this.dataJson.pipe(map((data:any)=> {
            let nodes = data["nodes"];
            return nodes.map(function(node: any): NodeGraph {
                return new NodeGraph(node.id);
            });
        }));
    }
}
