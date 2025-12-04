import {Component, signal} from '@angular/core';
import {form, Field, required, email} from '@angular/forms/signals'
import {LoginForm} from '../auth.interface';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Button} from '../../button/button';



@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  imports: [
    Field,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatError,
    NgClass,
    Button
  ],
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class LoggingComponent {
  isShowPassword = signal(false);
  data = signal<LoginForm>({
    email: '',
    password: '',
  });

  loginForm = form(
    this.data,
    (schema) => {
      required(schema.password);
      required(schema.email);
      email(schema.email);
    }
  );

  onSubmit() {
    const requestBody: LoginForm = {
      email: this.loginForm.email().value(),
      password: this.loginForm.password().value()
    }
    console.log(this.loginForm.email().value())
    console.log(this.loginForm.password().value())
  }
}
