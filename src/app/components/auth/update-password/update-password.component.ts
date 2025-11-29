import {Component, inject, signal} from '@angular/core';

import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UpdatePasswordRequest} from '../auth.interface';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-update-password',
  imports: [
    NgClass,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-password.component.html',
  standalone: true
})
export class UpdatePasswordComponent {
  router = inject(Router)
  isShowNewPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  isShowCurrentPassword = signal(false);
  isUpdate: boolean = true;
  message: string = ""

  updatePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    repeatedPassword: new FormControl(null, Validators.required),
  })

  updatePassword() {
    if (!this.updatePasswordForm.valid) {
      return;
    }
    const requestBody: UpdatePasswordRequest = {
      currentPassword: this.updatePasswordForm.value.currentPassword,
      newPassword: this.updatePasswordForm.value.newPassword,
      repeatedPassword: this.updatePasswordForm.value.repeatedPassword
    }
    //@ts-ignore
    // this.authService.updatePassword(requestBody).subscribe(
    //   res => {
    //     this.message = 'Пароль изменен'
    //     this.isUpdate = true
    //   },
    //   (error) => {
    //     this.message = error.message
    //     this.isUpdate = false
    //   }
    // )
  }
}
