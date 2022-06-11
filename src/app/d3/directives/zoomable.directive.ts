import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../d3.service';

@Directive({
    selector: '[zoomAbleOf]'
})
export class ZoomableDirective implements OnInit {
    @Input('zoomAbleOf') zoomAbleOf!: HTMLElement;

    constructor(private d3Service: D3Service, private _element: ElementRef) {}

    ngOnInit() {
        this.d3Service.applyZoomAbleBehaviour(this.zoomAbleOf, this._element.nativeElement);
    }
}
