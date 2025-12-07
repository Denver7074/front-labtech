import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ResetPasswordRequest} from '../../../data/auth.interface';
import {Button} from '../../ui/button/button';
import {MatInput, MatLabel, MatError, MatFormField} from '@angular/material/input';
import {AuthService} from '../../../service/auth/auth.service';
import {NotifierService} from '../../../service/notifier.service';


@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    FormsModule,
    MatError,
    MatInput,
    MatLabel,
    MatFormField
  ],
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class ResetPasswordComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notifierService = inject(NotifierService);
  private fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  isShowNewPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  forgotId = signal('');
  message = signal('');

  form = this.fb.group({
      newPassword: ['', [Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.minLength(8)]]
    }
  );

  onSubmit() {
    const requestBody: ResetPasswordRequest = {
      newPassword: this.form.get('newPassword')?.value,
      repeatedPassword:  this.form.get('repeatedPassword')?.value
    }
    this.authService.reset(requestBody, this.forgotId()).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => this.notifierService.showError(error.message)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.forgotId.set(params['forgotId'])
    });
  }
}
