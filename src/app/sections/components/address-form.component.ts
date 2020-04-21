import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//Models
import { FilterValues } from '../models/filter-values.model';
import { Clinic } from '../models/clinic.model';
//Store
import { Store, select } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'address-form-component',
  template: `
  
<div class="row custom-row">
  <div class="panel panel-default">
    <div class="panel-heading panel-blue">
      <p>{{title}}</p>
    </div>
    <div class="panel-body"> 
    
    <form class="form-horizontal" 
      [formGroup]="addressForm"
      (ngSubmit)="onFormSubmit()">
      
      <fieldset>

        <div class="row custom-row">
          <div class= "col-sm-3">   
            <label for="orgbet">Orgbet</label>
          </div>
          <div class= "col-sm-9">   
            {{filterValues.address.orgbet}}
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.gAdress" class="text-danger">
              <small>{{formErrors.gAdress}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">   
            <label [class]="isRequired(addressForm.controls.gAdress.invalid)" for="inputGAdress">Gatuadress</label>
          </div>
          <div class= "col-sm-9">   
            <input class="ng-invalid" 
            type="text"
            size="50"
            formControlName = "gAdress"
            id="inputGAdress"
            [readonly]="isReadonly" />
          </div>
        </div>

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.postNr" class="text-danger">
              <small>{{formErrors.postNr}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">       
            <label [class]="isRequired(addressForm.controls.postNr.invalid)" for="inputPostNr">Postnummer</label>
          </div>
          <div class= "col-sm-9">      
            <input class="ng-invalid" 
            type="text"
            size="50" 
            formControlName = "postNr"
            id="inputPostNr" />
          </div>          
        </div>        

        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.pAdress" class="text-danger">
              <small>{{formErrors.pAdress}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label [class]="isRequired(addressForm.controls.pAdress.invalid)" for="inputPAdress">Stad</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
            type="text" 
            size="50"
            formControlName = "pAdress"
            id="inputPAdress"
            [readonly]="isReadonly" />
          </div>          
        </div>
        
        <div class="row custom-row">
          <div  class="col-sm-3"></div> 
          <div class="col-sm-9"> 
            <div *ngIf="formErrors.kontaktPers" class="text-danger">
              <small>{{formErrors.kontaktPers}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class= "col-sm-3">    
            <label for="inputKontaktPers">Kontaktperson</label>
          </div>
          <div class= "col-sm-9">    
            <input class="ng-invalid" 
            type="text" 
            size="50"
            formControlName = "kontaktPers"
            id="inputKontaktPers"
            [readonly]="isReadonly" />
          </div>
        </div>

 
        <div *ngIf="!addressForm.valid" 
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
              [disabled]="!addressForm.dirty || submitted" 
              (click)="resetForm(true)" 
              class="btn btn-default">
              Återställ
            </button>
          </div>
          <div class="col-sm-9"> 
            <button type="submit" 
              [disabled]="!addressForm.valid || !addressForm.dirty|| submitted" 
              class="btn btn-primary">
              OK
            </button>
          </div>
        </div>

        <div *ngIf="addressUpdatedSuccess | async" 
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

export class AddressFormComponent implements OnInit { 
  @Input('filterData') public filterValues : FilterValues; 
 
  title: string;
  reset: boolean = false;
  submitted: boolean = false;
  addressUpdatedSuccess: Observable<boolean>;
  controlLabelRequired: string = 'control-label required';
  isReadonly: boolean = false;

  addressForm: FormGroup;
  private gAdress: string;
  private postNr: string;
  private pAdress: string; 
  private kontaktPers: string;

  formErrors = {
    'gAdress': '',   
    'postNr': '',
    'pAdress': '',
    'kontaktPers': ''
  };

  validationMessages = {
    'gAdress': {
      'required': 'Gatuadress måste anges.',
      'pattern': 'Gatuadress får ha minst 3 och max 70 tecken, \t får inte innehålla \"<\", \">\".'
    },
    'postNr': {
      'required': 'Postnummer måste anges.',
      'pattern': 'Postnummer får ha minst 5 och max 6 siffror.'
    },
    'pAdress': {
      'required': 'Stad måste anges.',
      'pattern': 'Stad får ha minst 3 och max 27 bokstäver, \t får inte innehålla \"<\", \">\".'
    },
    'kontaktPers': {
      'pattern': 'Kontaktperson får ha minst 3 och max 70 tecken, \t får inte innehålla \"<\", \">\".'
    }
  }
 
  constructor (private fb: FormBuilder, 
              private store: Store<fromReducers.MaintenanceState>) {
    this.addressUpdatedSuccess = this.store.pipe(select(fromReducers.getAddressesUpdatedSuccess));

    this.addressUpdatedSuccess.subscribe(data => this.onUpdatedAddress(data));

    this.addressForm = this.fb.group({
      id: new FormControl(),
      orgbet: new FormControl(),
      gAdress: new FormControl('', [Validators.required, Validators.pattern('[^<^>]{3,70}$')]),
      postNr: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{5,6}$')]),
      pAdress: new FormControl('', [Validators.required, Validators.pattern('[^<^>^1^2^3^4^5^6^7^8^9^0]{3,27}$')]),
      land: new FormControl(),
      kontaktPers: new FormControl('', [Validators.pattern('[^<^>]{3,70}$')]),
      telNr: new FormControl(),
      telNr2: new FormControl(),
      epost: new FormControl(),
      updtid : new FormControl()
    });

    this.addressForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  ngOnInit(){
    this.title = 'Besöksadress';
    this.setPatchValue();
  }

  onValueChanged(data?: any) {
    if (!this.addressForm) {return;}
    const form = this.addressForm;

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

  onUpdatedAddress(isAddressUpdated: boolean){
    if(isAddressUpdated){     
      this.isReadonly = true;
      this.addressForm.disable;
    }
  }

  resetForm(reset: boolean){
    if (reset == true){    
      this.setPatchValue();
    }
    this.reset = reset;
  }
  
  onFormSubmit(){
    if(this.addressForm.valid && this.addressForm.dirty) {
      console.log(this.filterValues.address.land)
      this.filterValues.address = this.addressForm.value;
      this.submitted = true;
      this.store.dispatch(new fromActions.UpdateAddress(this.filterValues.address));
    }
  }

  isRequired(myFormControlName : boolean): string{
    this.controlLabelRequired = 'control-label required';
    if( myFormControlName == false){
      this.controlLabelRequired = 'control-label';
    }
    return this.controlLabelRequired;    
  }

  setPatchValue(){
    var address = this.filterValues.address;
    this.addressForm.patchValue({
      id: address.id,
      orgbet: address.orgbet,
      gAdress: address.gAdress,
      postNr: address.postNr,
      pAdress: address.pAdress,
      land: address.land,
      kontaktPers: address.kontaktPers,
      telNr: address.telNr,
      telNr2: address.telNr2,
      epost: address.epost,
      updtid: address.updtid
    })
  }
}