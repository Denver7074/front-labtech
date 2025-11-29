import { Routes } from '@angular/router';
import {LoggingComponent} from './components/auth/logging/logging.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';
import {ConfirmationComponent} from './components/auth/confirmation/confirmation.component';

export const routes: Routes = [
  {path: '', component: LoggingComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:forgotId', component: ResetPasswordComponent},
  {path: 'confirm/:activateId', component: ConfirmationComponent}
];
