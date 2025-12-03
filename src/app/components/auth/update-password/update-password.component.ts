import {Component, inject, signal} from '@angular/core';

import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgClass} from '@angular/common';
import {ResetPasswordForm, UpdatePasswordRequest} from '../auth.interface';
import {form, Field, required} from '@angular/forms/signals'
import {Button} from '../../button/button';
import {MatInput, MatLabel, MatError, MatFormField} from '@angular/material/input';

@Component({
  selector: 'app-update-password',
  imports: [
    ReactiveFormsModule,
    Button,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    Field,
    NgClass
  ],
  templateUrl: './update-password.component.html',
  standalone: true,
  styleUrl: "../logging.scss"
})
export class UpdatePasswordComponent {
  router = inject(Router)
  isShowNewPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  isShowCurrentPassword = signal(false);


  data = signal<UpdatePasswordRequest>({
    currentPassword: '',
    newPassword: '',
    repeatedPassword: '',
  });

  updatePasswordForm = form(
    this.data,
    (schema) => {
      required(schema.currentPassword)
      required(schema.newPassword);
      required(schema.repeatedPassword);
    });

  onSubmit() {
    const requestBody: UpdatePasswordRequest = {
      currentPassword: this.updatePasswordForm.currentPassword().value(),
      newPassword: this.updatePasswordForm.newPassword().value(),
      repeatedPassword: this.updatePasswordForm.repeatedPassword().value()
    }
    console.log(this.updatePasswordForm.currentPassword().value())
    console.log(this.updatePasswordForm.newPassword().value())
    console.log(this.updatePasswordForm.repeatedPassword().value())
  }
}
