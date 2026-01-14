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
import {MatPaginator} from '@angular/material/paginator';


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
    ReagentExpiration,
    MatPaginator,
  ],
  templateUrl: './standard-reagent.html',
  standalone: true
})
export class StandardReagent extends AbstractReagentComponent<StandardReagentInfo> implements OnInit {
  protected readonly StandardEquipmentDialog = StandardEquipmentDialog;

  protected override getPathValue(): string {
    return 'standard-samples';
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide(['standard-equipment-type', 'regulatory-documents']);
    this.loadEntities('standard-samples');
    this.displayedColumns = [...this.allColumns];
  }

  protected override allColumns = [
    'index',
    'name',
    'producer',
    'purpose',
    'characteristicNameValue',
    'characteristicUncertainty',
    'information',
    'regulatoryDocuments',
    'termsOfUse',
    'actions'
  ];

  protected override getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование, № и категория СО',
      producer: 'Изготовитель и дата выпуска',
      information: 'Дополнительные сведения',
      purpose: 'Назначение',
      termsOfUse: 'Условия применения',
      regulatoryDocuments: 'Нормативные документы (НД)',
      characteristicNameValue: 'Наименование и аттестованное значение',
      characteristicUncertainty: 'Неопределённость и (или) характеристика погрешности аттестованного значения'
    };
    return labels[column] || column;
  }
}
