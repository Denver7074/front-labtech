import {Component, inject} from '@angular/core';
import {AbstractDialogComponent} from '../../abstract/abstract-dialog.component';
import {Mode, ResponseType} from '../../../data/response.interface';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CrudService} from '../../../service/crud.service';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {Button} from '../../../shared/button/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-guide-dialog',
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatDialogContent,
    MatIconModule,
    MatDialogTitle,
    MatDialogActions,
    Button,
    MatDialogClose,
    MatError,
    MatLabel
  ],
  templateUrl: './guide-dialog.html',
  styleUrl: './guide-dialog.scss',
  standalone: true
})
export class GuideDialog extends AbstractDialogComponent<ResponseType> {
  protected crudService = inject(CrudService);

  protected override form: FormGroup = this.fb.group({
    id: [''],
    value: ['', [Validators.required]],
  });

  ngOnInit() {
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

      this.form.patchValue({
        id: this.isCreateAsTemplate ? null : value.id,
        value: value.value,
      });
    }
  }

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const endpoint = `guide-service/api/v1/${this.data.value}/add`;

      this.crudService.post<ResponseType>(raw.value, endpoint).subscribe({
        next: (savedItem) => {
          this.dialogRef.close(savedItem); // ← правильный объект
        },
        error: (err) => {
          console.error('Ошибка сохранения НД:', err);
          // Показать snackbar с ошибкой
        }
      });
    }
  }
}
