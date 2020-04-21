import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './containers/login.component';
import { CallbackComponent } from './containers/callback.component';
import { SignOutComponent } from './containers/sign-out.component';
import { SignedOutComponent } from './containers/signed-out.component';
import { SilentCallbackComponent } from './containers/silent-callback.component';

const routes = [
    { path: 'auth/login', component: LoginComponent, pathMatch: 'full' },
    { path: 'auth/callback', component: CallbackComponent, pathMatch: 'full' },
    { path: 'auth/signOut', component: SignOutComponent, pathMatch: 'full' },
    { path: 'auth/signedOut', component: SignedOutComponent, pathMatch: 'full' },
    { path: 'auth/silentCallback', component: SilentCallbackComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule { }