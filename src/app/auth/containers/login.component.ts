import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'login',
  template: `Loggar in...`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.startSigninMainWindow();
  }

}