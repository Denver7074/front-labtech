import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/logging/login.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot.password.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';
import {ConfirmationComponent} from './components/auth/confirmation/confirmation.component';
import {MainPerson} from './components/profile/person/main/main';
import {LayotComponent} from './components/lay/layot/layot.component';
import {MainOrganization} from './components/profile/organization/main/main';
import {Persons} from './components/profile/person/persons/persons';
import {canActivateAuth} from './service/auth/access.guard';
import {MainSettings} from './components/settings/main/main';
import {MainOrganizationPart} from './components/profile/organization-part/main/main';
import {Rooms} from './components/resource/room/rooms/rooms';
import {MainEquipment} from './components/equipment/main-equipment/main-equipment';
import {StandardReagent} from './components/standard-sample/standard/standard-equipment/standard-reagent';
import {StandardMain} from './components/standard-sample/standard-main/standard-main';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset/:forgotId',
    component: ResetPasswordComponent
  },
  {
    path: 'confirm/:activateId',
    component: ConfirmationComponent
  },
  {
    path: '',
    component: LayotComponent,
    canActivate: [canActivateAuth],
    children: [
      {
        path: 'persons/:personId/general',
        component: MainPerson
      },
      {
        path: 'persons',
        component: Persons
      },
      {
        path: 'organizations/:organizationId/general',
        component: MainOrganization
      },
      {
        path: 'organizations/department/:organizationPartId/general',
        component: MainOrganizationPart
      },
      {
        path: 'organizations/department/:organizationPartId/inventory',
        component: Rooms
      },
      {
        path: 'organizations/department/:organizationPartId/equipment',
        component: MainEquipment
      },
      {
        path: 'organizations/department/:organizationPartId/standard-sample',
        component: StandardMain
      },
      {
        path: 'settings',
        component: MainSettings
      },
    ]
  },
];
