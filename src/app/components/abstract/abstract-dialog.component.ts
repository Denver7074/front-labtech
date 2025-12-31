import {inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormDataInterface} from '../../data/response.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export abstract class AbstractDialogComponent<TInterface> {
  protected readonly Array = Array;
  protected fb = inject(FormBuilder);
  protected data = inject<FormDataInterface<TInterface>>(MAT_DIALOG_DATA);
  protected dialogRef = inject(MatDialogRef<TInterface>);

  get isEditMode(): boolean {
    return this.data.mode === 'edit';
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

  get isViewMode(): boolean {
    return this.data?.mode === 'view';
  }

  protected formatDate(date: Date | string | null): string | null {
    if (!date) return null;
    if (typeof date === 'string') return date;

    // Получаем компоненты даты в ЛОКАЛЬНОМ часовом поясе
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
