import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormDataInterface} from '../../../../data/response.interface';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel, MatError} from '@angular/material/input';
import {Button} from '../../../ui/button/button';
import {MatIconModule} from '@angular/material/icon';
import {PERIOD_LABELS, TariffPlanInfo, TariffPriceInfo} from '../../../../data/subscribe.interface';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {map} from 'rxjs';
import {GuideService} from '../../../../service/guide.service';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';

@Component({
  selector: 'app-tariff-dialog',
  imports: [
    MatIconModule,
    MatInput,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    Button,
    MatDialogClose,
    MatDialogActions,
    MatButton,
    MatIconButton,
    MatOption,
    MatSelect,
    MatError,
    MatCheckbox,
  ],
  templateUrl: './tariff-dialog.html',
  standalone: true
})
export class TariffDialog extends AbstractDialogComponent<TariffPlanInfo> implements OnInit {
  protected readonly PERIOD_LABELS = PERIOD_LABELS;
  protected readonly periodKeys = Object.keys(PERIOD_LABELS);

  override form: FormGroup = this.fb.group({
    id: [''],
    trial: [false, [Validators.required]],
    tariffPlanTypeId: ['', [Validators.required]],
    tariffs: this.fb.array([])
  });

  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      const { id, trial, tariffPlanTypeId, tariffs } = this.data.value;
      this.form.patchValue({ id, trial, tariffPlanTypeId });
      this.setTariffs(tariffs || []);
    } else {
      this.addTariff();
    }
  }

  private setTariffs(tariffs: TariffPriceInfo[]): void {
    const tariffsArray = this.form.get('tariffs') as FormArray;
    tariffsArray.clear();
    tariffs.forEach(t => {
      tariffsArray.push(this.createTariffGroup(t));
    });
  }

  private createTariffGroup(tariff?: TariffPriceInfo): FormGroup {
    return this.fb.group({
      period: [tariff?.period || '', Validators.required],
      amount: [tariff?.amount || 0, [Validators.required, Validators.min(0)]]
    });
  }

  get tariffsFormArray(): FormArray {
    return this.form.get('tariffs') as FormArray;
  }

  getTariffsControls() {
    return this.tariffsFormArray.controls as FormGroup[];
  }

  addTariff(): void {
    this.tariffsFormArray.push(this.createTariffGroup());
  }

  removeTariff(index: number): void {
    if (this.tariffsFormArray.length > 1) {
      this.tariffsFormArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.form.get('trial')?.value === true) {
      const tariffs = this.form.get('tariffs') as FormArray;
      tariffs.clear();
    }
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();

      const result: TariffPlanInfo = {
        ...rawValue,
        tariffs: rawValue.tariffs.map((t: any) => ({
            period: t.period,
            amount: Number(t.amount)
          }))
      };

      this.dialogRef.close(result);
    }
  }
}
