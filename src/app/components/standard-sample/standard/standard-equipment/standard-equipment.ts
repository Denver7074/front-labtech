import {Component, OnInit} from '@angular/core';

import {StandardEquipmentDialog} from '../standard-equipment-dialog/standard-equipment-dialog';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {StandardReagentInfo} from '../../../../data/standard-sample.interface';

import {MatOption, MatSelect} from '@angular/material/select';
import {MatFormField, MatLabel} from '@angular/material/input';
import {ReagentExpiration} from '../../reagent-expiration/reagent-expiration';
import {AbstractReagentComponent} from '../../abstract-reagent.component';


@Component({
  selector: 'app-standard-equipment',
  imports: [
    DatePipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconModule,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    MatMenuTrigger,
    MatHeaderCellDef,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReagentExpiration
  ],
  templateUrl: './standard-equipment.html',
  standalone: true
})
export class StandardEquipment extends AbstractReagentComponent<StandardReagentInfo> implements OnInit {
  protected readonly StandardEquipmentDialog = StandardEquipmentDialog;

  protected override getResource(): string {
    return 'standard-samples';
  }

  protected override getPathGuide(): string[] {
    return ['standard-equipment-type'];
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide();
    this.loadEntities();
    this.displayedColumns = [...this.allColumns];
  }

  protected allColumns = [
    'index',
    'name',
    'number',
    'standardTypeId',
    'producer',
    'purpose',
    'characteristicNameValue',
    'characteristicUncertainty',
    'information',
    'termsOfUse',
    'expirationDate',
    'produceDate',
    'actions'
  ];

  getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      standardTypeId: 'Тип стандартного образца',
      name: 'Наименование',
      producer: 'Изготовитель',
      number: 'Уникальная идентификация',
      information: 'Дополнительные сведения',
      purpose: 'Назначение',
      expirationDate: 'Срок годности',
      produceDate: 'Дата выпуска',
      termsOfUse: 'Нормативный документ(НД), порядок и условия применения',
      characteristicNameValue: 'Наименование и аттестованное значение',
      characteristicUncertainty: 'Неопределённость и (или) характеристика погрешности аттестованного значения'
    };
    return labels[column] || column;
  }

  getTypeLabel(typeId: string): string | null {
    if (!typeId) return null;
    return this.valueType()!.get('standard-equipment-type')?.get(typeId) || null;
  }
}
