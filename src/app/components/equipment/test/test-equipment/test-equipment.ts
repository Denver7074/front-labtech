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
import {TestEquipmentDialog} from '../test-equipment-dialog/test-equipment-dialog';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {TestEquipmentAttestation} from '../test-equipment-attestation/test-equipment-attestation';
import {TestEquipmentMaintenance} from '../test-equipment-maintenance/test-equipment-maintenance';
import {AbstractTableComponent} from '../../../resource/abstract-main.component';
import {TestEquipmentInfo} from '../../../../data/equipment.interface';

@Component({
  selector: 'app-test-equipment',
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
    MatCheckbox,
    MatMenuModule,
    MatButton,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    TestEquipmentAttestation,
    TestEquipmentMaintenance
  ],
  templateUrl: './test-equipment.html',
  standalone: true
})
export class TestEquipment extends AbstractTableComponent<TestEquipmentInfo> implements OnInit {
  protected readonly TestEquipmentDialog = TestEquipmentDialog;
  protected readonly Array = Array;
  protected viewMode: 'table' | 'attestation-chart' | 'maintenance-chart' = 'table';

  protected override getResource(): string {
    return 'test-equipments';
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
    'producer',
    'yearOfCommissioning',
    'numbers',
    'measurementType',
    'measurementGroup',
    'location',
    'characteristics',
    'attestation',
    'ownership',
    'actions'
  ];

  getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование',
      producer: 'Изготовитель',
      yearOfCommissioning: 'Год ввода в эксплуатацию',
      numbers: 'Уникальная идентификация',
      measurementType: 'Наименование видов испытаний',
      measurementGroup: 'Наименование испытуемых групп объектов',
      location: 'Место установки',
      characteristics: 'Технические характеристики',
      attestation: 'Аттестация',
      ownership: 'Право владения'
    };
    return labels[column] || column;
  }

  getLastAttestation(attestations: any[]): any | null {
    if (!attestations?.length) return null;
    return attestations[attestations.length - 1]
  }
}
