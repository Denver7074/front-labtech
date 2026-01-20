import {Component} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {Reagent} from '../../../../data/standard-sample.interface';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {Button} from '../../../ui/button/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-reagent-expenditure-dialog',
  imports: [
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatDialogActions,
    MatLabel,
    MatSuffix,
    Button,
    MatError,
    MatIconModule
  ],
  templateUrl: './reagent-expenditure-dialog.html',
  styleUrl: '../reagent-expenditure.scss',
  standalone: true
})
export class ReagentExpenditureDialog extends AbstractDialogComponent<Reagent> {

  override form: FormGroup = this.fb.group({
    id: [''],
    description: [''],
    useDate: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.min(0.001), this.greaterThanZeroValidator(), this.maxRemainValidator]]
  });

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      this.dialogRef.close({
        ...raw,
        useDate: raw.useDate ? this.formatDate(raw.useDate) : null,
      });
    }
  }

  private greaterThanZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == null || value === '') return null;
      const num = Number(value);
      return num > 0 ? null : { greaterThanZero: true };
    };
  }

  private maxRemainValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == null || value === '') return null;

      const num = Number(value);
      const remains = this.data.value?.remains ?? 0;
      return num <= remains ? null : { exceedsRemain: { max: remains } };
    };
  }
}
