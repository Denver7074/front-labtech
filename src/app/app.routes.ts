import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/logging/login.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot.password.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';
import {ConfirmationComponent} from './components/auth/confirmation/confirmation.component';
import {UpdatePasswordComponent} from './components/auth/update-password/update-password.component';
import {Create} from './components/profile/person/general/create/create';
import {canActivateAuth} from './service/auth/access.guard';
import {Main} from './components/profile/person/general/main/main';
import {LayotComponent} from './components/lay/layot/layot.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset/:forgotId', component: ResetPasswordComponent},
  {path: 'confirm/:activateId', component: ConfirmationComponent},
  {path: 'update-password', component: UpdatePasswordComponent},
  {
    path: '', component: LayotComponent, children: [
      {path: 'persons/:personId/general', component: Main},
      {path: 'persons/general', component: Create},
    ], canActivate: [canActivateAuth]
  },
];
