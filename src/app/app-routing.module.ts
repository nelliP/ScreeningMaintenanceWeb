import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { SectionsModule } from './sections/sections.module';

const routes: Routes = [
    { path: '', loadChildren: './sections/sections.module#SectionsModule'},
   // { path: '', component: MaintenanceModule},
    //{ path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }