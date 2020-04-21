import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
//Models
import { FilterValues } from '../models/filter-values.model';
import { Clinic } from '../models/clinic.model';
//Store
import { Store, select } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
//custom validator
import { ValidateIsNotScript } from '../validators/is-not-script.validator';

@Component({
  selector: 'invitation-form-component',
  template: `
<div class="row custom-row">
  <div class="panel panel-default">
    <div class="panel-heading panel-blue">
      <p>{{title}}</p>        
    </div>
    <div class="panel-body"> 

    <form class="form-horizontal"  
      [formGroup]="invitationForm"
      (ngSubmit)="onFormSubmit()" >
      
      <fieldset>

        <div class="row custom-row">
          <div class= "col-sm-3">   
            <label for="orgbet">Orgbet</label>
          </div>
          <div class= "col-sm-9">   
            {{filterValues.invitation.teamOrgbet}}
          </div>
        </div>
        
        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.telNr1" class="text-danger">
              <small>{{formErrors.telNr1}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputTelNr1">Telefonnummer 1</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
            type="text" 
            size="50"
            formControlName = "telNr1"
            id="inputTelNr1"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.telNr2" class="text-danger">
              <small>{{formErrors.telNr2}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputTelNr2">Telefonnummer 2</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
            type="text" 
            size="50"
            formControlName = "telNr2"
            id="inputTelNr2"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.telTid1" class="text-danger">
              <small>{{formErrors.telTid1}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">   
            <label for="inputTeltid1">Telefontid 1</label>
          </div>
          <div class= "col-sm-9">   
            <input class="ng-invalid" 
            type="text"
            size="50"
            formControlName = "telTid1"
            id="inputTeltid1"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.telTid2" class="text-danger">
              <small>{{formErrors.telTid2}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">       
            <label for="inputTelTid2">Telefontid 2</label>
          </div>
          <div class= "col-sm-9">      
            <input class="ng-invalid" 
            type="text"
            size="50" 
            formControlName = "telTid2"
            id="inputTelTid2"
            [readonly]="isReadonly" />
          </div>
        </div>        

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.kommentar" class="text-danger">
              <small>{{formErrors.kommentar}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputKommentar">Kommentar</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
            type="text" 
            size="50"
            formControlName = "kommentar"
            id="inputKommentar"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.webTidbokKommentar" class="text-danger">
              <small>{{formErrors.webTidbokKommentar}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputWebTidbokKommentar">Webkommentar</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" type="text" 
            size="50"
            formControlName = "webTidbokKommentar"
            id="inputWebTidbokKommentar"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.url" class="text-danger">
              <small>{{formErrors.url}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputUrl">Webadress</label>
          </div>
          <div class= "col-sm-9">    
         
            <input class="ng-invalid" 
            type="text" 
            size="50"
            formControlName = "url"
            id="inputUrl"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputEReminderBool">Sms-påminnelse</label>
          </div>
          <div class= "col-sm-1"> 
            <input type="checkbox" formControlName="eReminderBool">             
          </div>
          <div class= "col-sm-8">
            Ja vi erbjuder sms-påminnelse.        
          </div> 
       </div>

        <div *ngIf="!invitationForm.valid" 
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
            [disabled] ="!invitationForm.dirty || submitted" 
            (click)="resetForm(true)" 
            class="btn btn-default">
            Återställ
          </button>
          </div>
          <div class="col-sm-9"> 
          <button type="submit" 
            [disabled] = "!invitationForm.valid || !invitationForm.dirty || submitted" 
            class="btn btn-primary">
            OK
          </button>
        </div>
        </div>

        <div *ngIf="invitationUpdatedSuccess | async" 
              class="row custom-row  text-success bg-success">
          <div class="col-sm-12"> 
            Ändringen sparades!
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

export class InvitationFormComponent implements OnInit { 
  @Input('filterData') public filterValues : FilterValues;
  title: string;
  reset: boolean = false;
  submitted: boolean = false;
  invitationUpdatedSuccess: Observable<boolean>;
  isReadonly: boolean = false;

  invitationForm: FormGroup;
  private teamOrgbet: string;
  private telNr1: string;
  private telNr2: string;
  private telTid1: string;
  private telTid2: string;
  private eReminder: string;
  private eReminderBool: boolean = false;
  private kommentar: string;
  private webTidbokKommentar: string;
  private url: string;

  formErrors = {
    'telNr1': '',   
    'telNr2': '',
    'telTid1': '',
    'telTid2': '',
    'kommentar': '',
    'webTidbokKommentar': '',    
    'url': ''
  };

  validationMessages = {
    'telNr1': {
      'pattern': 'Telefonnummret får bara innehålla 8 - 12 siffror, blanksteg, \"-\" och \"/\".'
    },
    'telNr2': {
      'pattern': 'Telefonnummret får bara innehålla 8 - 12 siffror, blanksteg, \"-\" och \"/\".'
    },
    'telTid1': {
      'pattern': 'Telefontid får ha minst 0 och max 50 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'telTid2': {
      'pattern': 'Telefontid får ha minst 0 och max 50 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'kommentar': {
      'pattern': 'Kommentar får ha minst 0 och max 300 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'webTidbokKommentar': {
      'maxLength': 'Webkommentar får ha max 500 tecken.',
      'webTidbokKommentar': 'Webkommentar får inte innehålla script.'
    },
    'url': {
      'pattern': 'Webadress får ha minst 0 och max 100 tecken, \t får inte innehålla \"<\", \">\".'
    }     
  }

  constructor (private fb: FormBuilder,
              private store: Store<fromReducers.MaintenanceState> ) { 
    this.invitationUpdatedSuccess = this.store.pipe(select(fromReducers.getInvitationsUpdatedSuccess));

    this.invitationUpdatedSuccess.subscribe(data => this.onUpdatedInvitation(data));

    this.invitationForm = this.fb.group({
      id: new FormControl(),
      teamOrgbet: new FormControl(),
      telNr1: new FormControl('', [Validators.pattern('[0-9 -/]{8,12}$')]),
      telNr2: new FormControl('', [Validators.pattern('[0-9 -/]{8,12}$')]),
      telTid1: new FormControl('', [Validators.pattern('[^<^>]{0,50}$')]),
      telTid2: new FormControl('', [Validators.pattern('[^<^>]{0,50}$')]),
      eReminder: new FormControl(),
      eReminderBool: new FormControl(),
      kommentar: new FormControl('', [Validators.pattern('[^<^>]{0,300}$')]),
      webTidbokKommentar: new FormControl('', [Validators.maxLength(500), ValidateIsNotScript(/script/i)]), //https://www.npmjs.com/package/ngx-editor      
      url: new FormControl('', [Validators.pattern('[^<^>]{0,100}$')]),
      updtid: new FormControl()
    });

    this.invitationForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit(){
    this.title = 'Inbjudan';
    this.setPatchValue();
  }
  onValueChanged(data?: any) {
    if (!this.invitationForm) {return;}
    const form = this.invitationForm;

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
  }

  onUpdatedInvitation(isAddressUpdated: boolean){
    if(isAddressUpdated){     
      this.isReadonly = true;
      this.invitationForm.disable;
    }
  }

  resetForm(reset: boolean){
    if (reset == true){    
      this.setPatchValue();
    }
    this.reset = reset;
  }
  
  onFormSubmit(){
    if(this.invitationForm.valid && this.invitationForm.dirty) {
      this.filterValues.invitation = this.invitationForm.value;
      this.filterValues.invitation.eReminder = this.invitationForm.value.eReminderBool == true ?  'J' : 'N';
     
      this.submitted = true;
      this.store.dispatch(new fromActions.UpdateInvitation(this.filterValues.invitation));    
    }
  }

  setPatchValue() {
    var invitation = this.filterValues.invitation;
    this.invitationForm.patchValue({
      id: invitation.id,
      teamOrgbet: invitation.teamOrgbet,
      telNr1: invitation.telNr1,
      telNr2: invitation.telNr2,
      telTid1: invitation.telTid1,
      telTid2: invitation.telTid2,
      eReminder: invitation.eReminder,
      eReminderBool: invitation.eReminder === 'N' ? false : true,
      kommentar: invitation.kommentar,
      webTidbokKommentar: invitation.webTidbokKommentar,
      url: invitation.url,
      updtid: invitation.updtid
    })
  }
}