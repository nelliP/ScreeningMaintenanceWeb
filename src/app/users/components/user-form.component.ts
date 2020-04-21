import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {User} from "./../models/user.model";

@Component({
  selector: 'user-form',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="userForm" novalidate>
      <form-field type="text" label="Name" [fieldFormControl]="userForm.controls['name']"></form-field>
      <button type="submit" [disabled]="!userForm.valid">Submit</button>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  private editingUser: User;
  userForm: FormGroup;

  @Output() onSave = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern(".+asd.+")]]
    });
  }

  @Input()
  set initialUser(user: User) {
    if (user) {
      this.editingUser = user;
      this.userForm.patchValue(user);
    }
  }

  onSubmit() {
    this.onSave.emit(Object.assign({}, this.editingUser, this.userForm.value));
  }

}
