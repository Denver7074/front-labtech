import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, NgClass} from '@angular/common';
import {ResetPasswordRequest} from '../auth.interface';

@Component({
  selector: 'app-reset-password',
  imports: [
    NgClass,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  standalone: true
})
export class ResetPasswordComponent {
  // authService = inject(AuthService)
  router = inject(Router)
  isShowNewPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  message: string = ""
  forgotId!: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.forgotId = params['forgotId'];
    });
  }

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl(null, Validators.required),
    repeatedPassword: new FormControl(null, Validators.required),
  })

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      return;
    }
    const requestBody: ResetPasswordRequest = {
      newPassword: this.resetPasswordForm.value.newPassword,
      repeatedPassword: this.resetPasswordForm.value.repeatedPassword
    }
    //@ts-ignore
    // this.authService.reset(requestBody, this.forgotId).subscribe(
    //   res => this.router.navigate(['']),
    //   (error) => this.message = error.message
    // )
  }
}
