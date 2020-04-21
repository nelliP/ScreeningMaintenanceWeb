import {Observable} from "rxjs/Observable";
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromUsers from "../reducers";
import * as userActions from "./../actions/users.actions";
import {User} from "./../models/user.model";

@Component({
  selector: 'new-user',
  template: `
    <user-form (onSave)="save($event)"></user-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent implements OnInit {
  constructor(private store: Store<fromUsers.UsersState>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.New());
  }

  save(user: User): void {
    this.store.dispatch(new userActions.Save(user));
  }

}
