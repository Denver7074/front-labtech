import {Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatError, MatFormField, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {AdditionalEquipmentInfo} from '../../../../data/equipment.interface';
import {Button} from '../../../ui/button/button';

@Component({
  selector: 'app-additional-equipment-dialog',
  imports: [
    Button,
    FormsModule,
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
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion
  ],
  templateUrl: './additional-equipment-dialog.html',
  standalone: true
})
export class AdditionalEquipmentDialog extends AbstractDialogComponent<AdditionalEquipmentInfo> implements OnInit {

  protected override form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    producer: ['', [Validators.required]],
    produceYear: ['', [Validators.required]],
    yearOfCommissioning: ['', [Validators.required]],
    produceNumber: [''],
    uniqueNumber: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    location: ['', [Validators.required]],
    contract: this.fb.group({
      id: [''],
      contractNumber: ['', Validators.required],
      contractDate: ['', Validators.required],
      endAt: [''],
      isOwn: [true, Validators.required]
    })
  });


  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      const contract = this.data.value.contract || {};
      this.form.patchValue({
        id: this.data.value.id,
        name: this.data.value.name,
        producer: this.data.value.producer,
        produceYear: this.data.value.produceYear,
        yearOfCommissioning: this.data.value.yearOfCommissioning,
        produceNumber: this.data.value.produceNumber,
        uniqueNumber: this.data.value.uniqueNumber,
        purpose: this.data.value.purpose,
        location: this.data.value.location,
        contract: contract,
      });
    }
  }

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      const contract = {
        ...raw.contract,
        contractDate: raw.contract.contractDate
          ? this.formatDate(raw.contract.contractDate)
          : null,
        endAt: raw.contract.endAt
          ? this.formatDate(raw.contract.endAt)
          : null
      };

      this.dialogRef.close({
        ...raw,
        contract
      });
    }
  }
}
