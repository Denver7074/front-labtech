import {Component, OnInit} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {Reagent} from '../../../../data/standard-sample.interface';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../../ui/button/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {Mode} from '../../../../data/response.interface';

@Component({
  selector: 'app-reagent-dialog',
  imports: [
    Button,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIconModule,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './reagent-dialog.html',
  styleUrl: './reagent-dialog.scss',
  standalone: true
})
export class ReagentDialog extends AbstractDialogComponent<Reagent> implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    number: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    producer: [''],
    termsOfUse: [''],
    expirationDate: ['', [Validators.required]],
    produceDate: ['', [Validators.required]],
    initialQuantity: [],
    unit: ['', [Validators.required]],
    purityTypeId: [''],
    purityValue: [''],
  });

  ngOnInit() {
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

      this.form.patchValue({
        id: this.isCreateAsTemplate ? null : value.id,
        name: value.name,
        number: this.isCreateAsTemplate ? null : value.number,
        purpose: value.purpose,
        producer: value.producer,
        termsOfUse: value.termsOfUse,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null :  value.produceDate,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit,
        purityTypeId: value.purityTypeId,
        purityValue: value.purityValue,
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      this.dialogRef.close({
        ...raw,
        produceDate: raw.produceDate ? this.formatDate(raw.produceDate) : null,
        expirationDate: raw.expirationDate ? this.formatDate(raw.expirationDate) : null
      });
    }
  }
}
