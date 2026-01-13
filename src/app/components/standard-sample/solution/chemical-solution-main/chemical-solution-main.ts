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
import {MatSelect, MatOption} from '@angular/material/select';
import {ReagentExpiration} from '../../reagent-expiration/reagent-expiration';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {ChemicalSolutionDialog} from '../chemical-solution-dialog/chemical-solution-dialog';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-chemical-solution-main',
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
    MatHeaderCellDef
  ],
  templateUrl: './chemical-solution-main.html',
  standalone: true
})
export class ChemicalSolutionMain extends AbstractReagentComponent<ChemicalSolutionInfo> implements OnInit {
  protected readonly ChemicalSolutionDialog = ChemicalSolutionDialog;

  protected override getResource(): string {
    return 'chemical-solution';
  }

  protected override getPathGuide(): string[] {
    return ['chemical-solution-name'];
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.loadGuide();
    this.loadEntities();
    this.displayedColumns = [...this.allColumns];
  }

  // protected allColumns = [
  //   'index',
  //   'name',
  //   'description',
  //   'dishes',
  //   'termsOfUse',
  //   'conditions',
  //   'createdSolution',
  //   'expirationDate',
  //   'initialQuantity',
  //   'remains',
  //   'actions'
  // ];
  //
  // protected override getColumnLabel(column: string): string {
  //   const labels: Record<string, string> = {
  //     name: 'Наименование',
  //     description: 'Описание',
  //     dishes: 'Посуда',
  //     termsOfUse: 'Нормативный документ (НД)',
  //     conditions: 'Условия хранения',
  //     createdSolution: 'Дата приготовления',
  //     expirationDate: 'Срок годности раствора',
  //     initialQuantity: 'Начальное количество',
  //     remains: 'Остаток',
  //   };
  //   return labels[column] || column;
  // }

  getTypeLabel(typeId: string): string | null {
    if (!typeId) return null;
    return this.valueType()!.get('chemical-solution-name')?.get(typeId) || null;
  }
}
