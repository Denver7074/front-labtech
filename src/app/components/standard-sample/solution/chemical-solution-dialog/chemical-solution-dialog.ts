import {Component, OnInit} from '@angular/core';
import {ChemicalSolutionInfo} from '../../../../data/standard-sample.interface';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {Button} from "../../../ui/button/button";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-chemical-solution-dialog',
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
    MatTooltip
  ],
  templateUrl: './chemical-solution-dialog.html',
  styleUrl: './chemical-solution-dialog.scss',
  standalone: true
})
export class ChemicalSolutionDialog extends AbstractReagentDialog<ChemicalSolutionInfo> implements OnInit {

  protected override form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    termsOfUse: [''],
    information: [''],
    expirationDate: ['', [Validators.required]],
    produceDate: ['', [Validators.required]],
    initialQuantity: [null, [Validators.required]],
    unit: ['', [Validators.required]],
    regulatoryDocuments: this.fb.control<string[]>([]),
  });

  ngOnInit() {
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

      this.form.patchValue({
        id: this.isCreateAsTemplate ? null : value.id,
        name: value.name,
        purpose: value.purpose,
        termsOfUse: value.termsOfUse,
        information: value.information,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null :  value.produceDate,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit,
        regulatoryDocuments: value.regulatoryDocuments || [],
      });
    }
    const initial = this.data.guide?.get('regulatory-documents');
    this.regulatoryDocumentsSignal.set(initial || new Map());
    this.documentInput.setValue('');
  }
}
