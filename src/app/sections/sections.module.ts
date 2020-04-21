//Main
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionsRoutingModule } from "./sections-routing.module";
import { EffectsModule } from '@ngrx/effects'
import { environment } from '../../environments/environment';
//ngx
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgProgressModule } from 'ngx-progressbar';
//Store
import { effects} from './effects';
import * as fromActions from './actions';
import * as fromReducers from './reducers';
import { reducers } from "../auth/reducers";
import * as fromServices from './services';
//Containers
import { MainMaintenance } from "./containers/main-maintenance.container";
import { MaintenanceFormContainer } from "./containers/maintenance-form.container";
//Components
import { MaintenanceComponent } from "./components/maintenance.component";
import { EditFilterComponent } from "./components/edit-filter.component";
import { NewFilterComponent } from "./components/new-filter.component";
import { MaintenanceModalComponent } from './components/maintenance-modal.component';
import { ClinicFormComponent } from './components/clinic-form.component';
import { AddressFormComponent } from './components/address-form.component';
import { InvitationFormComponent } from './components/invitation-form.component';
//Services
import { MaintenanceService } from './services/maintenance.service';
import { AsapScheduler } from "rxjs/scheduler/AsapScheduler";
//Pipes
import { ClinicsFilterPipe } from "./pipes/clinics-filter.pipe";
import { ExceptionContainer } from "./containers/exception.container";
import { ClinicNewFormComponent } from "./components/clinic-new-form-component";
//ngx-editor
//import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [
        SectionsRoutingModule,
        StoreModule.forFeature('maintenances', fromReducers.maintenanceReducers),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature(effects),
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgProgressModule
        //NgxEditorModule 
    ],
    providers:[...fromServices.services
    ],
    declarations: [
        //Containers
        MainMaintenance,
        MaintenanceFormContainer,
        //Components
        MaintenanceComponent,
        EditFilterComponent,
        NewFilterComponent,
        MaintenanceModalComponent,
        ClinicFormComponent,
        ClinicNewFormComponent,
        AddressFormComponent,
        InvitationFormComponent,
        //Pipes
        ClinicsFilterPipe,
        //Exception
        ExceptionContainer
    ],
    exports: []
})

export class SectionsModule { }