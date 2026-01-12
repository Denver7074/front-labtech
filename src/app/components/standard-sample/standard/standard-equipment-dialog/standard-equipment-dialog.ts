import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Button} from '../../../ui/button/button';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {StandardMetrologicalCharacteristic, StandardReagentInfo} from '../../../../data/standard-sample.interface';
import {MatCheckbox} from '@angular/material/checkbox';
import {Mode} from '../../../../data/response.interface';


@Component({
  selector: 'app-standard-equipment-dialog',
  imports: [
    Button,
    MatAccordion,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatIconModule,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: './standard-equipment-dialog.html',
  styleUrl: "standard-equipment-dialog.scss",
  standalone: true
})
export class StandardEquipmentDialog extends AbstractDialogComponent<StandardReagentInfo> implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    standardTypeId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    number: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    producer: ['', [Validators.required]],
    information: [''],
    termsOfUse: ['', [Validators.required]],
    expirationDate: ['', [Validators.required]],
    produceDate: ['', [Validators.required]],
    characteristics: this.fb.array([]),
    consumable: [false, [Validators.required]],
    initialQuantity: [],
    unit: ['']
  });

  ngOnInit() {
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

      console.log(this.data.value)
      this.form.patchValue({
        id: this.isCreateAsTemplate ? null : value.id,
        name: value.name,
        number: this.isCreateAsTemplate ? null : value.number,
        purpose: value.purpose,
        producer: value.producer,
        information: value.information,
        termsOfUse: value.termsOfUse,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null : value.produceDate,
        standardTypeId: value.standardTypeId,
        consumable: value.consumable,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit
      });

      const charArray = this.form.get('characteristics') as FormArray;
      charArray.clear();
      (value.characteristics || []).forEach(char => {
        charArray.push(this.createCharacteristic(char));
      });
    }
  }

  // === CHARACTERISTICS ===
  get characteristics(): FormArray {
    return this.form.get('characteristics') as FormArray;
  }

  createCharacteristic(char?: StandardMetrologicalCharacteristic): FormGroup {
    return this.fb.group({
      id: [this.isCreateAsTemplate ? '' : char?.id || ''],
      name: [char?.name || '', Validators.required],
      value: [char?.value || '', Validators.required],
      unit: [char?.unit || '', Validators.required],
      uncertainty: [char?.uncertainty || ''],
      unitUncertainty: [char?.unitUncertainty || ''],
    });
  }

  addCharacteristic(): void {
    this.characteristics.push(this.createCharacteristic());
  }

  removeCharacteristic(index: number): void {
    this.characteristics.removeAt(index);
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
