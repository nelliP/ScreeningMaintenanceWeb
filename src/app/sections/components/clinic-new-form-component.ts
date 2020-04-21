import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
//Models
import { FilterValues } from '../models/filter-values.model';
import { Maintenance } from '../models/maintenance.model';
import { Clinic } from '../models/clinic.model';
//Store
import { Store, select } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
//custom validator
import { ValidateShortTitle } from '../validators/short-title.validator';
//ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { svLocale } from 'ngx-bootstrap/locale';

// defineLocale('sv', svLocale);
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'clinic-new-form-component',
  template: `
  NEW
<div class="row custom-row">
  <div class="panel panel-default">
    <div class="panel-heading panel-blue">
    <p>{{title}} - {{titleExt}}</p>        
    </div>
    <div class="panel-body"> 

    <form class="form-horizontal"  
      [formGroup]="clinicForm" 
      (ngSubmit)="onFormSubmit()">
      
      <fieldset>      

        <div class="row custom-row">
          <div class= "col-sm-3">   
            <label for="orgbet">Orgbet </label>
          </div>
          <div class= "col-sm-9">   
            {{filterValues.clinic.orgbet}}
          </div>
        </div>
        
        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.klartext" class="text-danger">
              <small>{{formErrors.klartext}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">        
            <label [class]="isRequired(clinicForm.controls.klartext.invalid)" for="inputKlartext">Mottagning</label>
            </div>         
          <div class= "col-sm-9">             
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "klartext"
              id="inputKlartext"
              [(ngModel)]="titleExt" />
          </div>          
        </div>
      
        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.avdTeam" class="text-danger">
              <small>{{formErrors.avdTeam}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label [class]="isRequired(clinicForm.controls.avdTeam.invalid)" for="inputAvdTeam">Förkortning</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "avdTeam"
              id="inputAvdTeam" />
          </div>          
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.ansvar" class="text-danger">
              <small>{{formErrors.ansvar}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label [class]="isRequired(clinicForm.controls.ansvar.invalid)" for="inputAnsvar">Ansvarsnummer</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "ansvar"
              id="inputAnsvar" />
          </div>          
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.irkNr" class="text-danger">
              <small>{{formErrors.irkNr}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputIrkNr">Irk-Nummer</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "irkNr"
              id="inputIrkNr">
          </div>          
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9">
            <div *ngIf="formErrors.orgbetRemklin" class="text-danger">
              <small>{{formErrors.orgbetRemklin}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputOrgbetRemklin">Remitterande Klinik</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "orgbetRemklin"
              id="inputOrgbetRemklin">
          </div>          
        </div>        

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.orgbetSvarsklin" class="text-danger">
              <small>{{formErrors.orgbetSvarsklin}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputOrgbetSvarsklin">Svarsklinik</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "orgbetSvarsklin"
              id="inputOrgbetSvarsklin">
          </div>          
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.orgbetDebklin" class="text-danger">
              <small>{{formErrors.orgbetDebklin}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputOrgbetDebklin">Debiteringsklinik</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "orgbetDebklin"
              id="inputOrgbetDebklin">
          </div>          
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.hsaId" class="text-danger">
              <small>{{formErrors.hsaId}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label [class]="isRequired(clinicForm.controls.hsaId.invalid)" for="inputHsaId">HSA-id</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
              type="text" 
              size="50"
              formControlName = "hsaId"
              id="inputHsaId" />
          </div>          
        </div>

        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputAvdServiceBool">MVK</label>
          </div>
          <div class= "col-sm-2"> 
           <input type="checkbox" formControlName = "avdServiceBool">             
          </div>
          <div class= "col-sm-7">
           Ja gör en koppling till  mina vårdkontakter.        
          </div>          
        </div>

        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputEremissBool">E-Remiss</label>
          </div>
          <div class= "col-sm-2"> 
           <input type="checkbox" formControlName = "eremissBool">             
          </div>
          <div class= "col-sm-7">
           Ja vi erbjuder e-remiss.        
          </div>          
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9">
            <div *ngIf="formErrors.fomDat" class="text-danger">
              <small>{{formErrors.fomDat}}</small>
            </div>          
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label [class]="isRequired(clinicForm.controls.fomDat.invalid)" for="inputFomDat">Från och med</label>
          </div>
          <div class="col-xs-9 col-9 col-sm-6 col-md-4">
            <input class="ng-invalid" 
              type="text" 
              class="form-control" 
              placeholder="Från och med Datum" 
              bsDatepicker 
              formControlName="fomDat" 
              id="inputFomDat"
              [bsConfig]="dateConfig" />
          </div>                    
        </div>

        <div *ngIf="clinicForm.controls.tomDat.invalid && clinicForm.controls.tomDat.dirty" 
              class="row custom-row  text-danger">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
          Till och med fel
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputTomDat">Till och med</label>
          </div>           
          <div class="col-xs-9 col-9 col-sm-6 col-md-4">
            <input class="ng-invalid" 
              type="text" 
              class="form-control" 
              placeholder="Till och med datum" 
              bsDatepicker 
              formControlName="tomDat" 
              id="inputTomDat"
              [bsConfig]="dateConfig" />
          </div>               
        </div>

        <div *ngIf="!clinicForm.valid" 
              class="row custom-row  text-danger">          
              <div class="col-sm-3">            
              </div>
              <div class="col-sm-9"> 
                Fel i formuläret
              </div>
        </div> 
        <div class="form-group">
          <div class="col-sm-3"> 
            <button type="button" 
              [disabled]="!clinicForm.dirty || submitted" 
              (click)="resetForm(true)" 
              class="btn btn-default">
              Återställ
            </button>
          </div>
          <div class="col-sm-9"> 
            <button type="submit" 
              [disabled]="!clinicForm.valid || !clinicForm.dirty || submitted"  
              class="btn btn-primary">
              OK
            </button>
          </div>          
        </div>

      </fieldset>      
    </form>
    </div>
  </div>
</div>   
   <div class="row">
   <div class="col-xs-12 col-md-12">
     <pre class="code-preview">Form{{clinicForm.value | json}}</pre>
   </div>
 </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ClinicNewFormComponent implements OnInit { 
  @Input('filterData') public filterValues : FilterValues;
  @Output() public filterValuesEvent: EventEmitter<FilterValues> = new EventEmitter<FilterValues>();
 
  private title: string;
  private titleExt: string;
  private reset: boolean = false;
  private submitted: boolean = false;
  private maintenance: Maintenance = new Maintenance();  
  private controlLabelRequired: string = 'control-label required';
  public shortTitlesObs = new Observable<string[]>();
  clinicUpdatedSuccess: Observable<boolean>;
  maintenanceUpdatedSuccess: Observable<boolean>;

  private clinicForm: FormGroup;
  private klartext: string;
  private avdTeam: string;//Förkortning
  private ansvar: string;
  private orgbetRemklin: string;
  private avdServiceBool: boolean = false;
  private avdService: string;
  private irkNr: string;
  private orgbetSvarsklin: string;//Svarsklinik
  private orgbetDebklin: string;//Debiteringsklinik
  private hsaId: string;//HSA-id
  private eremiss: number;
  private fomDat: Date; //giltig från och med
  private tomDat: Date; //giltig till och med

  dateConfig: Partial<BsDatepickerConfig>;

  formErrors = {
    'klartext': '',
    'avdTeam': '',    
    'ansvar': '',
    'orgbetRemklin': '',
    'irkNr': '',
    'orgbetSvarsklin': '',
    'orgbetDebklin': '',    
    'hsaId': '',
    'fomDat': ''
  };

  validationMessages = {
    'klartext': {
      'required': 'Mottagningens namn måste anges.',
      'pattern': 'Mottagning får ha minst 5 och max 70 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'avdTeam': {
      'required': 'Förkortning måste anges.',
      'pattern': 'Förkortning får ha minst 3 och max 10 tecken, \t får inte innehålla \"<\", \">\".',
      'avdTeam': 'Förkortning finns redan.'
    },
    'ansvar': {
      'required': 'Ansvarsnummer måste anges.',
      'pattern': 'Ansvarsnummer får ha minst 5 och max 6 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'irkNr': {
      'pattern': 'Irk-Nummer får ha minst 1 och max 9 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'orgbetRemklin': {
      'pattern': 'Remitterande Klinik får ha minst 1 och max 10 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'orgbetSvarsklin': {
      'pattern': 'Svarsklinik får ha minst 1 och max 10 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'orgbetDebklin': {
      'pattern': 'Debiteringsklinik får ha minst 1 och max 10 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'hsaId': {
      'required': 'HSA-id måste anges.',
      'pattern': 'HSA-id får ha minst 1 och max 10 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'fomDat': {
      'required': 'Från och med måste anges!'
    }        
  }

  constructor(private fb: FormBuilder, 
              private store: Store<fromReducers.MaintenanceState>,
              private _localeService: BsLocaleService ) {
    defineLocale('sv', svLocale);
    moment.locale('sv');
    this._localeService.use('sv');
    this.clinicUpdatedSuccess = this.store.pipe(select(fromReducers.getClinicsUpdatedSuccess));
    this.maintenanceUpdatedSuccess = this.store.pipe(select(fromReducers.getMaintenanceUpdatedSuccess));
    this.shortTitlesObs = this.store.pipe(select(fromReducers.getShortTitles));
 
    this.clinicForm = this.fb.group({
      id: new FormControl(),
      orgbet: new FormControl(),
      klartext: new FormControl('', [Validators.required, Validators.pattern('[^<^>]{5,70}$')]),   
      avdTeam: new FormControl('', [Validators.required, Validators.pattern('[^<^>]{3,10}$'), ValidateShortTitle(this.shortTitlesObs)]),  
      avdText: new FormControl(),  
      vrdkod: new FormControl(),  
      sjukhus: new FormControl(),  
      huskropp: new FormControl(),     
      ansvar: new FormControl('', [Validators.required, Validators.pattern('[^<^>]{5,6}$')]),
      databasId: new FormControl(),
      verkOmr: new FormControl(),
      orgbetRemklin: new FormControl('', [Validators.pattern('[^<^>]{1,10}$')]),
      nivaa: new FormControl(),
      avdServiceBool: new FormControl(),
      avdService: new FormControl(),
      division: new FormControl(),
      orgbetOver: new FormControl(),
      irkNr: new FormControl('', [Validators.pattern('[^<^>]{1,9}$')]),
      orgbetSvarsklin: new FormControl('', [Validators.pattern('[^<^>]{1,10}$')]),
      orgbetDebklin: new FormControl('', [Validators.pattern('[^<^>]{1,10}$')]),
      hsaId: new FormControl('', [Validators.required, Validators.pattern('[^<^>]{1,64}$')]),
      eremissBool: new FormControl(),
      eremiss: new FormControl(),
      fomDat: new FormControl('', [Validators.required]),
      tomDat: new FormControl(),
      updtid: new FormControl()
    });

    this.clinicForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }  
  
  ngOnInit(){
    this.title = 'Ny Mottagning'
    this.titleExt = this.filterValues.clinic.klartext;
    this.setPatchValue(this.filterValues.clinic);
    this.dateConfig = Object.assign({}, { 
      dateInputFormat: 'YYYY-MM-DD', 
      containerClass: 'theme-dark-blue',
      minDate: new Date(this.clinicForm.value.fomDat) });
  }

  onValueChanged(data?: any) {
    if (!this.clinicForm) {return;}
    const form = this.clinicForm;

    for (const field in this.formErrors) {
      const control = form.get(field);
      this.formErrors[field] = '';
      
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
          
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    this.dateConfig = Object.assign({}, { 
      dateInputFormat: 'YYYY-MM-DD', 
      containerClass: 'theme-dark-blue',
      minDate: new Date(this.clinicForm.value.fomDat) });
  }

  resetForm(reset: boolean){
    if (reset == true){    
      this.setPatchValue(this.filterValues.clinic);
    }
    this.reset = reset;
  }
 
  onFormSubmit(){
    if(this.clinicForm.valid && this.clinicForm.dirty){ 
      this.filterValues.clinic = this.clinicForm.value;
      this.filterValues.clinic.avdService = this.clinicForm.value.avdServiceBool == true ? 'VC' : '';
      this.filterValues.clinic.eremiss = this.clinicForm.value.eremissBool == true ? 1 : 0;    
      if(this.filterValues.clinic.tomDat == null){
        this.filterValues.clinic.tomDat = moment.utc('0001-01-01').toDate();
      }
    }
 
      this.maintenance.clinic = this.filterValues.clinic;
      this.maintenance.address = this.filterValues.address;
      this.maintenance.invitation = this.filterValues.invitation;
      this.maintenance.region = this.filterValues.region;
      this.filterValuesEvent.emit(this.filterValues);      
      this.store.dispatch(new fromActions.UpdateNewMaintenance(this.maintenance));
  }

  isRequired(myFormControlName : boolean): string{
    this.controlLabelRequired = 'control-label required';
    if( myFormControlName == false){
      this.controlLabelRequired = 'control-label';
    }
    return this.controlLabelRequired;    
  }

  setPatchValue(clinic: Clinic){ 
    this.clinicForm.patchValue({
      id: clinic.id,
      orgbet: clinic.orgbet,
      klartext: clinic.klartext,
      avdTeam: clinic.avdTeam.toUpperCase(),
      avdText: clinic.avdText === "" ? clinic.avdTeam : clinic.avdText,     
      vrdkod: clinic.vrdkod,
      sjukhus: clinic.sjukhus,
      huskropp: clinic.huskropp,
      ansvar: clinic.ansvar,
      databasId: clinic.databasId,
      verkOmr: clinic.verkOmr,
      orgbetRemklin: clinic.orgbetRemklin,
      nivaa: clinic.nivaa,
      avdService: clinic.avdService,
      avdServiceBool: clinic.avdService === 'VC' ? true : false,
      orgbetSvarsklin: clinic.orgbetSvarsklin,
      division: clinic.division,
      orgbetOver: clinic.orgbetOver,
      irkNr: clinic.irkNr,
      orgbetDebklin: clinic.orgbetDebklin,
      hsaId: clinic.hsaId,
      eremiss: clinic.eremiss,
      eremissBool: clinic.eremiss == 1 ? true : false,
      fomDat: moment.utc(clinic.fomDat).toString() === 'Mon Jan 01 0001 00:00:00 GMT+0000' ? null : moment.utc(clinic.fomDat).toDate(),
      tomDat: moment.utc(clinic.tomDat).toString() === 'Mon Jan 01 0001 00:00:00 GMT+0000' ? null : moment.utc(clinic.tomDat).toDate(),
      updtid: clinic.updtid
    })
  }
}