import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import {Observable} from "rxjs/Observable";
//Store
import { Store } from '@ngrx/store';

@Component({
  selector: 'maintenance-component',
  template: `
<div class="row">      
  <div class="col-md-6">
    <div class="panel panel-default">
      <div class="panel-heading panel-blue">
        Redigera detaljer, adress, informationsbrev av befintlig mottagning.
      </div>
      <div class="panel-body">
        <button type="button" class="btn btn-primary" (click)="editClinic()">Redigera befintlig mottagning</button>          
      </div>
    </div>
  </div>

  <div class="col-md-6">
    <div class="panel panel-default">
      <div class="panel-heading panel-blue">
        Skapa en ny mottagning med adress och informationsbrev.
      </div>
      <div class="panel-body">
        <button type="button" class="btn btn-primary" (click)="newClinic()">Skapa ny mottagning</button>          
      </div>
    </div>     
  </div>

</div>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MaintenanceComponent { 
  @Output() public editOrNewEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  editClinic(){ 
    this.editOrNewEvent.emit('edit');
  }

  newClinic() {
    this.editOrNewEvent.emit('new');
  } 
}