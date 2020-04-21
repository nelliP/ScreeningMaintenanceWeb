import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthSettings } from './models/auth-settings.model';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthEffects } from './effects/auth.effects';
import { AuthHttpInterceptor } from './services/auth-http.interceptor';
import { reducers } from './reducers';

import { LoginComponent } from './containers/login.component';
import { CallbackComponent } from './containers/callback.component';
import { SignOutComponent } from './containers/sign-out.component';
import { SignedOutComponent } from './containers/signed-out.component';
import { SilentCallbackComponent } from './containers/silent-callback.component';

@NgModule({
  declarations: [
    LoginComponent,
    CallbackComponent,
    SignOutComponent,
    SignedOutComponent,
    SilentCallbackComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule {
    constructor( @Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
        throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
        ngModule: AuthModule,
        providers: [
          { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
          AuthService,
          AuthGuard
        ]
    };
  }
}
