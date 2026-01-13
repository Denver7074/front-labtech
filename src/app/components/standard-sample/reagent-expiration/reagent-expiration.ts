import {Component, computed} from '@angular/core';
import {AbstractMonthChartComponent, GridRow} from '../../abstract/abstract-month-chart';
import {ChemicalSolutionInfo} from '../../../data/standard-sample.interface';

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
import {MatTooltip} from '@angular/material/tooltip';

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
    MatHeaderCellDef,
    MatTooltip
  ],
  templateUrl: './reagent-expiration.html',
  styleUrl: './reagent-expiration.scss',
  standalone: true
})
export class ReagentExpiration extends AbstractMonthChartComponent<ChemicalSolutionInfo> {
  displayedColumns = ['name', 'initialQuantity', 'remains', ...this.months.map(m => m.key)];

  gridRows = computed<GridRow<ChemicalSolutionInfo>[]>(() => {
    const equipments = this.info();
    const year = this.selectedYear();
    if (!equipments) return [];

    const rows: GridRow<ChemicalSolutionInfo>[] = [];

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

  getValue(value: number, unit: string): string {
    if (value == null) return '-';
    return `${value}, ${unit}`
  }
}
