import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import {HttpService} from "./logic/models/HttpService";
import {Link, NodeGraph} from "./d3";
import {Observable} from "rxjs";


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
    dataJsonString: string = "";
    animationString: string = "";
    animationData: string[] = [];

    activeAnimationChange: number = -1;
    animationChange: number[] = [];
    animationWidth: number = 0;
    animationHeight: number = 0;

    subscriptionText: any;
    subscriptionAnimation: any;
    interval: number = 0;

    maxAnimationStep: number = 372;

    isPause: boolean = true;

    //variable for switching theme; default - dark theme
    isSwitchTheme: boolean = false;
    isHideVisualizationForm: boolean = false;
    isError: boolean = false;
    changeText: boolean = false;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
        this.subscriptionText = httpService.getData().subscribe((data: string) => {
            this.dataJsonString = data;
            this.parsingData(this.dataJsonString);
        });

        this.subscriptionAnimation = httpService.getDataAnimation().subscribe((data: string) => {
            this.animationString = data;
            this.parsingAnimation(data);
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptionText.unsubscribe();
        this.subscriptionAnimation.unsubscribe();
        clearInterval(this.interval);

    }

    parsingAnimation(data: string) {
        const regularIsDigit = /(1[,\n])|(0(,)|(.\d+[,\n]))/;
        const regularIsAlphabet = /[A-Za-z]/;
        this.animationChange = [];
        const isTesting = regularIsDigit.test(data) && !regularIsAlphabet.test(data);
        if (!isTesting) {
            this.isVisualization = false;
            this.isError = true;
            return;
        }
        this.isError = false;
        this.animationData = data.split("\n");
        this.animationData.forEach((value => {
            let count = value.split(",").filter((value) => value !== "0" && value !== "0\r").length;
            this.animationChange.push(count);
        }))
        this.maxAnimationStep = this.animationData.length - 1;
        this.animationWidth = (window.innerWidth - 100)  / this.animationData.length;
        this.animationHeight = 110 / Math.max(...this.animationChange);
        if (this.animationWidth === Number.NEGATIVE_INFINITY || this.animationWidth == Number.POSITIVE_INFINITY) {
            this.animationWidth = 5;
        }
        if (this.animationWidth <= 0) {
            this.animationWidth = 1;
        }
        //the file with data graph is heaviest  -> loader should be hidden after parsing data
        const loader = document.querySelector(".page-loader")
        if (loader) {
            loader.classList.add("hidden")
        }
    }


    parsingData(data: string) {
        let objJson;
        try {
            objJson = JSON.parse(data);
        } catch (e) {
            this.isVisualization = false;
            this.isError = true;
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
        this.mapNodes = new Map<string, NodeGraph>();
        this.allLinks = [];
        this.dataJsonString = document.forms[0]['textareaData'].value;
        this.animationString = document.forms[0]['textareaAnimation'].value;
        this.parsingData(this.dataJsonString);
        this.parsingAnimation(this.animationString)
    }

    isExit() {
        this.isVisualization = false;
        this.isPause = true;
        this.count = 0;
        clearInterval(this.interval);
    }

    animation() {
        this.isPause = !this.isPause;
        if (this.slider) {
            this.count = this.slider.nativeElement.value;
        }
        clearInterval(this.interval);
        if (this.count < this.maxAnimationStep && !this.isPause) {
            this.interval = setInterval(() => {
                if (this.count < this.maxAnimationStep && this.animationData)  {
                    const rowAnimation =  this.animationData[this.count].split(",");
                    for (let column = 0; column < rowAnimation.length; column++) {
                        const columnAnimation = rowAnimation[column].trim();
                        this.nodes[column]?.setColorAnimation(+columnAnimation);
                    }
                    this.count++;
                }
                else {
                    this.isPause = true;
                    clearInterval(this.interval);
                }
            },200);
        } else {
            this.isPause = true;
            clearInterval(this.interval);
        }
    }

    animationTick() {
        if (this.slider) {
            this.count = this.slider.nativeElement.value;
        }
        if (this.count < this.maxAnimationStep) {
            if (this.count < this.maxAnimationStep && this.animationData) {
                const rowAnimation = this.animationData[this.count].split(",");
                for (let column = 0; column < rowAnimation.length; column++) {
                    const columnAnimation = rowAnimation[column].trim();
                    this.nodes[column]?.setColorAnimation(+columnAnimation);
                }
            }
        }
    }

    switchTheme() {
        this.isSwitchTheme = !this.isSwitchTheme;
    }

    hideVisualizationForm() {
        this.isHideVisualizationForm = !this.isHideVisualizationForm;
    }
}
