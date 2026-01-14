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


export abstract class AbstractReagentDialog<TInterface extends ChemicalSolutionInfo> extends AbstractDialogComponent<TInterface> {
  protected dialog = inject(MatDialog);
  protected documentInput = new FormControl('');
  protected readonly regulatoryDocumentsSignal = signal<Map<string, string> | null>(null);

  protected override onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      this.dialogRef.close({
        ...raw,
        produceDate: raw.produceDate ? this.formatDate(raw.produceDate) : null,
        expirationDate: raw.expirationDate ? this.formatDate(raw.expirationDate) : null
      });
    }
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
