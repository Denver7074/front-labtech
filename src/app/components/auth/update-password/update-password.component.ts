import {Component, inject, signal} from '@angular/core';

import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {UpdatePasswordRequest} from '../../../data/auth.interface';
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
    NgClass
  ],
  templateUrl: './update-password.component.html',
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class UpdatePasswordComponent {
  private fb = inject(FormBuilder);
  isShowNewPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  isShowCurrentPassword = signal(false);

  form = this.fb.group({
      currentPassword: ['', [Validators.minLength(8)]],
      newPassword: ['', [Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.minLength(8)]]
    }
  );

  onSubmit() {
    const requestBody: UpdatePasswordRequest = {
      currentPassword: this.form.get('currentPassword')?.value,
      newPassword: this.form.get('newPassword')?.value,
      repeatedPassword: this.form.get('repeatedPassword')?.value
    }
  }
}
