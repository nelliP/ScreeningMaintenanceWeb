import { Component, TemplateRef, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
//Modal
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//Store
import { Store, select } from "@ngrx/store";
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
//Models
import { FilterValues } from '../models/filter-values.model';
import { Maintenance } from '../models/maintenance.model';
 
@Component({
  selector: 'maintenance-modal',
  template: `  
<button type="button" class="btn btn-primary" 
  (click)="openModal(template)">
    OK
</button>

<ng-template #template>

  <div class="modal-header">
    <h4 class="modal-title pull-left">{{title}}</h4>
    <button type="button" 
      class="btn btn-success pull-right" 
      (click)="openModal2(templateNested)">
      Stäng formuläret
    </button>      
  </div>

  <div *ngIf="editOrNew === 'edit'; then thenBlock; else elseBlock"></div>
    
    <ng-template #thenBlock>    
      <div class="modal-body">

        <exception-container></exception-container>

        <maintenance-form-container
          [editOrNewData]="editOrNew"  
          [filterData] ="filterValues"     
          [maintenanceData] ="maintenance | async">
        </maintenance-form-container>
        
      </div>
    </ng-template>

    <ng-template #elseBlock>
    <div *ngIf="!createdMaintenance | async">
    <p>Ny mottagning genereras!</p>
    </div>      
      <div *ngIf="createdMaintenance | async">
        <div class="modal-body">

          <exception-container></exception-container>

          <maintenance-form-container
            [editOrNewData]="editOrNew"  
            [filterData] ="filterValues"     
            [maintenanceData] ="maintenance | async">
          </maintenance-form-container>

        </div>      
      </div>
    </ng-template>

  <div class="row">
    <div class="col-sm-9"> 
    </div>
    <div class="col-sm-3"> 
      <button type="button" 
        class="btn btn-success" 
        (click)="openModal2(templateNested)">
        Stäng formuläret
      </button>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12"> 
    </div>  
  </div>

</ng-template>

<ng-template #templateNested>
  <div class="modal-header">
    <h4 class="modal-title pull-left">Stäng formuläret</h4>
    <button type="button" 
      class="close pull-right" 
      aria-label="Close" 
      (click)="modalRef2.hide()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div class="modal-body">
    <button type="button" class="btn btn-success" (click)="closeFirstAndNestedModal()">Jag är klar med formuläret</button>
  </div>
</ng-template>
  `
})
export class MaintenanceModalComponent implements OnInit{
  @Input('filterData') public filterValues : FilterValues;
  @Input('editOrNewData') public editOrNew : string;
  modalRef: BsModalRef; 
  modalRef2: BsModalRef; 
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
    keyboard: false
  };
  title: string;
  editOrNewTitle: boolean;
  maintenance: Observable<Maintenance>;
  createdMaintenance: Observable<boolean>;
  isFalse: boolean = false;
  navigationSubscription;
  constructor(private store: Store<fromReducers.MaintenanceState>,
              private modalService: BsModalService) {  
    this.maintenance = this.store.pipe(select (fromReducers.getMaintenance));              
    this.createdMaintenance = this.store.pipe(select(fromReducers.getMaintenanceCreated));      
  }

  ngOnInit() { }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.modalConfig);    
    if(this.editOrNew ==='edit'){
      this.title = 'Redigera Mottagning';
    }
    else {
      this.title = 'Skapa ny Mottagning';
     
      this.store.dispatch(new fromActions.CreateMaintenance(
        this.filterValues.region.division, 
        this.filterValues.screeningType.type));
    }
  } 

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, this.modalConfig);
  }

  closeFirstAndNestedModal(){
    this.modalRef.hide();
    this.modalRef = null;
    this.modalRef2.hide();
    this.modalRef2 = null;

    window.location.reload();  
  } 
}