import {Component} from '@angular/core';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {Reagent, ExpenditureInfo} from '../../../../data/standard-sample.interface';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
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
  MatRowDef, MatTable
} from '@angular/material/table';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reagent-history-expenditure',
  imports: [
    MatDialogActions,
    MatButton,
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
    MatIconModule
  ],
  templateUrl: './reagent-history-expenditure.html',
  styleUrl: './reagent-history-expenditure.scss',
  standalone: true
})
export class ReagentHistoryExpenditure extends AbstractDialogComponent<Reagent> {
  protected readonly displayedColumns = ['useDate', 'quantity', 'description',  'executor', 'actions'];

  deleteExpenditure(id: string) {
    this.dialogRef.close({
      id: id
    });
  }
}
