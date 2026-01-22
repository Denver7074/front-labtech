import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AccountRequest} from '../../../data/auth.interface';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Button} from '../../../shared/button/button';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../shared/notification.service';


@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './forgot.password.component.html',
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }
  );

  onSubmit() {
    const requestBody: AccountRequest = {
      email: this.form.get('email')?.value,
      password: null
    }
    this.authService.forgot(requestBody).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => this.notification.showErrorMsg(error.error.error.message)
    });
  }
}
