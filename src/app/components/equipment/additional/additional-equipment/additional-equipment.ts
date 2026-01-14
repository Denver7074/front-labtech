import {Component, OnInit} from '@angular/core';


import {MatIconModule} from '@angular/material/icon';
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
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton, MatIconButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {AdditionalEquipmentDialog} from '../additional-equipment-dialog/additional-equipment-dialog';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {AbstractTableComponent} from '../../../abstract/abstract-table.component';
import {AdditionalEquipmentInfo} from '../../../../data/equipment.interface';


@Component({
  selector: 'app-additional-equipment',
  imports: [
    MatIconModule,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatTooltip,
    MatIconButton,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatTable,
    DatePipe,
    MatButton,
    MatCheckbox,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './additional-equipment.html',
  standalone: true
})
export class AdditionalEquipment extends AbstractTableComponent<AdditionalEquipmentInfo> implements OnInit {
  protected readonly AdditionalEquipmentDialog = AdditionalEquipmentDialog;

  protected override getPath(): string {
    return '/equipment-service/api/v1/organizations/parts/';
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadEntities('additional-equipments');
    this.displayedColumns = [...this.allColumns];
  }

  protected readonly allColumns = [
    'index',
    'name',
    'producer',
    'yearOfCommissioning',
    'numbers',
    'purpose',
    'location',
    'ownership',
    'actions'
  ];

  protected getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование',
      producer: 'Изготовитель',
      yearOfCommissioning: 'Год ввода в эксплуатацию',
      numbers: 'Уникальная идентификация',
      purpose: 'Назначение',
      location: 'Место установки',
      ownership: 'Право владения'
    };
    return labels[column] || column;
  }
}
