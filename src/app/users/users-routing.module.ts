import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';
import { EditUserGuard } from './guards/edit-user.guard';

import { UsersComponent } from './containers/users.component';
import { NewUserComponent } from './containers/new-user.component';
import { EditUserComponent } from './containers/edit-user.component';

const routes = [
    { path: '', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'new', component: NewUserComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: ':id', component: EditUserComponent, pathMatch: 'full', canActivate: [AuthGuard, EditUserGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }