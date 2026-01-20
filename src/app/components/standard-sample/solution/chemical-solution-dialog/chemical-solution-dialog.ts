import {Component, OnInit} from '@angular/core';
import {ChemicalSolutionInfo, SolutionComponentInfo} from '../../../../data/standard-sample.interface';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {Button} from "../../../ui/button/button";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

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
    MatTooltip,
    MatAccordion,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  templateUrl: './chemical-solution-dialog.html',
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
    solutionComponents: this.fb.array([]),
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

      const charArray = this.form.get('solutionComponents') as FormArray;
      charArray.clear();
      (value.solutionComponents || []).forEach(char => {
        charArray.push(this.createSolutionComponents(char));
      });
    }
    const initial = this.data.guide?.get('regulatory-documents');
    this.regulatoryDocumentsSignal.set(initial || new Map());
    this.documentInput.setValue('');
  }

  // === SolutionComponents ===
  get solutionComponents(): FormArray {
    return this.form.get('solutionComponents') as FormArray;
  }

  createSolutionComponents(char?: SolutionComponentInfo): FormGroup {
    return this.fb.group({
      id: [this.isCreateAsTemplate ? '' : char?.id || ''],
      type: [char?.type || '', Validators.required],
      value: [char?.value || '', Validators.required],
      reagentId: [char?.reagentId || '', Validators.required],
    });
  }

  addSolutionComponents(): void {
    this.solutionComponents.push(this.createSolutionComponents());
  }

  removeSolutionComponent(index: number): void {
    this.solutionComponents.removeAt(index);
  }
}
