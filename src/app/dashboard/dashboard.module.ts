import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './containers/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    declarations: [DashboardComponent],
    providers: []
})
export class DashboardModule { }