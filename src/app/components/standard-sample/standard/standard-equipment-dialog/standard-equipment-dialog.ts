import {Component, computed, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
import {StandardMetrologicalCharacteristic, StandardReagentInfo} from '../../../../data/standard-sample.interface';
import {MatCheckbox} from '@angular/material/checkbox';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


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
    MatCheckbox,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatChipRemove,
    MatChipRow,
    MatChipGrid
  ],
  templateUrl: './standard-equipment-dialog.html',
  styleUrl: "standard-equipment-dialog.scss",
  standalone: true
})
export class StandardEquipmentDialog extends AbstractReagentDialog<StandardReagentInfo> implements OnInit {

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
        information: value.information,
        termsOfUse: value.termsOfUse,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null : value.produceDate,
        standardTypeId: value.standardTypeId,
        consumable: value.consumable,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit,
        regulatoryDocuments: value.regulatoryDocuments || [],
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

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // FormControl для ввода (не основной формы!)
  documentInput = new FormControl('');

  // Список всех возможных НД (можно загрузить из справочника)
  allDocuments: string[] = [
    'ГОСТ 8.315-2019',
    'ПНД Ф 16.1:2.2.2:2.3.74-2012',
    'ФС РФ на ГСО',
    'СТО 12345-2020'
    // ... или загружайте через this.data.guide
  ];

  // Отфильтрованные документы для автодополнения
  filteredDocuments = computed(() => {
    const input = this.documentInput.value?.toLowerCase() || '';
    return this.allDocuments.filter(doc =>
      doc.toLowerCase().includes(input)
    );
  });

  // Методы для работы с тегами
  addDocument(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.isDuplicate(value)) {
      const current = this.form.get('regulatoryDocuments')?.value || [];
      this.form.get('regulatoryDocuments')?.setValue([...current, value]);
    }
    event.chipInput!.clear();
    this.documentInput.setValue('');
  }

  removeDocument(doc: string): void {
    const current = this.form.get('regulatoryDocuments')!.value || [];
    const updated = current.filter((d: string) => d !== doc);
    this.form.get('regulatoryDocuments')?.setValue(updated);
  }

  onDocumentSelected(event: MatAutocompleteSelectedEvent): void {
    const current = this.form.get('regulatoryDocuments')?.value || [];
    if (!this.isDuplicate(event.option.viewValue)) {
      this.form.get('regulatoryDocuments')?.setValue([...current, event.option.viewValue]);
    }
    this.documentInput.setValue('');
  }

  private isDuplicate(value: string): boolean {
    const current = this.form.get('regulatoryDocuments')?.value || [];
    return current.includes(value);
  }
}
