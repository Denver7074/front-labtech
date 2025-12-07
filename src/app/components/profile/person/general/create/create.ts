import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatError, MatFormField, MatInput, MatInputModule} from '@angular/material/input';

import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {Button} from '../../../../ui/button/button';


@Component({
  selector: 'app-create.general',
  imports: [
    MatFormField,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatError,
    NgxMaskDirective,
    Button
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
  providers: [
    provideNgxMask(),
  ],
  standalone: true
})
export class Create {
  private fb = inject(FormBuilder);

  personForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: [''], // не обязателен
    lastName: ['', [Validators.required]],
    snils: ['', [Validators.required, Validators.maxLength(11)]],
    birthPlace: ['', [Validators.required]],
    birthDate: ['', [Validators.required]]
  });

  onSubmit() {

  }
}
