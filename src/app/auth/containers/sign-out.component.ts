import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'sign-out',
  template: `Loggar ut...`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignOutComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.startSignoutMainWindow();
  }

}