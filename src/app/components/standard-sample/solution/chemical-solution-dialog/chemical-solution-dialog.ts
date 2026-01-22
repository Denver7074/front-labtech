import {Component, OnInit, signal} from '@angular/core';
import {ChemicalSolutionInfo, Reagent, SolutionComponentInfo} from '../../../../data/standard-sample.interface';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Mode} from '../../../../data/response.interface';
import {AbstractReagentDialog} from '../../abstract-reagent-dialog';
import {Button} from "../../../ui/button/button";
import {
  MatAutocomplete, MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatError,
  MatFormField,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {ContractInfo} from '../../../../data/equipment.interface';
import {debounceTime, distinctUntilChanged, startWith} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-chemical-solution-dialog',
  imports: [
    Button,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIconModule,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatTooltip,
    MatAccordion,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './chemical-solution-dialog.html',
  standalone: true
})
export class ChemicalSolutionDialog extends AbstractReagentDialog<ChemicalSolutionInfo> implements OnInit {
  protected components = signal<Reagent[] | []>([]);
  protected filteredComponents = signal<Reagent[]>([]);

  protected override form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    purpose: ['', [Validators.required]],
    termsOfUse: [''],
    information: [''],
    expirationDate: ['', [Validators.required]],
    produceDate: ['', [Validators.required]],
    initialQuantity: [null, [Validators.required]],
    unit: ['', [Validators.required]],
    regulatoryDocuments: this.fb.control<string[]>([]),
    solutionComponents: this.fb.array([]),
  });

  ngOnInit() {
    if ((this.data.mode === Mode.EDIT || this.data.mode === Mode.CREATE_AS_TEMPLATE) && this.data.value) {
      const value = this.data.value;

      this.form.patchValue({
        id: this.isCreateAsTemplate ? null : value.id,
        name: value.name,
        purpose: value.purpose,
        termsOfUse: value.termsOfUse,
        information: value.information,
        expirationDate: this.isCreateAsTemplate ? null : value.expirationDate,
        produceDate: this.isCreateAsTemplate ? null : value.produceDate,
        initialQuantity: this.isCreateAsTemplate ? null : value.initialQuantity,
        unit: value.unit,
        regulatoryDocuments: value.regulatoryDocuments || [],
      });

      const charArray = this.form.get('solutionComponents') as FormArray;
      charArray.clear();
      (value.solutionComponents || []).forEach(char => {
        charArray.push(this.createSolutionComponents(char));
      });
    }
    const initial = this.data.guide?.get('regulatory-documents');
    this.regulatoryDocumentsSignal.set(initial || new Map());
    this.documentInput.setValue('');

    this.solutionComponents.valueChanges.subscribe(() => {
      this.filteredComponents.set(this.components());
    });
  }

  // === SolutionComponents ===
  get solutionComponents(): FormArray {
    return this.form.get('solutionComponents') as FormArray;
  }

  createSolutionComponents(char?: SolutionComponentInfo): FormGroup {
    const group = this.fb.group({
      id: [this.isCreateAsTemplate ? '' : char?.id || ''],
      type: [char?.type || '', Validators.required],
      value: [char?.value || '', [Validators.required, Validators.min(0.001)]],
      reagentId: [char?.reagentId || '', Validators.required],
    });

    // Добавляем валидатор по остатку
    const index = this.solutionComponents.length;
    const valueControl = group.get('value');
    valueControl?.addValidators(this.createRemainsValidator(index));

    return group;
  }

  addSolutionComponents(): void {
    if (this.components().length == 0 && this.form.get('regulatoryDocuments')?.value?.length > 0) {
      this.loadComponents();
    }
    this.solutionComponents.push(this.createSolutionComponents());
  }

  removeSolutionComponent(index: number): void {
    this.solutionComponents.removeAt(index);
  }

  protected loadComponents() {
    const organizationPartId = this.data.other.get("organizationPartId");
    const filter = new Map([["regulatoryDocumentId", this.form.get('regulatoryDocuments')?.value]])
    this.crudService.get<Reagent[]>(
      `/standard-sample-service/api/v1/chemical-solutions/organizations/parts/${organizationPartId}/components`,
      filter
    ).subscribe({
      next: (response) => {
        const components = response || [];
        this.components.set(components);
        console.log(components);
      },
      error: (error) => {
        this.notification.showErrorMsg(
          error.error?.error?.message || 'Не удалось загрузить список компонентов'
        );
      }
    });
  }

  protected onReagentSelected(event: MatAutocompleteSelectedEvent, index: number): void {
    const reagentId = event.option.value;
    const isDuplicate = this.solutionComponents.controls.some(
      (control, i) => i !== index && control.get('reagentId')?.value === reagentId
    );

    if (isDuplicate) {
      this.notification.showErrorMsg('Этот реагент уже добавлен');
      this.solutionComponents.at(index).patchValue({
        reagentId: '',
        type: ''
      });
      const valueControl = this.solutionComponents.at(index).get('value');
      valueControl?.setValidators([
        Validators.required,
        Validators.min(0.001),
        this.createRemainsValidator(index)
      ]);
      valueControl?.updateValueAndValidity();
      return;
    }
    const selectedReagent = this.components().find(r => {
      return r.id === reagentId;
    });
    if (selectedReagent) {
      this.solutionComponents.at(index).patchValue({
        reagentId: reagentId,
        type: selectedReagent.type
      });
    }
  }

  // В компоненте
  protected displayReagentName = (reagentId: string): string => {
    if (!reagentId) return '';

    const reagent = this.components().find(r => r.id === reagentId);
    if (!reagent) return reagentId; // fallback на ID

    return reagent.number
      ? `${reagent.name} (${reagent.number})`
      : reagent.name;
  };

  protected getUnitForComponent(index: number): string | null {
    const reagentId = this.solutionComponents.at(index)?.get('reagentId')?.value;
    if (!reagentId) return null;

    const reagent = this.components().find(r => r.id === reagentId);
    return reagent?.unit || null;
  }

  protected getRemainsForComponent(index: number): string | null {
    const reagentId = this.solutionComponents.at(index)?.get('reagentId')?.value;
    if (!reagentId) return null;

    const reagent = this.components().find(r => r.id === reagentId);
    if (!reagent || reagent.remains == null) return null;

    return `${reagent.remains} ${reagent.unit || ''}`.trim();
  }

  // В компоненте
  private createRemainsValidator(index: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Пропускаем пустые/некорректные значения
      if (value == null || value <= 0) {
        return null;
      }

      // Получаем reagentId из текущей строки
      const reagentId = this.solutionComponents.at(index)?.get('reagentId')?.value;
      if (!reagentId) {
        return null;
      }

      // Находим реагент и его остаток
      const reagent = this.components().find(r => r.id === reagentId);
      if (!reagent || reagent.remains == null) {
        return null;
      }

      // Проверяем превышение
      return value > reagent.remains
        ? {
          exceedsRemains: {
            actual: value,
            max: reagent.remains
          }
        }
        : null;
    };
  }
}
