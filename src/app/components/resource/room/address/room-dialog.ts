import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {Button} from '../../../../shared/button/button';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {RoomInfo, roomTypeMap} from '../../../../data/equipment.interface';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatChipGrid, MatChipRow} from '@angular/material/chips';


@Component({
  selector: 'app-room',
  imports: [
    Button,
    FormsModule,
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
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatNativeDateModule,
    MatFormFieldModule,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatChipGrid,
    MatChipRow,
    MatSelectTrigger
  ],
  templateUrl: './room-dialog.html',
  standalone: true,
})
export class RoomDialog extends AbstractDialogComponent<RoomInfo> implements OnInit {
  protected readonly roomTypeMap = roomTypeMap;
  protected equipmentType = signal<Map<string, string>>(new Map<string, string>());
  protected parameterType = signal<Map<string, string>>(new Map<string, string>());

  override form: FormGroup = this.fb.group({
    id: [''],
    purpose: ['', [Validators.required]],
    address: ['', [Validators.required]],
    organizationPartId: [''],
    typeRoom: ['', [Validators.required]],
    square: ['', [Validators.required]],
    parameterTypeIds: new FormControl<string[]>([]),
    equipmentTypeIds: new FormControl<string[]>([]),
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
      const contract = this.data.value.contract || {};
      this.form.patchValue({
        id: this.data.value.id,
        purpose: this.data.value.purpose,
        address: this.data.value.address,
        typeRoom: this.data.value.typeRoom,
        square: this.data.value.square,
        parameterTypeIds: this.data.value.parameterTypeIds || [],
        equipmentTypeIds: this.data.value.equipmentTypeIds || [],
        contract: contract,
      });
    }

    // Загрузка справочников
    const equipmentType = this.data.guide?.get('equipment-type');
    this.equipmentType.set(equipmentType ?? new Map<string, string>());
    const parameterType = this.data.guide?.get('parameter-type');
    this.parameterType.set(parameterType ?? new Map<string, string>());
  }

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      // Преобразуем даты внутри контракта
      const contract = {
        ...raw.contract,
        contractDate: raw.contract.contractDate
          ? this.formatDate(raw.contract.contractDate)
          : null,
        endAt: raw.contract.endAt
          ? this.formatDate(raw.contract.endAt)
          : null
      };

      this.dialogRef.close({
        ...raw,
        contract // ← правильно вложенный объект
      });
    }
  }

  protected removeType(id: string, field: string) {
    const control = this.form.get(field);
    if (control) {
      const current = control.value as string[] || [];
      const updated = current.filter(item => item !== id);
      control.setValue(updated);
    }
  }

  getEquipmentTypeName(id: string): string {
    return this.equipmentType().get(id) || '—';
  }

  getParameterTypeName(id: string): string {
    return this.parameterType().get(id) || '—';
  }
}
