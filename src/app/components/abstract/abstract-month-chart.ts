import {computed, Directive, input, signal} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';

@Directive()
export abstract class AbstractMonthChartComponent<TInterface> {
  public info = input<TInterface[] | null>(null);
  abstract displayedColumns: string[];
  abstract gridRows(): GridRow<TInterface>[];

  readonly months = [
    { key: 'jan', name: 'Январь' },
    { key: 'feb', name: 'Февраль' },
    { key: 'mar', name: 'Март' },
    { key: 'apr', name: 'Апрель' },
    { key: 'may', name: 'Май' },
    { key: 'jun', name: 'Июнь' },
    { key: 'jul', name: 'Июль' },
    { key: 'aug', name: 'Август' },
    { key: 'sep', name: 'Сентябрь' },
    { key: 'oct', name: 'Октябрь' },
    { key: 'nov', name: 'Ноябрь' },
    { key: 'dec', name: 'Декабрь' }
  ] as const;

  selectedYear = signal<number>(new Date().getFullYear());
  years = computed(() => {
    const current = new Date().getFullYear();
    return [current - 1, current, current + 1, current + 2, current + 3];
  });

  onYearChange(event: MatSelectChange) {
    const year = (event.value as number);
    this.selectedYear.set(Number(year));
  }
}

export interface GridRow<TInterface> {
  equipment: TInterface;
  expiryDate: string | null;
  monthIndex: number | null;
}


