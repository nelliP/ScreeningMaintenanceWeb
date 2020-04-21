import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'silent-callback',
  template: ``,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SilentCallbackComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.endSigninSilent();
  }

}