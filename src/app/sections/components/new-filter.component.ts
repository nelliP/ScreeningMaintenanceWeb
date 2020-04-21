import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from "rxjs/Observable";
//Forms
import { FormControl, FormGroup, Validators, FormBuilder }   from '@angular/forms';
//Store
import { Store, select, MemoizedSelector } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
//Models
import { Region } from '../models/region.model';
import { FilterValues } from '../models/filter-values.model';
import { ScreeningType } from '../models/screening-type.model';
import { MaintenanceLists } from '../models/maintenance-lists.model';

@Component({
  selector: 'new-filter-component',
  template: `  
  <div class="row custom-row">
  <div class="panel panel-default">
    <div class="panel-heading panel-blue">
      <p>{{title}}</p>
    </div>
    <div class="panel-body"> 
       
    <form class="form-horizontal" 
        [formGroup]="filterForm">

      <fieldset>
        
          <div class="form-group">
            <div class= "col-sm-2">    
              <label for="select">Region</label>
            </div>    
            <div class= "col-sm-10">    
              <select id="select" formControlName="region"  (change)="setFilterValuesRegion()">            
                <option *ngFor = "let region of maintenanceLists.regions"
                [ngValue]="region"
                 > {{region.beskrivning}}, {{region.division}}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <div class= "col-sm-2">  
              <label for="select">Screening Typ</label>
            </div>  
            <div class= "col-sm-10">  
              <select id="select" formControlName="screeningType"  (change)="setFilterValuesScreeningType()">            
                <option *ngFor = "let screeningType of screeningTypes"
                [ngValue]="screeningType"
                 > {{screeningType.type}} 
                </option>
              </select>
            </div>
          </div>

      </fieldset>
    </form>
  </div>
  </div>
</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewFilterComponent implements OnInit {
  @Output() public filterValuesEvent: EventEmitter<FilterValues> = new EventEmitter<FilterValues>();
  @Input('maintenanceListsData') public maintenanceLists : MaintenanceLists;
  @Input('screeningTypeData') public screeningTypes : ScreeningType[];
  
  title: string;
  filterValues: FilterValues;
  filterForm: FormGroup;
  private region: Region;
  private screeningType: ScreeningType;

  constructor (private fb: FormBuilder,
              private store: Store<fromReducers.MaintenanceState>) {
    this.filterForm = this.fb.group({
      region: new FormControl(),
      screeningType: new FormControl()
    });
    this.filterValues = new FilterValues();    
  }
  
  ngOnInit() {        
    this.title = 'Skapa en ny mottagning';
    this.filterValues.openModal = false;   
  }

  setFilterValuesRegion(){    
    if (this.filterValues.openModal == true){
      this.filterValues = this.filterForm.value;  
      this.filterValues.openModal = true;
        this.filterValuesEvent.emit(this.filterValues);        
      }
      this.filterValues = this.filterForm.value;  
    this.filterValuesEvent.emit(this.filterValues);
  }

  setFilterValuesScreeningType(){
    this.filterValues = this.filterForm.value;
    this.filterValues.openModal = true;    
    this.filterValuesEvent.emit(this.filterValues);    
  }
}