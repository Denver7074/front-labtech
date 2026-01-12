import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatFormField, MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {TestEquipmentInfo} from '../../../../data/equipment.interface';

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

@Component({
  selector: 'app-test-equipment-maintenance',
  imports: [CommonModule, MatTableModule, MatOption, MatSelect, MatFormField, MatButton, MatTooltip],
  templateUrl: './test-equipment-maintenance.html',
  styleUrl: './test-equipment-maintenance.scss',
  standalone: true
})
export class TestEquipmentMaintenance {
  info = input<TestEquipmentInfo[] | null>(null);
  scaleMode = signal<'MONTHLY' | 'WEEKLY'>('MONTHLY');
  selectedYear = signal<number>(new Date().getFullYear());

  years = computed(() => {
    const current = new Date().getFullYear();
    return [current - 1, current, current + 1, current + 2, current + 3];
  });

  weeks = computed(() => {
    const year = this.selectedYear();
    const weeks: { number: number; label: string }[] = [];
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    let current = new Date(start);

    while (current <= end) {
      const weekNum = getWeekNumber(current);
      weeks.push({ number: weekNum, label: `Нед. ${weekNum}` });
      current.setDate(current.getDate() + 7);
    }
    return weeks;
  });

  private getCommissioningDate(equipment: any): Date {
    return new Date(equipment.yearOfCommissioning, 0, 1);
  }

  private generateMaintenanceDates(template: any, equipment: any, periodStart: Date, periodEnd: Date): Date[] {
    if (template.frequency === 'ON_DEMAND') return [];

    let current = this.getCommissioningDate(equipment);
    const dates: Date[] = [];

    while (current <= periodEnd) {
      if (current >= periodStart) {
        dates.push(new Date(current));
      }

      switch (template.frequency) {
        case 'WEEKLY':
          current.setDate(current.getDate() + 7 * template.interval);
          break;
        case 'MONTHLY':
          current.setMonth(current.getMonth() + template.interval);
          break;
        case 'YEARLY':
          current.setFullYear(current.getFullYear() + template.interval);
          break;
      }
    }
    return dates;
  }

  gridData = computed(() => {
    const equipments = this.info();
    const year = this.selectedYear();
    if (!equipments) return [];

    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    return equipments.map(eq => {
      if (this.scaleMode() === 'WEEKLY') {
        // Теперь weeks — массив массивов строк
        const weeks: string[][] = Array(this.weeks().length).fill(null).map(() => []);
        const weekMap = new Map<number, number>();
        this.weeks().forEach((w, i) => weekMap.set(w.number, i));

        for (const mnt of eq.maintenances || []) {
          if (mnt.frequency === 'ON_DEMAND') continue;

          const dates = this.generateMaintenanceDates(mnt, eq, start, end);
          for (const date of dates) {
            const weekNum = getWeekNumber(date);
            const idx = weekMap.get(weekNum);
            if (idx !== undefined) {
              let label: string;
              if (mnt.frequency === 'WEEKLY') {
                label = mnt.interval === 1 ? 'еженедельно' : `1 раз в ${mnt.interval} нед.`;
              } else if (mnt.frequency === 'MONTHLY') {
                label = mnt.interval === 1 ? 'ежемесячно' : `1 раз в ${mnt.interval} мес.`;
              } else if (mnt.frequency === 'YEARLY') {
                label = mnt.interval === 1 ? 'ежегодно' : `1 раз в ${mnt.interval} г.`;
              } else {
                label = 'ТО';
              }

              weeks[idx].push(label); // ← добавляем в массив
            }
          }
        }

        // Преобразуем в строки с \n
        const weeksAsString: string[] = weeks.map(lines => lines.join('\n'));
        return { equipment: eq, weeks: weeksAsString };
      }

      // Месячный режим
      const months: string[][] = Array(12).fill(null).map(() => []);

      // WEEKLY — во всех месяцах
      const weeklyMnts = (eq.maintenances || []).filter(m => m.frequency === 'WEEKLY');
      for (const mnt of weeklyMnts) {
        const dates = this.generateMaintenanceDates(mnt, eq, start, end);
        const label = mnt.interval === 1 ? 'еженедельно' : `1 раз в ${mnt.interval} нед.`;
        for (const date of dates) {
          const month = date.getMonth();
          months[month].push(label);
        }
      }

      // MONTHLY
      const monthlyMnts = (eq.maintenances || []).filter(m => m.frequency === 'MONTHLY');
      for (const mnt of monthlyMnts) {
        const dates = this.generateMaintenanceDates(mnt, eq, start, end);
        const label = mnt.interval === 1 ? 'ежемесячно' : `1 раз в ${mnt.interval} мес.`;
        for (const date of dates) {
          const month = date.getMonth();
          months[month].push(label);
        }
      }

      // YEARLY
      const yearlyMnts = (eq.maintenances || []).filter(m => m.frequency === 'YEARLY');
      for (const mnt of yearlyMnts) {
        const dates = this.generateMaintenanceDates(mnt, eq, start, end);
        const label = mnt.interval === 1 ? 'ежегодно' : `1 раз в ${mnt.interval} г.`;
        for (const date of dates) {
          const month = date.getMonth();
          months[month].push(label);
        }
      }

      // Преобразуем в строки с \n
      const monthsAsString: string[] = months.map(lines => lines.join('\n'));
      return { equipment: eq, months: monthsAsString };
    });
  });

  displayedColumns = computed(() => {
    const base = ['name', 'produceNumber', 'typeName'];
    if (this.scaleMode() === 'WEEKLY') {
      return [...base, ...this.weeks().map((_, i) => `week${i}`)];
    } else {
      return [...base, ...Array.from({ length: 12 }, (_, i) => `month${i}`)];
    }
  });

  onScaleChange(mode: 'MONTHLY' | 'WEEKLY') {
    this.scaleMode.set(mode);
  }

  onYearChange(year: number) {
    this.selectedYear.set(year);
  }

  getUniqueTypeNames(maintenances: any[]): string {
    const uniqueTypes = new Set<string>();
    for (const m of maintenances) {
      if (m.typeName && m.frequency !== 'ON_DEMAND') {
        uniqueTypes.add(m.typeName);
      }
    }
    return Array.from(uniqueTypes).join('\n'); // ← \n вместо ', '
  }

  getUniqueTypeNamesWithDescriptions(maintenances: any[]) {
    const typeMap = new Map<string, string>();
    for (const m of maintenances) {
      if (m.typeName && m.frequency !== 'ON_DEMAND') {
        // Если у нескольких ТО одинаковый typeName — берём первое описание
        if (!typeMap.has(m.typeName)) {
          typeMap.set(m.typeName, m.description || '');
        }
      }
    }
    return Array.from(typeMap.entries()).map(([name, description]) => ({ name, description }));
  }
}
