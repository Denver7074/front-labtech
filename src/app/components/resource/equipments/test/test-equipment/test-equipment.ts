import {Component, OnInit} from '@angular/core';
import {AbstractMainComponent} from '../../../abstract-main.component';
import {TestEquipmentInfo} from '../../../../../data/recources.interface';
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
import {Button} from '../../../../ui/button/button';
import {DatePipe} from '@angular/common';
import {TestEquipmentDialog} from '../test-equipment-dialog/test-equipment-dialog';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';

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
    Button,
    DatePipe,
    MatCheckbox,
    MatButton,
    MatMenuModule
  ],
  templateUrl: './test-equipment.html',
  styleUrl: './test-equipment.scss',
  standalone: true
})
export class TestEquipment extends AbstractMainComponent<TestEquipmentInfo> implements OnInit {
  protected readonly TestEquipmentDialog = TestEquipmentDialog;
  protected readonly Array = Array;

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
