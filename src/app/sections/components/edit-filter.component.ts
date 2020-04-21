import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Store, select, MemoizedSelector } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder }   from '@angular/forms';
//Models
import { MaintenanceLists } from '../models/maintenance-lists.model';
import { FilterValues } from '../models/filter-values.model';
import { ScreeningType } from '../models/screening-type.model';
import { Clinic } from '../models/clinic.model';
import { Region } from '../models/region.model';
//Pipes
import { ClinicsFilterPipe } from '../pipes/clinics-filter.pipe';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'edit-filter-component',
  template: `  
<div class="row custom-row">
  <div class="panel panel-default">
    <div class="panel-heading panel-blue">
      <p>{{title}}</p>
    </div>
    <div class="panel-body">
    
    <form class="form-horizontal"  [formGroup]="filterForm" >
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
        
        <div *ngIf="showClinics">
          <div class="form-group">
            <div class= "col-sm-2"> 
              <label for="select">Mottagning</label>
            </div>
            <div class= "col-sm-10"> 
              <select id="select" formControlName="clinic"  (change)="setFilterValuesClinic()">            
                <option *ngFor = "let clinic of maintenanceLists.clinics 
                | clinicsDivisionScreeningFilter: filterValues"
                [ngValue]="clinic"> 
                {{clinic.klartext}} 
                </option>
              </select>
            </div>
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

export class EditFilterComponent implements OnInit {
  @Output() public filterValuesEvent: EventEmitter<FilterValues> = new EventEmitter<FilterValues>();
  @Input('maintenanceListsData') public maintenanceLists : MaintenanceLists;
  @Input('screeningTypeData') public screeningTypes : ScreeningType[];
  
  title: string;
  filterValues: FilterValues;
  showClinics: boolean = false;
  setRegion: boolean = false;
  setScreeningType: boolean = false;

  filterForm: FormGroup;
  private region: Region;
  private screeningType: ScreeningType;
  private clinic: Clinic;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      region: new FormControl(),
      screeningType: new FormControl(),
      clinic: new FormControl()
    });
    this.filterValues = new FilterValues();
  }
  
  ngOnInit() {        
    this.title = 'Redigera en mottagning';
    this.filterValues.openModal = false;
  }

  setFilterValuesRegion(){   
    this.filterValues = this.filterForm.value;  
    this.filterValues.openModal = false;
    this.setRegion = true;
    this.showClinics = this.setScreeningType == true ? true: false;
  }

  setFilterValuesScreeningType(){
    this.filterValues = this.filterForm.value;  
    this.filterValues.openModal ? this.filterValuesEvent.emit(this.filterValues) : false;
    this.setScreeningType = true;
    this.showClinics = this.setRegion == true ? true: false;
  }

  setFilterValuesClinic(){    
    this.filterValues = this.filterForm.value;   
    this.filterValues.address = this.maintenanceLists.addresses.find(a => a.orgbet == this.filterValues.clinic.orgbet);
    this.filterValues.invitation = this.maintenanceLists.invitations.find(i => i.teamOrgbet == this.filterValues.clinic.orgbet);

    this.filterValuesEvent.emit(this.filterValues);
    this.filterValues.openModal = true;
  }
  
}