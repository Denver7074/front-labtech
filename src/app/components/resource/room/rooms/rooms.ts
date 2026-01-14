import {Component, OnInit} from '@angular/core';
import {AbstractTableComponent} from '../../../abstract/abstract-table.component';
import {RoomInfo, roomTypeMap} from '../../../../data/equipment.interface';
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

import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {RoomDialog} from '../address/room-dialog';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';


@Component({
  selector: 'app-rooms',
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
  templateUrl: './rooms.html',
  standalone: true
})
export class Rooms extends AbstractTableComponent<RoomInfo> implements OnInit {
  protected readonly AddressDialog = RoomDialog;
  protected readonly roomTypeMap = roomTypeMap;

  protected override getPath(): string {
    return '/equipment-service/api/v1/organizations/parts/';
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide(['parameter-type', 'equipment-type']);
    this.loadEntities('rooms');
    this.displayedColumns = [...this.allColumns];
  }

  protected readonly allColumns = [
    'index',
    'purpose',
    'typeRoom',
    'address',
    'square',
    'parameterTypeIds',
    'equipmentTypeIds',
    'ownership',
    'actions'
  ];

  protected getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      purpose: 'Назначение помещения',
      typeRoom: 'Тип помещения',
      address: 'Место нахождения / Идентификация',
      square: 'Площадь',
      parameterTypeIds: ' Контролируемые параметры',
      equipmentTypeIds: 'Специальное оборудование',
      ownership: 'Право владения',
    };
    return labels[column] || column;
  }
}
