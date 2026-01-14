import {Component, OnInit} from '@angular/core';
import {Reagent} from '../../../../data/standard-sample.interface';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../../ui/button/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

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
    MatSelect,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './reagent-dialog.html',
  styleUrl: './reagent-dialog.scss',
  standalone: true
})
export class ReagentDialog extends AbstractReagentDialog<Reagent> implements OnInit {

  protected override form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    number: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    producer: ['', [Validators.required]],
    termsOfUse: [''],
    information: [''],
    expirationDate: ['', [Validators.required]],
    produceDate: ['', [Validators.required]],
    initialQuantity: [null, [Validators.required]],
    unit: ['', [Validators.required]],
    regulatoryDocuments: this.fb.control<string[]>([]),
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
        information: value.information,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null :  value.produceDate,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit,
        regulatoryDocuments: value.regulatoryDocuments || [],
        purityTypeId: value.purityTypeId,
        purityValue: value.purityValue,
      });
    }
    const initial = this.data.guide?.get('regulatory-documents');
    this.regulatoryDocumentsSignal.set(initial || new Map());
    this.documentInput.setValue('');
  }
}
