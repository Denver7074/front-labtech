import {inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormDataInterface, Mode} from '../../data/response.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export abstract class AbstractDialogComponent<TInterface> {
  protected fb = inject(FormBuilder);
  protected form: FormGroup = this.fb.group({});
  protected readonly Array = Array;
  protected data = inject<FormDataInterface<TInterface>>(MAT_DIALOG_DATA);
  protected dialogRef = inject(MatDialogRef<TInterface>);

  get isEditMode(): boolean {
    return this.data.mode === Mode.EDIT;
  }

  get isViewMode(): boolean {
    return this.data?.mode === Mode.VIEW;
  }

  get isCreateAsTemplate(): boolean {
    return this.data?.mode === Mode.CREATE_AS_TEMPLATE;
  }

  get title(): string {
    let text = this.isEditMode ? 'Редактирование' : 'Добавление';
    if (this.isViewMode) {
      return 'Просмотр'
    }
    return text;
  }

  get submitLabel(): string {
    let text = this.isEditMode ? 'Сохранить' : 'Добавить';
    if (this.isViewMode) {
      return 'Просмотр'
    }
    return text;
  }


  protected formatDate(date: Date | string | null): string | null {
    if (!date) return null;
    if (typeof date === 'string') return date;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  compareIds(a: any, b: any): boolean {
    return a === b;
  }
}
