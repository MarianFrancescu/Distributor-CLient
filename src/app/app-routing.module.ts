import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditDisciplineComponent } from './admin-edit-discipline/admin-edit-discipline.component';
import { DisciplineDetailsComponent } from './discipline-details/discipline-details.component';
import { DisciplinePreferencesComponent } from './discipline-preferences/discipline-preferences.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { Roles } from './models/roles';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PreferencesDefaultComponent } from './preferences-default/preferences-default.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Basic, Roles.Admin] }
  },
  {
    path: 'disciplines',
    component: DisciplinesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Basic, Roles.Admin] }
  },
  {
    path: 'discipline/:id',
    component: DisciplineDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Basic, Roles.Admin] }
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    children: [
      {
        path: '',
        component: PreferencesDefaultComponent
      },
      {
        path: 'view/discipline/:disciplineID',
        component: DisciplinePreferencesComponent
      }
    ],
    canActivate: [AuthGuard],
    data: { roles: [Roles.Basic, Roles.Admin] }
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Admin] }
  },
  {
    path: 'discipline/:id/edit',
    component: AdminEditDisciplineComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Admin] }
  },
  { path: 'notFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
