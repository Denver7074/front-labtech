import {Component, inject} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {ChemicalSolutionInfo, Reagent, reagentTypeMap} from '../../../../data/standard-sample.interface';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
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
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {ActDebitingDialog} from '../act-debiting/act-debiting-dialog';
import {Button} from '../../../../shared/button/button';
import {ReagentDialog} from '../../precursors/precursor-dialog/precursor-dialog';
import {CrudService} from '../../../../service/crud.service';

@Component({
  selector: 'app-reagent-history-expenditure',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    DatePipe,
    MatTable,
    MatDialogContent,
    MatDialogTitle,
    MatTooltip,
    MatIconButton,
    MatIconModule,
    Button
  ],
  templateUrl: './reagent-history-expenditure.html',
  styleUrl: '../reagent-expenditure.scss',
  standalone: true
})
export class ReagentHistoryExpenditure extends AbstractDialogComponent<Reagent> {
  private crudService = inject(CrudService);
  protected dialog = inject(MatDialog);
  protected readonly PrecursorsDialog = ReagentDialog;
  protected displayedColumns = ['useDate', 'quantity', 'description',  'executor', 'actions'];

  deleteExpenditure(id: string) {
    this.dialogRef.close({
      id: id
    });
  }

  ngOnInit() {
    // Базовые колонки
    const columns = ['useDate', 'quantity', 'description', 'executor'];

    // Добавляем actions только если нет акта списания
    if (!this.data.value?.actDebiting) {
      columns.push('actions');
    }

    this.displayedColumns = columns;
  }

  protected openDialog(reagent: Reagent | undefined) {
    const dialogRef = this.dialog.open(ActDebitingDialog, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        value: reagent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      const p = `/standard-sample-service/api/v1/${reagentTypeMap.get(reagent!.type)}/${reagent?.id}/organizations/parts/${reagent?.organizationPartId}/debiting`;
      this.crudService.post(result, p).subscribe({
        error: (err) => {
          console.error('Ошибка сохранения НД:', err);
          // Показать snackbar с ошибкой
        }
      });
    });
  }
}
