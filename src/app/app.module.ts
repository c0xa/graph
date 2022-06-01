import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeVisualComponentComponent } from './node-visual-component/node-visual-component.component';
import {HttpService} from "./http-logic/HttpService";
import { D3Service, D3_DIRECTIVES } from './d3';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NotFoundComponent} from "./not-found.component";
import { InputGraphComponent } from './input-graph/input-graph.component';
import { InputWorkloadComponent } from './input-workload/input-workload.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        NodeVisualComponentComponent,
        NotFoundComponent,
        ...D3_DIRECTIVES,
        InputGraphComponent,
        InputWorkloadComponent,
        MainMenuComponent,
        TemplateComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [HttpService, D3Service],
    bootstrap: [AppComponent]
})
export class AppModule { }
