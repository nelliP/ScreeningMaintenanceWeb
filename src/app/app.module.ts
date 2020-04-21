import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';//, HTTP_INTERCEPTORS 
//import { BrowserAnimationsModule } from '@angular/animations';


import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { reducers, metaReducers, CustomRouterStateSerializer } from './app.reducer'

import { AuthSettings } from './auth/models/auth-settings.model';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { appSettings } from './../settings'
//import { MaintenanceHttpInterceptor } from './sections/services/maintenance-http.interceptor';
import * as moment from 'moment';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ name: 'NgRx Store DevTools', logOnly: environment.production }),
    EffectsModule.forRoot([]),

    AuthModule.forRoot(),
    CoreModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    //BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: MaintenanceHttpInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: AuthSettings, useValue: appSettings.authSettings }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (){
    moment.locale('sv');
  }
 }
