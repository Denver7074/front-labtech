import {Component, inject, OnInit, signal} from '@angular/core';
import {GuideService} from '../../../../service/guide.service';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';

import {catchError, debounceTime, distinctUntilChanged, of, switchMap} from 'rxjs';
import {Button} from '../../../ui/button/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {HhService} from '../../../../service/hh.service';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {HhInstitution} from '../../../../data/hh.interface';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {EducationInfo} from '../../../../data/profile.interface';

@Component({
  selector: 'app-education',
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
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  templateUrl: './education.html',
  standalone: true
})
export class EducationDialog extends AbstractDialogComponent<EducationInfo> implements OnInit {
  private hhService = inject(HhService);
  protected filteredInstitutions = signal<HhInstitution[]>([]);
  educationDocType = signal<Map<string, string>>(new Map<string, string>);

  protected override form = this.fb.group({
    id: [''],
    organizationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    specialization: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    documentNumber: ['', [Validators.required]],
    documentIssueDate: new FormControl<Date | null>(null),
    educationTypeId: ['', [Validators.required]],
    educationDocumentTypeId: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      this.form.patchValue({
        id: this.data.value.id,
        organizationName: this.data.value.organizationName,
        startDate: this.data.value.startDate ? new Date(this.data.value.startDate) : null,
        endDate: this.data.value.endDate ? new Date(this.data.value.endDate) : null,
        specialization: this.data.value.specialization,
        documentNumber: this.data.value.documentNumber,
        documentIssueDate: this.data.value.documentIssueDate ? new Date(this.data.value.documentIssueDate) : null,
        educationTypeId: this.data.value.educationTypeId,
        educationDocumentTypeId: this.data.value.educationDocumentTypeId
      });
    }
    this.suggestInstitutions();
  }

  suggestInstitutions() {
    const orgControl = this.form.get('organizationName');
    if (orgControl) {
      orgControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (typeof value === 'string' && value.length > 2) {
            return this.hhService.suggestInstitutions(value).pipe(
              catchError(() => of({ items: [] }))
            );
          }
          return of({ items: [] });
        })
      ).subscribe(response => {
        this.filteredInstitutions.set(response.items);
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
        documentIssueDate: rawValue.documentIssueDate ? rawValue.documentIssueDate.toISOString().split('T')[0] : null
      });
    }
  }

  protected displayInstitution(value: string | HhInstitution): string {
    return typeof value === 'string' ? value : value?.text || '';
  }

  protected getFullInstitutionName(item: HhInstitution): string {
    if (!item.text) return '';
    return item.synonyms ? `${item.text} (${item.synonyms})` : item.text;
  }
}
