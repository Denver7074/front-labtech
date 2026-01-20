import {Component, OnInit} from '@angular/core';
import {AbstractReagentComponent} from '../../abstract-reagent.component';
import {ChemicalSolutionInfo} from '../../../../data/standard-sample.interface';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatOption, MatSelect} from '@angular/material/select';
import {ReagentExpiration} from '../../reagent-expiration/reagent-expiration';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatTooltip} from '@angular/material/tooltip';
import {EmptyPipe} from '../../../ui/pipes/empty-pipe';
import {ReagentDialog} from '../precursor-dialog/precursor-dialog';


@Component({
  selector: 'app-precursors-main',
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
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    ReagentExpiration,
    MatTooltip,
    MatMenuTrigger,
    MatHeaderCellDef,
    EmptyPipe
  ],
  templateUrl: './precursors-main.html',
  styleUrl: "../../standard-reagent.scss",
  standalone: true
})
export class PrecursorsMain extends AbstractReagentComponent<ChemicalSolutionInfo> implements OnInit {
  protected readonly PrecursorsDialog = ReagentDialog;

  protected override getPath(): string {
    return `/standard-sample-service/api/v1/precursors`;
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide(['regulatory-documents']);
    this.loadEntities();
    this.displayedColumns = [...this.allColumns];
  }

  protected override allColumns = [
    'index',
    'name',
    'producer',
    'termsOfUse',
    'regulatoryDocuments',
    'ownership',
    'actions'
  ];

  protected override getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование, номер реактива',
      producer: 'Изготовитель и дата выпуска',
      termsOfUse: 'Условия применения',
      ownership: 'Право владения',
      regulatoryDocuments: 'Нормативные документы (НД)',
    };
    return labels[column] || column;
  }
}
