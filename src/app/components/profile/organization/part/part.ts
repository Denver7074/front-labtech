import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {Button} from '../../../ui/button/button';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {PartInfo} from '../../../../data/profile.interface';

@Component({
  selector: 'app-part',
  imports: [
    Button,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIconModule,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './part.html',
  standalone: true
})
export class PartDialog extends AbstractDialogComponent<PartInfo> implements OnInit {
  protected override form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    organizationTypeId: ['', [Validators.required]],
    registrationNumber: [''],
    accreditationLink: [''],
    headOfPart: ['', [Validators.required]],
    headPosition: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      this.form.patchValue({
        id: this.data.value.id,
        name: this.data.value.name,
        organizationTypeId: this.data.value.organizationTypeId,
        registrationNumber: this.data.value.registrationNumber,
        accreditationLink: this.data.value.accreditationLink,
        headOfPart: this.data.value.headOfPart,
        headPosition: this.data.value.headPosition,
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value
      });
    }
  }
}
