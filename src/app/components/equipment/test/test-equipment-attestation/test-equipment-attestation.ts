import {Component, computed, input, signal} from '@angular/core';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

import {MatFormField, MatLabel, MatSelect, MatSelectChange, MatOption} from '@angular/material/select';
import {TestEquipmentInfo} from '../../../../data/equipment.interface';
import {AbstractMonthChartComponent, GridRow} from '../../../abstract/abstract-month-chart';
import {DatePipe} from '../../../ui/pipes/date-pipe';

@Component({
  selector: 'app-test-equipment-attestation',
  imports: [
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    DatePipe,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    DatePipe
  ],
  templateUrl: './test-equipment-attestation.html',
  styleUrl: './test-equipment-attestation.scss',
  standalone: true
})
export class TestEquipmentAttestation extends AbstractMonthChartComponent<TestEquipmentInfo> {

  displayedColumns = ['name', 'produceNumber', ...this.months.map(m => m.key)];

  gridRows = computed<GridRow<TestEquipmentInfo>[]>(() => {
    const equipments = this.info();
    const year = this.selectedYear();
    if (!equipments) return [];

    const rows: GridRow<TestEquipmentInfo>[] = [];

    for (const eq of equipments) {
      const validAttestations = (eq.attestations || [])
        .filter(att =>
          att.isSuccess &&
          att.endAt &&
          new Date(att.endAt).getFullYear() === year
        );

      if (validAttestations.length === 0) continue;

      const lastValid = validAttestations
        .sort((a, b) => new Date(b.endAt).getTime() - new Date(a.endAt).getTime())[0];

      rows.push({
        equipment: eq,
        expiryDate: lastValid.endAt,
        monthIndex: new Date(lastValid.endAt).getMonth()
      });
    }

    return rows;
  });
}
