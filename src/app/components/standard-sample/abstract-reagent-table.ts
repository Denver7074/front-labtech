import {Directive} from '@angular/core';
import {AbstractTableComponent} from '../abstract/abstract-table.component';
import {ReagentExpenditureDialog} from './expenditure/reagent-expenditure-dialog/reagent-expenditure-dialog';
import {ReagentHistoryExpenditure} from './expenditure/reagent-history-expenditure/reagent-history-expenditure';
import {ChemicalSolutionInfo} from '../../data/standard-sample.interface';
import {Mode} from '../../data/response.interface';
import {MatDialogRef} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';

@Directive()
export abstract class AbstractReagentTable<TInterface extends ChemicalSolutionInfo> extends AbstractTableComponent<TInterface> {
  protected readonly Array = Array;
  protected readonly ReagentHistoryExpenditure = ReagentHistoryExpenditure;
  protected readonly ReagentExpenditureDialog = ReagentExpenditureDialog;

  protected viewMode: 'table' | 'expiration-chart' = 'table';


  protected override getAllColumns(): string[] {
    return [...super.getAllColumns(), 'name', 'producer', 'termsOfUse', 'regulatoryDocuments']
  }

// todo С пагинацией плохо работает
  protected canUse: 'all' | 'isCanNotUse' | 'isCanUse' = 'all'

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

  protected getPathDelete(id: string) {
    return `${this.getPath()}/${id}/organizations/parts/${this.id()}`
  }

  protected openDialogExpenditure(dialogComponent: ComponentType<any>, standardReagent: TInterface, mode: Mode) {
    const dialogRef = this.dialog.open(dialogComponent, {
      width: mode == Mode.CREATE ? '550px' : '900px',
      maxWidth: '95vw',
      data: {
        value: standardReagent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (mode == Mode.CREATE) {
        const p = `${this.getPath()}/${standardReagent.id}/organizations/parts/${this.id()}/expenditure`;
        this.add(result, p);
      } else {
        const p = `${this.getPath()}/${standardReagent.id}/organizations/parts/${this.id()}/expenditure/${result.id}`;
        this.delete(p);
      }
    });
  }

  protected override afterCloseDialog(dialogRef: MatDialogRef<any>, mode: Mode): void {
    dialogRef.afterClosed().subscribe(result => {
      if (!result || mode === Mode.VIEW) return;
      this.refreshGuide('regulatory-documents');
      if (mode === Mode.EDIT) {
        const p = `${this.getPath()}/${result.id}/organizations/parts/${this.id()}`;
        this.update(result, p);
      } else {
        // CREATE или CREATE_AS_TEMPLATE
        const p = `${this.getPath()}/organizations/parts/${this.id()}`;
        this.add(result, p);
      }
    });
  }
}
