import {Observable} from "rxjs/Observable";
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from "@ngrx/store";

import * as fromUsers from "../reducers";
import * as userActions from "./../actions/users.actions";
import {User} from "./../models/user.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  isLoading: Observable<boolean>;

  constructor(private store: Store<fromUsers.UsersState>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.Load());
    
    this.users = this.store.pipe(select(fromUsers.getUsers));
    this.isLoading = this.store.pipe(select(fromUsers.getLoading));
  }

}
