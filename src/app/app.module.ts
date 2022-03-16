import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeVisualComponentComponent } from './node-visual-component/node-visual-component.component';
import {HttpService} from "./logic/models/HttpService";
import {NgxGraphModule} from "@swimlane/ngx-graph";
// import { SHARED_VISUALS } from './visuals/shared';

@NgModule({
    declarations: [
        AppComponent,
        NodeVisualComponentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxGraphModule,
        // ...SHARED_VISUALS
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
