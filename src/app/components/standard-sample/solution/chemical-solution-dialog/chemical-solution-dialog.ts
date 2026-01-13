import {Component, OnInit} from '@angular/core';
import {ChemicalSolutionInfo} from '../../../../data/standard-sample.interface';
import {FormGroup, Validators} from '@angular/forms';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';

@Component({
  selector: 'app-chemical-solution-dialog',
  imports: [],
  templateUrl: './chemical-solution-dialog.html',
  styleUrl: './chemical-solution-dialog.scss',
  standalone: true
})
export class ChemicalSolutionDialog extends AbstractReagentDialog<ChemicalSolutionInfo> implements OnInit {
  override form: FormGroup = this.fb.group({
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
        termsOfUse: value.termsOfUse,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null : value.produceDate,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit
      });
    }
  }
}
