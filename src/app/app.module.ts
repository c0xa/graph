import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeVisualComponentComponent } from './node-visual-component/node-visual-component.component';
import {HttpService} from "./logic/models/HttpService";
import { D3Service, D3_DIRECTIVES } from './d3';
import {FormsModule} from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent,
        NodeVisualComponentComponent,
        ...D3_DIRECTIVES
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [HttpService, D3Service],
    bootstrap: [AppComponent]
})
export class AppModule { }
