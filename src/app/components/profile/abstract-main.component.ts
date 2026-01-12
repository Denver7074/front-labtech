import {ContactDialog} from './contact/contact';
import {inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';
import {AbstractGuideComponent} from '../abstract/abstract-guide.component';
import {CrudService} from '../../service/crud.service';
import {OrganizationContextService} from '../../service/organization-context.service';


export abstract class AbstractMainComponent<TInterface> extends AbstractGuideComponent {
  protected readonly ContactDialog = ContactDialog;
  protected crudService = inject(CrudService);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);
  protected orgContext = inject(OrganizationContextService);

  isLoading = signal(false);
  id = signal<string | null>('');
  info = signal<TInterface | null>(null);

  protected abstract getPath(): string;

  protected loadProfile(): void {
    this.isLoading.set(true);
    const path = `/profile-service/api/v1/${this.getPath()}/${this.id()}/general`
    this.crudService.get<TInterface>(path).subscribe({
      next: (data) => {
        this.info.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.info.set(null);
        this.notification.showErrorMsg(error.error.error.message)
      }
    });
  }

  openGeneralDialog(dialogComponent: ComponentType<any>, profile?: TInterface | null, preview?: boolean | false) {
    let mode = profile ? 'edit' : 'create';
    if (preview) {
      mode = "view";
    }
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {
        mode: mode,
        value: profile,
        guide: this.valueType(),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
        const path = `/profile-service/api/v1/${this.getPath()}/${this.id()}/general`;
      if (mode === 'edit') {
        this.update(result, path);
      } else {
        this.add(result, path);
      }
    });
  }

  protected update(result: any, path: string) {
    this.crudService.put<TInterface>(result, path)
      .subscribe({
        next: () => {
          this.loadProfile();
        },
        error: (err) => this.notification.showErrorMsg(err.error.error.message)
      });
  }

  protected add(result: any, path: string) {
    this.crudService.post<TInterface>(result, path)
      .subscribe({
        next: () => {
          this.loadProfile();
        },
        error: (err) => this.notification.showErrorMsg(err.error.error.message)
      });
  }

  protected openDialog(dialogComponent: ComponentType<any>, path: string, value?: any) {
    const mode = value ? 'edit' : 'create';
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {
        mode: mode,
        value: value,
        guide: this.valueType()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (mode === 'edit') {
        const p = `/profile-service/api/v1/${this.getPath()}/${this.id()}/${path}/${result.id}`;
        this.update(result, p);
      } else {
        const p = `/profile-service/api/v1/${this.getPath()}/${this.id()}/${path}`;
        this.add(result, p);
      }
    });
  }

  protected delete(id: string, path: string) {
    this.crudService.delete(`/profile-service/api/v1/${this.getPath()}/${this.id}`).subscribe({
      next: () => {
        this.loadProfile();
      },
      error: (err) => {
        console.error('Не удалось удалить сессию', err);
        this.notification.showErrorMsg('Ошибка при завершении сессии');
      }
    });
  }
}
