import {Component, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-input-box',
    templateUrl: './input-box.component.html',
    styleUrls: ['./input-box.component.less']
})

export class InputBoxComponent implements OnInit, OnChanges {
    @Input() defaultData = "";

    dataJson: string = "";

    constructor() {
        console.log("soak defaultData", this.defaultData);
    }

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.dataJson != "")
        {

            this.defaultData = this.dataJson;
        }
        console.log("update");
    }
    onSubmit() {
        console.log("soak");
        this.dataJson = document.forms[0]['text_area_name'].value;
    }
}
