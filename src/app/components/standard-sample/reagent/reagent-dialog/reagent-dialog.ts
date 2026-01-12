import {Component, OnInit} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {AbstractReagent} from '../../../../data/standard-sample.interface';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../../ui/button/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelect, MatOption} from '@angular/material/select';

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
export class ReagentDialog extends AbstractDialogComponent<AbstractReagent> implements OnInit {

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
    if (this.data.mode === 'edit' && this.data.value) {
      const value = this.data.value;

      this.form.patchValue({
        id: value.id,
        name: value.name,
        number: value.number,
        purpose: value.purpose,
        producer: value.producer,
        termsOfUse: value.termsOfUse,
        expirationDate: value.expirationDate,
        produceDate: value.produceDate,
        initialQuantity: value.initialQuantity,
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
