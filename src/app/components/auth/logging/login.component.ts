import {Component, inject, signal} from '@angular/core';
import {UserLoginRequest} from '../../../data/auth.interface';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Button} from '../../button/button';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {NotifierService} from '../../../service/notifier.service';


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
  private notifierService = inject(NotifierService);
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
      next: () => this.router.navigate(['/general']),
      error: (error) => this.notifierService.showError(error.message)
    });
  }
}
