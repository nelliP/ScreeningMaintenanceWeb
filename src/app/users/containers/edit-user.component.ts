import {Observable, Subscription} from "rxjs/Rx";
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store, select} from "@ngrx/store";

import * as fromUsers from "../reducers";
import * as userActions from "./../actions/users.actions";
import {User} from "./../models/user.model";

@Component({
  selector: 'edit-user',
  template: `
    <user-form (onSave)="save($event)" [initialUser]="user | async"></user-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit, OnDestroy {
  user: Observable<User>;

  /*private routeSubscription: Subscription;*/

  constructor(private store: Store<fromUsers.UsersState>, private route: ActivatedRoute) { }

  ngOnInit() {
    /* This is loaded through edit user guard instead */
    /*this.routeSubscription = this.route.params
      .select<number>('id')
      .map(id => new userActions.SelectAction(id))
      .subscribe(this.store);*/

    this.user = this.store.pipe(select(fromUsers.getSelectedUser));
  }

  ngOnDestroy(): void {
		/*this.routeSubscription.unsubscribe();*/
	}

  save(user: User): void {
    this.store.dispatch(new userActions.Save(user));
  }

}
