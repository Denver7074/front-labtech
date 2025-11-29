import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {AccountRequest} from '../auth.interface';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NotifierService} from '../../../service/notifier.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatCardActions
  ],
  templateUrl: './forgot-password.component.html',
  standalone: true,
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  // authService = inject(AuthService)
  router = inject(Router)
  notifierService = inject(NotifierService);

  forgotPasswordForm = new FormGroup({
    email: new FormControl(null, Validators.required),
  })

  forgotPassword() {
    if (!this.forgotPasswordForm.valid) {
      return;
    }
    const requestBody: AccountRequest = {
      email: this.forgotPasswordForm.value.email,
    }
    //@ts-ignore
    // this.authService.forgot(requestBody).subscribe(
    //   res => this.router.navigate(['/']),
    //   (error) => this.notifierService.showError(error.message)
    // )
  }

  formKeyDown() {
    this.forgotPassword();
  }
}
