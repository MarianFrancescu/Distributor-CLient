import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditDisciplineComponent } from './admin-edit-discipline/admin-edit-discipline.component';
import { DisciplineDetailsComponent } from './discipline-details/discipline-details.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { Roles } from './models/roles';
import { PreferencesComponent } from './preferences/preferences.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Roles.Basic, Roles.Admin] } },
  { path: 'disciplines', component: DisciplinesComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Roles.Basic, Roles.Admin] } },
  { path: 'discipline/:id', component: DisciplineDetailsComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Roles.Basic, Roles.Admin] } },
  { path: 'preferences', component: PreferencesComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Roles.Basic, Roles.Admin] }  },
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
  //this should redirect to a noFoundPage
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
