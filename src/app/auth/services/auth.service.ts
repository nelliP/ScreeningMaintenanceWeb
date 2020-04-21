import { DOCUMENT } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { filter, take, switchMap } from 'rxjs/operators';
import { UserManager, UserManagerSettings, Log, User } from 'oidc-client';

import { AuthSettings } from './../models/auth-settings.model';
import * as fromAuth from "./../reducers";
import * as authActions from "./../actions/auth.actions";

@Injectable()
export class AuthService {
  private userManager: UserManager;

  constructor(private store: Store<fromAuth.AuthState>, authSettings: AuthSettings, location: Location, @Inject(DOCUMENT) private document: any) {
    // Set up logging
    Log.logger = console;

    authSettings = authSettings || new AuthSettings();
    authSettings.post_logout_redirect_uri = authSettings.post_logout_redirect_uri || `${document.location.origin}${location.prepareExternalUrl('/auth/signedOut')}`;
    authSettings.silent_redirect_uri = authSettings.silent_redirect_uri || `${document.location.origin}${location.prepareExternalUrl('/auth/silentCallback')}`;
    authSettings.redirect_uri = authSettings.redirect_uri || `${document.location.origin}${location.prepareExternalUrl('/auth/callback')}`;

    // Create manager
    this.userManager = new UserManager(authSettings);

    // Hook up events
    this.userManager.events.addUserLoaded((u: User) => { 
      this.store.dispatch(new authActions.UserFound(u));
    });

    this.userManager.events.addUserUnloaded(() => {
      this.store.dispatch(new authActions.SessionTerminated());
    });

    this.userManager.events.addSilentRenewError((error) => {
      this.store.dispatch(new authActions.SilentRenewError(error));
    });
    
    this.userManager.events.addUserSignedOut(() => {
      this.store.dispatch(new authActions.UserSignedOut());
    });

    this.userManager.events.addAccessTokenExpired(() => {
      this.store.dispatch(new authActions.UserExpired());
    });
    
    this.userManager.events.addAccessTokenExpiring(() => {
      this.store.dispatch(new authActions.UserExpiring());
    });
  }

  // Forward methods to UserManager
  public startSigninMainWindow() {
    //TODO: Add state to call
    return this.userManager.signinRedirect();
  }

  public endSigninMainWindow() {
    return this.userManager.signinRedirectCallback();
  }

  public endSigninSilent() {
    this.userManager.signinSilentCallback();
  }

  public startSignoutMainWindow() {
    return this.userManager.signoutRedirect();
  };

  public endSignoutMainWindow() {
    return this.userManager.signoutRedirectCallback();
  };

  public getUser() {
    return this.userManager.getUser();
  }

  public getUserFromStore() {
    return this.waitForUserToLoad().pipe(
      switchMap(() => this.store.pipe(select(fromAuth.getUser))));
  }

  private waitForUserToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoading),
      filter(loading => !loading),
      take(1)
    );
  }
}