import {Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {Button} from '../../../ui/button/button';
import {MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {MatIconModule} from '@angular/material/icon';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {PersonInfo} from '../../../../data/profile.interface';


@Component({
  selector: 'app-profile',
  imports: [
    Button,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatIconModule
  ],
  templateUrl: './profile.html',
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})
export class ProfileDialog extends AbstractDialogComponent<PersonInfo> implements OnInit {
  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: [''],
    lastName: ['', [Validators.required]],
    snils: ['', [Validators.required, Validators.maxLength(11)]],
    birthPlace: ['', [Validators.required]],
    birthDate: ['', [Validators.required]]
  });

  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      this.form.patchValue({
        firstName: this.data.value.firstName,
        middleName: this.data.value.middleName,
        lastName: this.data.value.lastName,
        snils: this.data.value.snils,
        birthPlace: this.data.value.birthPlace,
        birthDate: this.data.value.birthDate ? new Date(this.data.value.birthDate) : null,
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();
      this.dialogRef.close({
        ...this.form.value,
        birthDate: rawValue.birthDate ? rawValue.birthDate.toISOString().split('T')[0] : null,
      });
    }
  }
}
