import {Component, OnInit} from '@angular/core';
import {AbstractDialogComponent} from '../../../../abstract/abstract-dialog.component';
import {
  EquipmentAttestationInfo,
  MetrologicalCharacteristicInfo,
  TestEquipmentInfo
} from '../../../../../data/recources.interface';
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../../../ui/button/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatPrefix, MatSuffix} from '@angular/material/input';

import {MatInput, MatLabel} from '@angular/material/input';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-test-equipment-dialog',
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
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatButton,
    MatIconButton

  ],
  templateUrl: './test-equipment-dialog.html',
  standalone: true,
  styleUrl: "test-dialog.scss"
})
export class TestEquipmentDialog extends AbstractDialogComponent<TestEquipmentInfo> implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    producer: ['', [Validators.required]],
    produceYear: ['', [Validators.required]],
    yearOfCommissioning: ['', [Validators.required]],
    produceNumber: [''],
    uniqueNumber: ['', [Validators.required]],
    measurementGroup: ['', [Validators.required]],
    measurementType: ['', [Validators.required]],
    location: ['', [Validators.required]],
    characteristics: this.fb.array([]),
    attestations: this.fb.array([]),
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
      const value = this.data.value;
      const contract = value.contract || {};

      this.form.patchValue({
        id: value.id,
        name: value.name,
        producer: value.producer,
        produceYear: value.produceYear,
        yearOfCommissioning: value.yearOfCommissioning,
        produceNumber: value.produceNumber,
        uniqueNumber: value.uniqueNumber,
        measurementType: value.measurementType,
        measurementGroup: value.measurementGroup,
        location: value.location,
        contract: contract,
      });

      // Загружаем характеристики
      const charArray = this.form.get('characteristics') as FormArray;
      charArray.clear();
      (value.characteristics || []).forEach(char => {
        charArray.push(this.createCharacteristic(char));
      });

      // ✅ Загружаем аттестации
      const attArray = this.form.get('attestations') as FormArray;
      attArray.clear();
      (value.attestations || []).forEach(att => {
        attArray.push(this.createAttestation(att));
      });
    }
  }

  // === CHARACTERISTICS ===
  get characteristics(): FormArray {
    return this.form.get('characteristics') as FormArray;
  }

  createCharacteristic(char?: MetrologicalCharacteristicInfo): FormGroup {
    return this.fb.group({
      id: [char?.id || ''],
      name: [char?.name || '', Validators.required],
      value: [char?.value || '', Validators.required],
      unit: [char?.unit || '', Validators.required],
      uncertainty: [char?.unit || ''],
      unitUncertainty: [char?.unit || '']
    });
  }

  addCharacteristic(): void {
    this.characteristics.push(this.createCharacteristic());
  }

  removeCharacteristic(index: number): void {
    this.characteristics.removeAt(index);
  }

  // === ATTESTATIONS ===
  get attestations(): FormArray {
    return this.form.get('attestations') as FormArray;
  }

  createAttestation(att?: EquipmentAttestationInfo): FormGroup {
    return this.fb.group({
      id: [att?.id || ''],
      attestationNumber: [att?.attestationNumber || '', Validators.required],
      endAt: [att?.endAt || null, Validators.required],
      startAt: [att?.startAt || null, Validators.required],
      isSuccess: [att?.isSuccess ?? false]
    });
  }

  addAttestation(): void {
    this.attestations.push(this.createAttestation());
  }

  removeAttestation(index: number): void {
    this.attestations.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      const contract = {
        ...raw.contract,
        contractDate: raw.contract.contractDate ? this.formatDate(raw.contract.contractDate) : null,
        endAt: raw.contract.endAt ? this.formatDate(raw.contract.endAt) : null
      };

      const attestations = raw.attestations.map((att: any) => ({
        ...att,
        endAt: att.endAt ? this.formatDate(att.endAt) : null,
        startAt: att.startAt ? this.formatDate(att.startAt) : null
      }));

      this.dialogRef.close({
        ...raw,
        contract,
        attestations
      });
    }
  }
}
