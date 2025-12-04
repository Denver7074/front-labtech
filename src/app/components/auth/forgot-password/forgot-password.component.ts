import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';

import {ForgotForm} from '../auth.interface';
import {form, Field, required, email} from '@angular/forms/signals'
import {FormsModule} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Button} from '../../button/button';


@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    Field,
    MatLabel,
    MatError,
    Button
  ],
  templateUrl: './forgot-password.component.html',
  standalone: true,
  styleUrl: "../logging.scss"
})
export class ForgotPasswordComponent {
  router = inject(Router)

  data = signal<ForgotForm>({
    email: '',
  });

  forgotForm = form(
    this.data,
    (schema) => {
      required(schema.email);
      email(schema.email);
    });

  onSubmit() {
    const requestBody: ForgotForm = {
      email: this.forgotForm.email().value()
    }
    console.log(this.forgotForm.email().value())
  }
}
