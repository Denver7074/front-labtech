import {Directive} from '@angular/core';
import {AbstractTableComponent} from '../resource/abstract-main.component';
import {ReagentExpenditureDialog} from './expenditure/reagent-expenditure-dialog/reagent-expenditure-dialog';
import {ReagentHistoryExpenditure} from './expenditure/reagent-history-expenditure/reagent-history-expenditure';
import {ChemicalSolutionInfo} from '../../data/standard-sample.interface';

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

  protected allColumns = [
    'index',
    'name',
    'producer',
    'purpose',
    'information',
    'regulatoryDocument',
    'termsOfUse',
    'actions'
  ];

  protected getColumnLabel(column: string): string {
    const labels: Record<string, string> = {
      name: 'Наименование, номер реактива',
      producer: 'Изготовитель и дата выпуска',
      information: 'Дополнительные сведения',
      purpose: 'Назначение',
      termsOfUse: 'Условия применения',
      regulatoryDocument: 'Нормативный документ (НД)',
    };
    return labels[column] || column;
  }
}
