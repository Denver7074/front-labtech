import {Component} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {ActDebitingInfo} from '../../../../data/standard-sample.interface';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../../../shared/button/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-act-debiting',
  imports: [
    Button,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIconModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix
  ],
  templateUrl: './act-debiting-dialog.html',
  styleUrl: './act-debiting-dialog.scss',
  standalone: true
})
export class ActDebitingDialog extends AbstractDialogComponent<ActDebitingInfo> {

  protected override form: FormGroup = this.fb.group({
    id: [''],
    dateDebit: ['', [Validators.required]],
    description: [''],
    purpose: ['', [Validators.required]],
  });

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      this.dialogRef.close({
        ...raw,
        dateDebit: raw.dateDebit ? this.formatDate(raw.dateDebit) : null,
      });
    }
  }
}
