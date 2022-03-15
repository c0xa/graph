import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppSettingsService} from "./logic";
import { NodeVisualComponentComponent } from './node-visual-component/node-visual-component.component';
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
        // ...SHARED_VISUALS
    ],
    providers: [AppSettingsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
