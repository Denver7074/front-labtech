import {Component, OnInit} from '@angular/core';
import {AbstractMainComponent} from '../../../abstract-main.component';
import {StandardEquipmentInfo} from '../../../../../data/recources.interface';
import {StandardEquipmentDialog} from '../standard-equipment-dialog/standard-equipment-dialog';
import {Button} from '../../../../ui/button/button';
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

@Component({
  selector: 'app-standard-equipment',
  imports: [
    Button,
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
    MatHeaderCellDef
  ],
  templateUrl: './standard-equipment.html',
  styleUrl: './standard-equipment.scss',
  standalone: true
})
export class StandardEquipment extends AbstractMainComponent<StandardEquipmentInfo> implements OnInit {
  protected readonly StandardEquipmentDialog = StandardEquipmentDialog;
  protected readonly Array = Array;

  protected override getResource(): string {
    return 'standard-equipments';
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
