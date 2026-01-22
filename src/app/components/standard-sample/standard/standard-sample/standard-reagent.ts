import {Component, OnInit} from '@angular/core';

import {StandardSampleDialog} from '../standard-sample-dialog/standard-sample-dialog';
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
import {AbstractReagentTable} from '../../abstract-reagent-table';
import {MatPaginator} from '@angular/material/paginator';
import {EmptyPipe} from '../../../../shared/pipes/empty-pipe';


@Component({
  selector: 'app-standard-sample',
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
    EmptyPipe,
  ],
  templateUrl: './standard-reagent.html',
  styleUrl: "../../standard-reagent.scss",
  standalone: true
})
export class StandardReagent extends AbstractReagentTable<StandardReagentInfo> implements OnInit {
  protected readonly StandardEquipmentDialog = StandardSampleDialog;

  protected override getPath(): string {
    return `/standard-sample-service/api/v1/standard-samples`;
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide(['standard-sample-type', 'regulatory-documents']);
    this.loadEntities();
    this.displayedColumns = [...this.getAllColumns()];
  }

  protected override getAllColumns(): string[] {
    return [
      ...super.getAllColumns(),
      'characteristics',
      'ownership',
      'actions'
    ];
  }

  protected override getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование, № и категория СО',
      producer: 'Изготовитель и дата выпуска',
      termsOfUse: 'Условия применения',
      regulatoryDocuments: 'Методики измерения',
      ownership: 'Право владения',
      characteristics: 'Аттестованные характеристики',
    };
    return labels[column] || column;
  }
}
