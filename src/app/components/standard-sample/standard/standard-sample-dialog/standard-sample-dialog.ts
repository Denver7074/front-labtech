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
import {Button} from '../../../../shared/button/button';
import {StandardMetrologicalCharacteristic, StandardReagentInfo} from '../../../../data/standard-sample.interface';
import {MatCheckbox} from '@angular/material/checkbox';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatTooltip} from '@angular/material/tooltip';
import {debounceTime, startWith} from 'rxjs';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-standard-sample-dialog',
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
    MatCheckbox,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatChipRemove,
    MatChipRow,
    MatChipGrid,
    MatTooltip,
    DatePipe,
  ],
  templateUrl: './standard-sample-dialog.html',
  standalone: true
})
export class StandardSampleDialog extends AbstractReagentDialog<StandardReagentInfo> implements OnInit {

  protected override form: FormGroup = this.fb.group({
    id: [''],
    standardTypeId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    number: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    producer: ['', [Validators.required]],
    information: [''],
    termsOfUse: [''],
    expirationDate: ['', [Validators.required]],
    produceDate: ['', [Validators.required]],
    characteristics: this.fb.array([]),
    consumable: [false, [Validators.required]],
    initialQuantity: [],
    unit: [''],
    regulatoryDocuments: this.fb.control<string[]>([]),
    contract: this.fb.group({
      id: [''],
      contractNumber: ['', Validators.required],
      contractDate: ['', Validators.required],
      endAt: [''],
      isOwn: [true, Validators.required]
    }),
  });

  ngOnInit() {
    this.loadContract();
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

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
        unit: value.unit,
        regulatoryDocuments: value.regulatoryDocuments || [],
        contract: this.isCreateAsTemplate ? null : value.contract || {},
      });

      const charArray = this.form.get('characteristics') as FormArray;
      charArray.clear();
      (value.characteristics || []).forEach(char => {
        charArray.push(this.createCharacteristic(char));
      });
    }

    this.form.get('consumable')?.valueChanges.subscribe(isConsumable => {
      this.toggleConsumableValidators(isConsumable);
    });

    // Инициализация при первом запуске
    this.toggleConsumableValidators(this.form.get('consumable')?.value);

    const initial = this.data.guide?.get('regulatory-documents');
    this.regulatoryDocumentsSignal.set(initial || new Map());
    this.documentInput.setValue('');
    this.form.get('contract.contractNumber')?.valueChanges.pipe(
      startWith(''),
      debounceTime(200)
    ).subscribe(value => {
      this.filterContracts(value);
    });
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

  private toggleConsumableValidators(isConsumable: boolean): void {
    const quantityCtrl = this.form.get('initialQuantity');
    const unitCtrl = this.form.get('unit');

    if (isConsumable) {
      // Добавляем валидаторы
      quantityCtrl?.setValidators([
        Validators.required,
        Validators.min(0.001)
      ]);
      unitCtrl?.setValidators([Validators.required]);
    } else {
      // Убираем валидаторы
      quantityCtrl?.clearValidators();
      unitCtrl?.clearValidators();
    }

    // Обновляем статус валидности
    quantityCtrl?.updateValueAndValidity();
    unitCtrl?.updateValueAndValidity();
  }
}
