import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMaintenance } from './containers/main-maintenance.container';

const routes: Routes = [
    { 
        path: '', 
        component: MainMaintenance, 
        pathMatch: 'full',
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SectionsRoutingModule { }