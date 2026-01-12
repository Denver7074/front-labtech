import {Directive} from '@angular/core';
import {AbstractMainComponent} from '../resource/abstract-main.component';
import {ReagentExpenditureDialog} from './expenditure/reagent-expenditure-dialog/reagent-expenditure-dialog';
import {ReagentHistoryExpenditure} from './expenditure/reagent-history-expenditure/reagent-history-expenditure';
import {AbstractReagent} from '../../data/standard-sample.interface';
import {PageEvent} from '@angular/material/paginator';

@Directive()
export abstract class AbstractReagentComponent<TInterface extends AbstractReagent> extends AbstractMainComponent<TInterface>{
  protected readonly Array = Array;
  protected viewMode: 'table' | 'expiration-chart' = 'table';
  protected canUse: 'all' | 'isCanNotUse' | 'isCanUse' = 'all'

  protected override getPath(): string {
    return `/standard-sample-service/api/v1/organizations/parts/`;
  }

  filterInfo(info: TInterface[], canUse: string): TInterface[] {
    switch (canUse) {
      case 'isCanNotUse':
        return info.filter(item => !item.canUse);
      case 'isCanUse':
        return info.filter(item => item.canUse);
      default:
        return info;
    }
  }

  openDialogExpenditure(path: string, standardReagent: TInterface) {
    const dialogRef = this.dialog.open(ReagentExpenditureDialog, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        value: standardReagent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const p = `${this.getPath()}${this.id()}/${path}/${standardReagent.id}/add-expenditure`;
      this.add(result, p);
    });
  }

  openHistoryExpenditure(standardReagent: TInterface) {
    const dialogRef = this.dialog.open(ReagentHistoryExpenditure, {
      width: '900px',
      maxWidth: '95vw',
      data: {
        value: standardReagent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const p = `${this.getPath()}${this.id()}/standard-samples/${standardReagent.id}/delete-expenditure/${result.id}`;
      this.crudService.delete(p).subscribe({
        next: () => {
          this.loadEntities();
        },
        error: (err) => {
          console.error('Не удалось удалить сессию', err);
          this.notification.showErrorMsg('Ошибка при завершении сессии');
        }
      });
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadEntities();
  }
}
