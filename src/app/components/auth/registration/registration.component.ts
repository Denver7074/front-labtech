import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationForm} from '../auth.interface';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {form, Field, required, email} from '@angular/forms/signals'
import {FormsModule} from '@angular/forms';
import {Button} from '../../button/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-registration',
  imports: [
    Field,
    FormsModule,
    Button,
    MatError,
    MatInput,
    MatFormField,
    MatLabel,
    NgClass,
    MatSelect,
    MatOption
  ],
  templateUrl: './registration.component.html',
  standalone: true,
  styleUrl: "../auth.form.scss"
})
export class RegistrationComponent {
  isShowPassword = signal(false);
  router = inject(Router)

  rolesArray = signal([
    { key: 'ORGANIZATION', value: 'Организация' },
    { key: 'PERSON', value: 'Пользователь' }
  ]);

  data = signal<RegistrationForm>({
    email: '',
    password: '',
    type: '' ,
  });

  registrationForm = form(
    this.data,
    (schema) => {
      required(schema.email);
      email(schema.email);
      required(schema.password);
    });

  onSubmit() {
    const requestBody: RegistrationForm = {
      email: this.registrationForm.email().value(),
      password: this.registrationForm.password().value(),
      type: this.registrationForm.type().value()
    }
    console.log(this.registrationForm.email().value())
    console.log(this.registrationForm.password().value())
    console.log(this.registrationForm.type().value())
  }
}
