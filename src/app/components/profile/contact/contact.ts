import {Component, OnInit} from '@angular/core';

import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';

import {Button} from '../../ui/button/button';
import {AbstractDialogComponent} from '../../abstract/abstract-dialog.component';
import {ContactInfo} from '../../../data/profile.interface';


@Component({
  selector: 'app-contact',
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
  ],
  templateUrl: './contact.html',
  standalone: true
})
export class ContactDialog extends AbstractDialogComponent<ContactInfo> implements OnInit{
  protected override form = this.fb.group({
    contactTypeId: ['', [Validators.required]],
    value: ['', [Validators.required]],
    id: ['']
  });

  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.value) {
      this.form.patchValue({
        id: this.data.value.id,
        contactTypeId: this.data.value.contactTypeId,
        value: this.data.value.value,
      });
    }
  }

  protected onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value
      });
    }
  }
}
