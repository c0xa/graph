import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Link, NodeGraph} from "../../d3";

@Injectable()
export class HttpService {
    fileName: string = "assets/materials.json";
    // dataJson: Observable<any>;
    private links: Link[] = [];
    private nodeGraph: NodeGraph[] = [];
    products: any = [];
    constructor(private http: HttpClient) {
        // this.dataJson = this.http.get(this.fileName)
        // console.log(" this.dataJson",  this.dataJson)

        // this.http.get(this.fileName).pipe(map(data => {})).subscribe(result => {
        //     console.log(result);
        // });
        // this.http.get(this.fileName).subscribe(data =>{
        //     console.log("data soak", data);
        //     this.products = data;
        // })
    }

    getData(){
        return this.http.get(this.fileName);
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


    // getObservableLinks() : Observable<Link[]> {
    //     return this.dataJson.pipe(map((data:any)=>{
    //         let links = data["links"];
    //         return links.map(function(link: any): Link {
    //             return new Link(link.source, link.target, link.value, link.time);
    //         });
    //     }));
    // }
    //
    // getObservableNodes() : Observable<NodeGraph[]> {
    //     return this.dataJson.pipe(map((data:any)=>{
    //         let nodes = data["nodes"];
    //         return nodes.map(function(node: any): NodeGraph {
    //             return new NodeGraph(node.id);
    //         });
    //     }));
    // }
}
