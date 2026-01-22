import {Component, inject, signal} from '@angular/core';
import {UserLoginRequest} from '../../../data/auth.interface';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Button} from '../../ui/button/button';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../ui/notification.service';
import {JwtUtils} from '../../../utils/jwt.utils';
import {AuthInterface} from '../../../data/response.interface';


@Component({
  selector: 'app-logging',
  templateUrl: './login.component.html',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatError,
    NgClass,
    Button,
    ReactiveFormsModule
  ],
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  isShowPassword = signal(false);

  form = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    }
  );

  onSubmit() {
    const requestBody: UserLoginRequest = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.login(requestBody).subscribe({
      next: (value) => {
        const userId = JwtUtils.getPayload(value.accessToken)?.userId
        const type = JwtUtils.getPayload(value.accessToken)?.type?.[0];
        if (type === 'PERSON') {
          this.router.navigate([`persons/${userId}/general`])
        } else {
          this.router.navigate([`organizations/${userId}/general`])
        }
      },
      error: (error) => this.notification.showErrorMsg(error.error.error.message)
    });
  }
}
