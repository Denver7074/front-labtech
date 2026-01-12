import {Component, OnInit} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {
  ChemicalSolutionInfo,
  StandardMetrologicalCharacteristic,
  StandardReagentInfo
} from '../../../../data/standard-sample.interface';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {Mode} from '../../../../data/response.interface';

@Component({
  selector: 'app-chemical-solution-dialog',
  imports: [],
  templateUrl: './chemical-solution-dialog.html',
  styleUrl: './chemical-solution-dialog.scss',
  standalone: true
})
export class ChemicalSolutionDialog extends AbstractDialogComponent<ChemicalSolutionInfo> implements OnInit {
  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    description: [''],
    dishes: [''],
    conditions: [''],
    termsOfUse: ['', [Validators.required]],
    expirationDate: ['', [Validators.required]],
    createdSolution: ['', [Validators.required]],
    initialQuantity: [null, [Validators.required]],
    unit: ['', [Validators.required]]
  });

  ngOnInit() {
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

      console.log(this.data.value)
      this.form.patchValue({
        id: this.isCreateAsTemplate ? null : value.id,
        name: value.name,
        conditions: value.conditions,
        description: value.description,
        dishes: value.dishes,
        termsOfUse: value.termsOfUse,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        createdSolution: this.isCreateAsTemplate ? null : value.createdSolution,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit
      });
    }
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
