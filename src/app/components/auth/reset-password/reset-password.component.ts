import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ResetPasswordForm} from '../auth.interface';
import {form, Field, required} from '@angular/forms/signals'
import {Button} from '../../button/button';
import {MatInput, MatLabel, MatError, MatFormField} from '@angular/material/input';


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
    Field,
    MatFormField
  ],
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class ResetPasswordComponent implements OnInit {
  // authService = inject(AuthService)
  router = inject(Router);
  route = inject(ActivatedRoute);
  isShowNewPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  forgotId = signal('');
  message = signal('');

  data = signal<ResetPasswordForm>({
    newPassword: '',
    repeatedPassword: '',
  });

  resetPasswordForm = form(
    this.data,
    (schema) => {
      required(schema.newPassword);
      required(schema.repeatedPassword);
    });

  onSubmit() {
    const requestBody: ResetPasswordForm = {
      newPassword: this.resetPasswordForm.newPassword().value(),
      repeatedPassword: this.resetPasswordForm.repeatedPassword().value()
    }
    console.log(this.resetPasswordForm.newPassword().value())
    console.log(this.resetPasswordForm.repeatedPassword().value())
    console.log(this.forgotId())
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.forgotId.set(params['forgotId'])
    });
  }
}
