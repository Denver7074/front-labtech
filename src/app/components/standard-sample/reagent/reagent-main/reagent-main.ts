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
import {ChemicalSolutionInfo} from '../../../../data/standard-sample.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/input';
import {AbstractReagentComponent} from '../../abstract-reagent.component';
import {MatTooltip} from '@angular/material/tooltip';
import {ReagentExpiration} from '../../reagent-expiration/reagent-expiration';
import {ReagentDialog} from '../reagent-dialog/reagent-dialog';
import {MatPaginator} from '@angular/material/paginator';
import {EmptyPipe} from '../../../ui/pipes/empty-pipe';

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
    EmptyPipe,
  ],
  templateUrl: './reagent-main.html',
  standalone: true
})
export class ReagentMain extends AbstractReagentComponent<ChemicalSolutionInfo> implements OnInit {
  protected readonly ReagentDialog = ReagentDialog;

  protected override getPath(): string {
    return `/standard-sample-service/api/v1/reagents`;
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide(['purity-reagent-type', 'regulatory-documents']);
    this.loadEntities();
    this.displayedColumns = [...this.allColumns];
  }

  protected getPurity(typeId: string, value: number): string | '-' {
    if (!typeId) return '-';
    const type = this.getTypeValue(typeId, 'purity-reagent-type') || null;
    return type + ` ${value}`
  }

  protected override allColumns = [
    'index',
    'name',
    'producer',
    'purpose',
    'purity',
    'information',
    'ownership',
    'regulatoryDocuments',
    'termsOfUse',
    'actions'
  ];

  protected override getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование, номер реактива',
      producer: 'Изготовитель и дата выпуска',
      information: 'Дополнительные сведения',
      ownership: 'Право владения',
      purpose: 'Назначение',
      purity: 'Степень чистоты',
      termsOfUse: 'Условия применения',
      regulatoryDocuments: 'Нормативные документы (НД)',
    };
    return labels[column] || column;
  }
}
