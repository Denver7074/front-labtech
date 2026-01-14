import {Directive} from '@angular/core';
import {AbstractTableComponent} from '../abstract/abstract-table.component';
import {ReagentExpenditureDialog} from './expenditure/reagent-expenditure-dialog/reagent-expenditure-dialog';
import {ReagentHistoryExpenditure} from './expenditure/reagent-history-expenditure/reagent-history-expenditure';
import {ChemicalSolutionInfo} from '../../data/standard-sample.interface';
import {Mode} from '../../data/response.interface';
import {MatDialogRef} from '@angular/material/dialog';

@Directive()
export abstract class AbstractReagentComponent<TInterface extends ChemicalSolutionInfo> extends AbstractTableComponent<TInterface> {
  protected readonly Array = Array;
  protected viewMode: 'table' | 'expiration-chart' = 'table';
  protected canUse: 'all' | 'isCanNotUse' | 'isCanUse' = 'all'

  protected override getPath(): string {
    return `/standard-sample-service/api/v1/organizations/parts/`;
  }

  protected filterInfo(info: TInterface[], canUse: string): TInterface[] {
    switch (canUse) {
      case 'isCanNotUse':
        return info.filter(item => !item.canUse);
      case 'isCanUse':
        return info.filter(item => item.canUse);
      default:
        return info;
    }
  }

  protected openDialogExpenditure(path: string, standardReagent: TInterface) {
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

  protected openHistoryExpenditure(standardReagent: TInterface) {
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

  protected override afterCloseDialog(dialogRef: MatDialogRef<any>, path: string, mode: Mode): void {
    dialogRef.afterClosed().subscribe(result => {
      if (!result || mode === Mode.VIEW) return;
      this.refreshGuide('regulatory-documents');
      if (mode === Mode.EDIT) {
        const p = `${this.getPath()}${this.id()}/${path}/${result.id}`;
        this.update(result, p);
      } else {
        // CREATE или CREATE_AS_TEMPLATE
        const p = `${this.getPath()}${this.id()}/${path}`;
        this.add(result, p);
      }
    });
  }
}
