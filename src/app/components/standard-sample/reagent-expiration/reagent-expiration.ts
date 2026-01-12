import {Component, computed} from '@angular/core';
import {AbstractMonthChartComponent, GridRow} from '../../abstract/abstract-month-chart';
import {AbstractReagent} from '../../../data/standard-sample.interface';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatFormField, MatLabel} from '@angular/material/input';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reagent-expiration',
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatLabel,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './reagent-expiration.html',
  styleUrl: './reagent-expiration.scss',
  standalone: true
})
export class ReagentExpiration extends AbstractMonthChartComponent<AbstractReagent> {
  displayedColumns = ['name', 'number', ...this.months.map(m => m.key)];

  gridRows = computed<GridRow<AbstractReagent>[]>(() => {
    const equipments = this.info();
    const year = this.selectedYear();
    if (!equipments) return [];

    const rows: GridRow<AbstractReagent>[] = [];

    for (const eq of equipments) {
      if (!eq.expirationDate) continue;

      const expYear = new Date(eq.expirationDate).getFullYear();
      if (expYear !== year) continue;

      rows.push({
        equipment: eq,
        expiryDate: eq.expirationDate,
        monthIndex: new Date(eq.expirationDate).getMonth()
      });
    }

    return rows.sort((a, b) => {
      return new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime();
    });
  });
}
