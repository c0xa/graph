import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Link} from "./Link";
import {NodeGraph} from "./NodeGraph";

@Injectable()
export class HttpService{

    dataJson: Observable<any>;

    constructor(private http: HttpClient) {
        this.dataJson = this.http.get('assets/materials.json');
    }

    getLinks() : Observable<Link[]> {
        return this.dataJson.pipe(map((data:any)=>{
            let links = data["links"];
            return links.map(function(link: any): Link {
                return new Link(link.source, link.target, link.value, link.time);
            });
        }));
    }

    getNodes() : Observable<NodeGraph[]> {
        return this.dataJson.pipe(map((data:any)=>{
            let nodes = data["nodes"];
            return nodes.map(function(node: any): NodeGraph {
                return new NodeGraph(node.id);
            });
        }));
    }
}
