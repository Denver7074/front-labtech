import {inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractGuideComponent} from './abstract-guide.component';
import {CrudService} from '../../service/crud.service';
import {ApiResponse, Mode} from '../../data/response.interface';
import {ComponentType} from '@angular/cdk/portal';
import {PageEvent} from '@angular/material/paginator';


export abstract class AbstractTableComponent<TInterface> extends AbstractGuideComponent {
  protected readonly Mode = Mode;
  private crudService = inject(CrudService);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);
  protected currentPage = signal(0);
  protected pageSize = signal(10);
  protected totalItems = signal(0);
  protected id = signal<string | null>('');
  protected info = signal<TInterface[]>([]);

  protected abstract getPath(): string;

  protected displayedColumns: string[] = [];

  protected abstract getColumnLabel(column: string): string;


  protected getAllColumns(): string[] {
    return ['index']
  }

  protected loadEntities(): void {
    const filter = {
      organizationPartId: this.id()
    }
    this.crudService.getEntities<TInterface>(this.getPath(), this.currentPage(), this.pageSize(), filter).subscribe({
      next: (response: ApiResponse<TInterface[]>) => {
        this.info.set(response.value);
        this.totalItems.set(response.pagingResults.totalItemsCount);
      },
      error: (err) => {
        const message = err?.error?.error?.message || 'Ошибка загрузки';
        this.notification.showErrorMsg(message);
      }
    });
  }

  protected openDialog(dialogComponent: ComponentType<any>, mode: Mode, value?: any) {
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {
        mode: mode,
        value: value,
        guide: this.valueType(),
        other: new Map([['organizationPartId', this.id()]])
      }
    });
    return this.afterCloseDialog(dialogRef, mode)
  }

  protected afterCloseDialog(dialogRef: MatDialogRef<any>, mode: Mode): void {
    dialogRef.afterClosed().subscribe(result => {
      if (!result || mode === Mode.VIEW) return;

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

  protected toggleColumn(column: string, event: any) {
    const checked = event.checked;
    if (checked) {
      if (!this.displayedColumns.includes(column)) {
        const index = this.getAllColumns().indexOf(column);
        this.displayedColumns.splice(index, 0, column);
      }
    } else {
      this.displayedColumns = this.displayedColumns.filter(col => col !== column);
    }
  }

  protected onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadEntities();
  }

  // Crud methods
  protected delete(path: string) {
    this.crudService.delete(path).subscribe({
      next: () => {
        this.loadEntities();
      },
      error: (err) => {
        console.error('Не удалось удалить сессию', err);
        this.notification.showErrorMsg('Ошибка при завершении сессии');
      }
    });
  }

  protected update(result: any, path: string) {
    this.crudService.put<TInterface>(result, path)
      .subscribe({
        next: () => {
          this.loadEntities();
        },
        error: (err) => this.notification.showErrorMsg(err.error.error.message)
      });
  }

  protected add(result: any, path: string) {
    this.crudService.post<TInterface>(result, path)
      .subscribe({
        next: () => {
          this.loadEntities();
          this.notification.showSuccessMsg('Добавлено');
        },
        error: (err) => this.notification.showErrorMsg(err.error.error.message)
      });
  }
}
