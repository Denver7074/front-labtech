import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegisterRequest} from '../../../data/auth.interface';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../ui/button/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../ui/notification.service';


@Component({
  selector: 'app-registration',
  imports: [
    FormsModule,
    Button,
    MatError,
    MatInput,
    MatFormField,
    MatLabel,
    NgClass,
    MatSelect,
    MatOption,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class RegistrationComponent {
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  isShowPassword = signal(false);

  rolesArray = signal([
    {key: 'ORGANIZATION', value: 'Организация'},
    {key: 'PERSON', value: 'Пользователь'}
  ]);

  form = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8)]],
      type: ['', [Validators.required]],
    }
  );

  onSubmit() {
    const requestBody: UserRegisterRequest = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      type: this.form.get('type')?.value
    }

    this.authService.registration(requestBody).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => this.notification.showErrorMsg(error.error.error.message)
    });
  }
}
