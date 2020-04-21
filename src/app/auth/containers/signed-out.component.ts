import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'signed-out',
  template: `Utloggad!`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignedOutComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.endSignoutMainWindow();
  }

}