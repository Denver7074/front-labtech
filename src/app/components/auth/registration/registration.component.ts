import {Component, inject, signal} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserRegisterRequest} from '../auth.interface';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {NotifierService} from '../../../service/notifier.service';

@Component({
  selector: 'app-registration',
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatError,
    MatButton,
    MatCardActions,
    MatSelect,
    MatOption,
    MatSelect,
    MatSelect
  ],
  templateUrl: './registration.component.html',
  standalone: true
})
export class RegistrationComponent {
  isShowPassword = signal(false);
  // authService = inject(AuthService)
  router = inject(Router)
  errorService = inject(NotifierService);
  selectedRole: string = 'PERSON';

  rolesArray = [
    {key: 'ORGANIZATION', value: 'Организация'},
    {key: 'PERSON', value: 'Пользователь'}
  ];

  registrationForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    type: new FormControl(this.selectedRole, Validators.required)
  });

  signUp() {
    if (!this.registrationForm.valid) {
      return;
    }
    const requestBody: UserRegisterRequest = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      type: this.selectedRole
    };
    // this.authService.signUp(requestBody).subscribe(
    //   (response) => {
    //     this.errorService.showInfo(`На ${requestBody.email} направлена ссылка для подтверждения`);
    //   },
    //   (error) => {
    //     this.errorService.showError(error.message);
    //   }
    // );
  }

  onRoleChange(event: MatSelectChange) {
    const selectedValue = event.value;
    console.log(selectedValue);
  }

  formKeyDown() {
    this.signUp();
  }
}
