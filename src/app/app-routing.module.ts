import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {NodeVisualComponentComponent} from "./node-visual-component/node-visual-component.component";
import {NotFoundComponent} from "./not-found.component";

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'visuals', component: NodeVisualComponentComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
