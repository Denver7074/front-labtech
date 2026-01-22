import {ChemicalSolutionInfo} from '../../data/standard-sample.interface';
import {AbstractDialogComponent} from '../abstract/abstract-dialog.component';
import {FormControl} from '@angular/forms';
import {computed, inject, signal} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {toSignal} from '@angular/core/rxjs-interop';
import {startWith} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {GuideDialog} from '../guide/guide-dialog/guide-dialog';
import {Mode} from '../../data/response.interface';
import {CrudService} from '../../service/crud.service';
import {ContractInfo} from '../../data/equipment.interface';
import {NotificationService} from '../../shared/notification.service';


export abstract class AbstractReagentDialog<TInterface extends ChemicalSolutionInfo> extends AbstractDialogComponent<TInterface> {
  protected crudService = inject(CrudService);
  protected notification = inject(NotificationService);
  protected dialog = inject(MatDialog);
  protected documentInput = new FormControl('');
  protected readonly regulatoryDocumentsSignal = signal<Map<string, string> | null>(null);
  protected filteredContracts = signal<ContractInfo[]>([]);
  protected contracts = signal<ContractInfo[]>([]);

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      let contract;
      if (raw.contract) {
        contract = {
          ...raw.contract,
          contractDate: raw.contract.contractDate ? this.formatDate(raw.contract.contractDate) : null,
          endAt: raw.contract.endAt ? this.formatDate(raw.contract.endAt) : null
        };
      }
      this.dialogRef.close({
        ...raw,
        produceDate: raw.produceDate ? this.formatDate(raw.produceDate) : null,
        expirationDate: raw.expirationDate ? this.formatDate(raw.expirationDate) : null,
        contract: contract,
      });
    }
  }

  protected filterContracts(value: string): void {
    const filterValue = value?.toLowerCase() || '';
    const filtered = this.contracts().filter(contract =>
      contract.contractNumber?.toLowerCase().includes(filterValue)
    );
    this.filteredContracts.set(filtered);
  }

  protected onContractSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedNumber = event.option.value;
    const contract = this.contracts().find(c => c.contractNumber === selectedNumber);

    if (contract) {
      this.form.get('contract')?.patchValue({
        id: contract.id,
        contractNumber: contract.contractNumber,
        contractDate: new Date(contract.contractDate),
        endAt: contract.endAt ? new Date(contract.endAt) : null,
        isOwn: contract.isOwn
      });
    }
  }

  protected loadContract() {
    this.crudService.get<any>('/standard-sample-service/api/v1/contracts/all').subscribe({
      next: (response) => {
        const contracts = Array.isArray(response)
          ? response
          : response?.data || response?.content || [];
        this.contracts.set(contracts);
        this.filteredContracts.set(contracts);
      },
      error: (error) => {
        console.error('Ошибка загрузки договоров:', error);
        this.notification.showErrorMsg(
          error.error?.error?.message || 'Не удалось загрузить список договоров'
        );
      }
    });
  }

  openRegulatoryDocumentGuide() {
    const dialogRef = this.dialog.open(GuideDialog, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        value: 'regulatory-documents',
        mode: Mode.CREATE,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.value) {
        const current = this.regulatoryDocumentsSignal();
        const newMap = new Map(current);
        newMap.set(result.id, result.value);
        this.regulatoryDocumentsSignal.set(newMap);
      }
    });
  }

  protected allDocuments = computed(() => {
    const guide = this.regulatoryDocumentsSignal();
    return guide ? Array.from(guide.values()) : [];
  });

  private readonly documentInputSignal = toSignal(
    this.documentInput.valueChanges.pipe(startWith('')),
    {initialValue: ''}
  );

  protected filteredDocuments = computed(() => {
    const input = (this.documentInputSignal() || '').toLowerCase();
    return this.allDocuments().filter((doc: string) =>
      doc.toLowerCase().includes(input)
    );
  });

  protected onDocumentSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.viewValue;

    const docMap = this.regulatoryDocumentsSignal();
    const docId = Array.from(docMap?.entries() || [])
      .find(([id, value]) => value === selectedValue)?.[0];

    if (docId) {
      const currentIds = this.form.get('regulatoryDocuments')?.value || [];
      if (!currentIds.includes(docId)) {
        this.form.get('regulatoryDocuments')?.setValue([...currentIds, docId]);
      }
    }

    this.documentInput.setValue('');
  }

  removeDocument(docId: string): void {
    const currentIds = this.form.get('regulatoryDocuments')?.value || [];
    const updated = currentIds.filter((id: string) => id !== docId);
    this.form.get('regulatoryDocuments')?.setValue(updated);
  }

  getDocumentValue(docId: string): string {
    return this.regulatoryDocumentsSignal()?.get(docId) || '—';
  }

  preventAdd(event: MatChipInputEvent): void {
    event.chipInput!.clear();
    this.documentInput.setValue('');
  }
}
