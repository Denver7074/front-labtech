import {Component, inject, signal} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, form} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginForm} from '../auth.interface';
import {MatCard, MatCardContent, MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel, MatError} from '@angular/material/input';
import {NotifierService} from '../../../service/notifier.service';

@Component({
  selector: 'app-logging',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError
  ],
  templateUrl: './logging.component.html',
  standalone: true,
  styleUrl: './logging.scss',
})
export class LoggingComponent {
  isShowPassword = signal(false);

  loginForm = form<LoginForm>({
    login: '',
    password: ''
  });
// {
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required])
//   });

  // private authService = inject(AuthService);
  private router = inject(Router);
  private notifierService = inject(NotifierService);

  login() {
    if (!this.loginForm.valid) return;

    const request: LoginForm = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    // this.authService.login(request).subscribe({
    //   next: () => this.router.navigate(['/update-password']),
    //   error: (error) => this.notifierService.showError(error.message)
    // });
  }

  formKeyDown() {
    this.login();
  }
}
