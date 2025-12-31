import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {catchError, debounceTime, distinctUntilChanged, of, switchMap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Button} from '../../../ui/button/button';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {HhService} from '../../../../service/hh.service';
import {HhInstitution, HhPosition} from '../../../../data/hh.interface';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {WorkResponsibilityInfo} from '../../../../data/profile.interface';

@Component({
  selector: 'app-work',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    Button,
    MatDatepickerInput,
    MatDatepicker,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  templateUrl: './work.html',
  standalone: true
})
export class WorkDialog extends AbstractDialogComponent<WorkResponsibilityInfo> implements OnInit {
  private hhService = inject(HhService);
  protected filteredPositions = signal<HhPosition[]>([]);
  valueType = signal<Map<string, string>>(new Map<string, string>());

  protected form = this.fb.group({
    id: [''],
    organizationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null),
    position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    measurementTypeIds: new FormControl<string[]>([], [Validators.required]),
  });


  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      this.form.patchValue({
        id: this.data.value.id,
        organizationName: this.data.value.organizationName,
        startDate: this.data.value.startDate ? new Date(this.data.value.startDate) : null,
        endDate: this.data.value.endDate ? new Date(this.data.value.endDate) : null,
        position: this.data.value.position,
        measurementTypeIds: this.data.value.measurementTypeIds
      });
    }
    const valueType = this.data.guide?.get('measurement-type');
    this.valueType.set(valueType ?? new Map<string, string>());
    this.suggestPositions();
  }

  suggestPositions() {
    const orgControl = this.form.get('position');
    if (orgControl) {
      orgControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (typeof value === 'string' && value.length > 2) {
            return this.hhService.suggestPositions(value).pipe(
              catchError(() => of({ items: [] }))
            );
          }
          return of({ items: [] });
        })
      ).subscribe(response => {
        this.filteredPositions.set(response.items);
      });
    }
  }

  protected onSubmit() {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();
      this.dialogRef.close({
        ...this.form.value,
        startDate: rawValue.startDate ? rawValue.startDate.toISOString().split('T')[0] : null,
        endDate: rawValue.endDate ? rawValue.endDate.toISOString().split('T')[0] : null,
      });
    }
  }

  protected removeMeasurementType(id: string): void {
    const control = this.form.get('measurementTypeIds');
    if (control) {
      const current = control.value as string[] || [];
      const updated = current.filter(item => item !== id);
      control.setValue(updated);
    }
  }

  getMeasurementTypeName(id: string) {
    return this.valueType()?.get(id)
  }

  protected get hasSelectedMeasurementTypes(): boolean {
    const value = this.form.get('measurementTypeIds')?.value;
    return Array.isArray(value) && value.length > 0;
  }

  protected displayPosition(value: string | HhInstitution): string {
    return typeof value === 'string' ? value : value?.text || '';
  }
}
