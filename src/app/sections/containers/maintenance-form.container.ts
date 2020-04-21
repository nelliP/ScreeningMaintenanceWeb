import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//Models
import { FilterValues } from '../models/filter-values.model';
import { Maintenance } from '../models/maintenance.model';
import { Clinic } from '../models/clinic.model';
//Store
import { Store, select } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';

@Component({
  selector: 'maintenance-form-container',
  template: `  
<div *ngIf="contentLoaded">

  <div *ngIf="editOrNew === 'edit'; then editBlock; else newBlock"></div>    
    
      <ng-template #editBlock>    

        <clinic-form-component
          [editOrNewData]="editOrNew"  
          [filterData] ="filterValues">    
          (filterValuesEvent)="savedNewMaintenance($event)" 
        </clinic-form-component>

        <div *ngIf="!hide">
          <address-form-component
            [filterData] ="filterValues">
          </address-form-component>
          
          <invitation-form-component
            [filterData] ="filterValues">
          </invitation-form-component>
        </div>

      </ng-template>     
      
    <ng-template #newBlock>   
      <div *ngIf="!(maintenanceUpdatedSuccess | async)">  
          <clinic-new-form-component   
            [filterData] ="filterValues">  
          </clinic-new-form-component>      
      </div>
      
      <div *ngIf="maintenanceUpdatedSuccess | async">

        <clinic-form-component
          [editOrNewData]="editOrNew"    
          [maintenanceUpdatedData]="maintenanceUpdated | async"  
          (filterValuesEvent)="savedNewMaintenance($event)" 
          [filterData] ="filterValues">  
        </clinic-form-component>

        <div *ngIf="!hide">
          <address-form-component
            [filterData] ="filterValues">
          </address-form-component>
          
          <invitation-form-component
            [filterData] ="filterValues">
          </invitation-form-component>
        </div>

      </div>

    </ng-template>   
   
</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceFormContainer implements OnInit, AfterContentInit {  
  @Input('editOrNewData') public editOrNew : string;
  @Input('filterData') public filterValues : FilterValues;
  @Input('maintenanceData') public maintenance : Maintenance;
  contentLoaded: boolean = false;  
  hide: boolean = false;
  maintenanceUpdatedSuccess: Observable<boolean>;
  public maintenanceUpdated: Observable<Clinic>;
  clinicUpdatedSuccess: Observable<boolean>;
  clinicUpdated: Observable<Clinic>;

  constructor(private store: Store<fromReducers.MaintenanceState>) {
    this.maintenanceUpdatedSuccess = this.store.pipe(select(fromReducers.getMaintenanceUpdatedSuccess));
    this.maintenanceUpdated = this.store.pipe(select(fromReducers.getMaintenanceUpdated));

    this.clinicUpdatedSuccess = this.store.pipe(select(fromReducers.getClinicsUpdatedSuccess));
    this.clinicUpdated = this.store.pipe(select(fromReducers.getClinicUpdated));
    this.clinicUpdatedSuccess.subscribe(data => this.onUpdatedClinic(data));    
   }

  ngOnInit() {    
    if(this.maintenance != null){      
      this.newFilterValues();
    }
  }

  ngAfterContentInit(): void {
    this.contentLoaded = true;
  }

  onUpdatedClinic(isUpdatedClinic:boolean){
    var clinic: Clinic;
    if(isUpdatedClinic){     
      this.clinicUpdated.subscribe(data => clinic = data);
      this.hide = clinic.orgbet === '' ? true : false;
    }
  }

  newFilterValues(){
    this.filterValues.clinic = this.maintenance.clinic;
    this.filterValues.address = this.maintenance.address;
    this.filterValues.invitation = this.maintenance.invitation;
  }

  savedNewMaintenance(values: FilterValues){
  this.filterValues = values;
  }
}