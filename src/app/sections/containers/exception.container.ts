import { Component, OnInit, ChangeDetectionStrategy, SecurityContext } from '@angular/core';
import { Observable } from "rxjs/Observable";
//Store
import { Store, select } from "@ngrx/store";
import * as reducer from "../reducers";
import * as fromActions from '../actions';
//Models
import { Exception } from '../models/exception.model';

@Component({
  selector: 'exception-container',
  template: `
    <div *ngIf="(exception | async) != null && (exception | async).error && (exception | async).error.message" 
        class="alert alert-danger" 
        role="alert">
      <strong>{{ (exception | async).error.retcode }}</strong>
      {{ (exception | async).error.message }}
      <button 
        class="close" 
        type="button" 
        (click)="clearException()">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div *ngIf="(exception | async) != null && (exception | async).error && (exception | async).error.text" 
        class="alert alert-danger" 
        role="alert">
      {{ (exception | async).error.text }}
      <button 
        class="close" 
        type="button" 
        (click)="clearException()">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionContainer implements OnInit {

  exception: Observable<Exception>;

  constructor(private store: Store<reducer.MaintenanceState>) { }

  ngOnInit() { 
    this.exception = this.store.pipe(select(reducer.getException));
  }

  public clearException() {
    this.store.dispatch(new fromActions.Clear);
  }
}