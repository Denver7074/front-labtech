import {Component, OnInit} from '@angular/core';
import {Reagent} from '../../../../data/standard-sample.interface';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {Button} from '../../../../shared/button/button';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatSelect} from '@angular/material/select';
import {debounceTime, startWith} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-precursor-dialog',
  imports: [
    Button,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
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
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatTooltip,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatSelect,
    DatePipe
  ],
  templateUrl: './precursor-dialog.html',
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
        termsOfUse: value.termsOfUse,
        information: value.information,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null :  value.produceDate,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit,
        regulatoryDocuments: value.regulatoryDocuments || [],
        contract: this.isCreateAsTemplate ? null : value.contract || {},
      });
    }
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
}
