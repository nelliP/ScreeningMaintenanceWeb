import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgProgress } from 'ngx-progressbar';
//Store
import { Store, select } from "@ngrx/store";
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
//Models
import { FilterValues } from '../models/filter-values.model';
import { ScreeningType } from '../models/screening-type.model';
import { MaintenanceLists } from '../models/maintenance-lists.model';

@Component({
  selector: 'app-maintenance',
  template: `
  <div class="page-header">
    <h1>Screening Underhåll</h1>
      <p>Redigera och skapa screeeningmottagningar.</p>        
  </div>

  <div *ngIf="!filterValues.openModal">
  <exception-container></exception-container>
  </div>

  <div *ngIf="maintenanceListsLoading | async">
    <ng-progress [positionUsing]="'marginLeft'" [minimum]="0.15" [maximum]="1"
      [speed]="200" [showSpinner]="true" [direction]="'leftToRightIncreased'"
      [color]="'black'" [trickleSpeed]="250" [thick]="true" [ease]="'linear'">
    </ng-progress>
  </div>

  <div *ngIf="maintenanceListsLoaded | async">
    <div *ngIf="!editOrNew">
      <maintenance-component 
        (editOrNewEvent)="editOrNew=$event">
      </maintenance-component>
    </div>
  </div>

  <div *ngIf="editOrNew">
    <div *ngIf="editOrNew === 'edit'; then thenBlock; else elseBlock">
    </div>
      <ng-template #thenBlock>       
          <edit-filter-component 
            (filterValuesEvent)="filterValues=$event"           
            [screeningTypeData]="screeningTypes" 
            [maintenanceListsData]="maintenanceLists | async">        
          </edit-filter-component>            
      </ng-template>

      <ng-template #elseBlock>
        <new-filter-component 
          (filterValuesEvent)="filterValues=$event"         
          [screeningTypeData]="screeningTypes"
          [maintenanceListsData]="maintenanceLists | async">
        </new-filter-component>
      </ng-template>  
  </div>
 
  <div *ngIf="filterValues.openModal">
    <maintenance-modal 
      [editOrNewData]="editOrNew"  
      [filterData] ="filterValues">     
    </maintenance-modal>
  </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMaintenance implements OnInit{  
  screeningTypes: ScreeningType[];
  editOrNew: string ='';
  edit: boolean = null;
  filterValues: FilterValues = new FilterValues();
  maintenanceLists: Observable<MaintenanceLists> = new Observable<MaintenanceLists>();
  maintenanceListsLoaded: Observable<boolean>;  
  maintenanceListsLoading:  Observable<boolean>;  

  constructor (private store: Store<fromReducers.MaintenanceState>, 
               public ngProgress: NgProgress) {
    this.screeningTypes =  [{type:"BUKAORTA"}, {type:"GYN"}];

    this.maintenanceLists = this.store.pipe(select(fromReducers.getMaintenanceLists));
    this.maintenanceListsLoaded = this.store.pipe(select(fromReducers.getMaintenanceListsLoaded)); 
    this.maintenanceListsLoading = this.store.pipe(select(fromReducers.getMaintenanceListsLoading)); 
  }

  ngOnInit() {    
    //Progressbar
    this.ngProgress.start();

    this.store.dispatch(new fromActions.LoadMaintenanceLists()); 
  }
}