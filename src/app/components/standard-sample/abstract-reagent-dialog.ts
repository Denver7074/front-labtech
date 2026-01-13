import {ChemicalSolutionInfo} from '../../data/standard-sample.interface';
import {AbstractDialogComponent} from '../abstract/abstract-dialog.component';


export abstract class AbstractReagentDialog<TInterface extends ChemicalSolutionInfo> extends AbstractDialogComponent<TInterface> {

  onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      this.dialogRef.close({
        ...raw,
        produceDate: raw.produceDate ? this.formatDate(raw.produceDate) : null,
        expirationDate: raw.expirationDate ? this.formatDate(raw.expirationDate) : null
      });
    }
  }
}
