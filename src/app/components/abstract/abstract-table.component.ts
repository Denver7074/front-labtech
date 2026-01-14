import {inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractGuideComponent} from './abstract-guide.component';
import {CrudService} from '../../service/crud.service';
import {ApiResponse, Mode} from '../../data/response.interface';
import {ComponentType} from '@angular/cdk/portal';
import {PageEvent} from '@angular/material/paginator';


export abstract class AbstractTableComponent<TInterface>  extends AbstractGuideComponent {
  protected readonly Mode = Mode;
  protected crudService = inject(CrudService);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);
  protected currentPage = signal(0);
  protected pageSize = signal(10);
  protected totalItems = signal(0);
  protected id = signal<string | null>('');
  protected info = signal<TInterface[]>([]);

  protected abstract getPath(): string;
  protected abstract readonly allColumns: string[];
  protected abstract getColumnLabel(column: string): string;
  protected displayedColumns: string[] = [];

  protected loadEntities(value?: string): void {
    const path = `${this.getPath()}${value}`
    const filter = {
      organizationPartId: this.id()
    }
    this.crudService.getEntities<TInterface>(path, this.currentPage(), this.pageSize(), filter).subscribe({
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
        },
        error: (err) => this.notification.showErrorMsg(err.error.error.message)
      });
  }

  protected openDialog(dialogComponent: ComponentType<any>, path: string, mode: Mode, value?: any) {
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {
        mode: mode,
        value: value,
        guide: this.valueType()
      }
    });
    return this.afterCloseDialog(dialogRef, path, mode)
  }

  protected afterCloseDialog(dialogRef: MatDialogRef<any>, path: string, mode: Mode): void {
    dialogRef.afterClosed().subscribe(result => {
      if (!result || mode === Mode.VIEW) return;

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

  protected delete(id: string, path: string) {
    const p = `${this.getPath()}/${this.id()}/${path}/${id}`
    this.crudService.delete(p).subscribe({
      next: () => {
        this.loadEntities();
      },
      error: (err) => {
        console.error('Не удалось удалить сессию', err);
        this.notification.showErrorMsg('Ошибка при завершении сессии');
      }
    });
  }

  protected toggleColumn(column: string, event: any) {
    const checked = event.checked;
    if (checked) {
      if (!this.displayedColumns.includes(column)) {
        const index = this.allColumns.indexOf(column);
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
}
