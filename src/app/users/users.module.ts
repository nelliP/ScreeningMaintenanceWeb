import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { reducers } from './reducers';

import { UsersRoutingModule } from './users-routing.module';
import { UsersEffects } from './effects/users.effects';
import { UsersService } from './services/users.service';
import { EditUserGuard } from './guards/edit-user.guard';

import { UsersComponent } from './containers/users.component';
import { NewUserComponent } from './containers/new-user.component';
import { EditUserComponent } from './containers/edit-user.component';
import { UserFormComponent } from './components/user-form.component';

@NgModule({
    imports: [
        SharedModule,
        UsersRoutingModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([UsersEffects]),
    ],
    declarations: [
        UsersComponent,
        NewUserComponent,
        EditUserComponent,
        UserFormComponent
    ],
    providers: [
        UsersService,
        EditUserGuard
    ]
})
export class UsersModule { }