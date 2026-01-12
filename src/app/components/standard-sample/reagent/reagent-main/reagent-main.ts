import {Component, OnInit} from '@angular/core';
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
  MatTable,
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatOption, MatSelect} from '@angular/material/select';
import {AbstractReagent} from '../../../../data/standard-sample.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/input';
import {AbstractReagentComponent} from '../../abstract-reagent.component';
import {MatTooltip} from '@angular/material/tooltip';
import {ReagentExpiration} from '../../reagent-expiration/reagent-expiration';
import {ReagentDialog} from '../reagent-dialog/reagent-dialog';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-reagent-main',
  imports: [
    DatePipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconModule,
    MatIconButton,
    MatLabel,
    MatMenu,
    MatMenuItem,
    MatOption,
    MatRow,
    MatRowDef,
    MatMenuTrigger,
    MatTooltip,
    MatTable,
    MatSelect,
    ReagentExpiration,
    MatHeaderCellDef,
    MatPaginator,
  ],
  templateUrl: './reagent-main.html',
  standalone: true
})
export class ReagentMain extends AbstractReagentComponent<AbstractReagent> implements OnInit {
  protected readonly ReagentDialog = ReagentDialog;

  protected override getResource(): string {
    return 'reagent';
  }

  protected override getPathGuide(): string[] {
    return ['purity-reagent-type'];
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
    'producer',
    'purpose',
    'termsOfUse',
    'expirationDate',
    'produceDate',
    'purity',
    'actions'
  ];

  getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование',
      producer: 'Изготовитель',
      number: 'Уникальная идентификация',
      purpose: 'Назначение',
      expirationDate: 'Срок годности',
      produceDate: 'Дата выпуска',
      termsOfUse: 'Нормативный документ(НД), порядок и условия применения',
      purity: 'Чистота реактива'
    };
    return labels[column] || column;
  }

  getPurity(typeId: string, value: number): string | '-' {
    if (!typeId) return '-';
    const type = this.valueType()!.get('purity-reagent-type')?.get(typeId) || null;
    return type + ` ${value}`
  }
}
