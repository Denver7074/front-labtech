import { MatPaginatorIntl } from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable()
export class RussianPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Элементов на странице:';
  override nextPageLabel = 'Следующая страница';
  override previousPageLabel = 'Предыдущая страница';
  override firstPageLabel = 'Первая страница';
  override lastPageLabel = 'Последняя страница';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const start = page * pageSize + 1;
    const end = Math.min(start + pageSize - 1, length);
    return `${start}–${end} из ${length}`;
  };
}
