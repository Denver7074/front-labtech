import {Component, OnInit} from '@angular/core';
import {Button} from '../../../ui/button/button';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel, MatPrefix} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {AbstractDialogComponent} from '../../../abstract/abstract-dialog.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatTooltip} from '@angular/material/tooltip';
import {OrganizationInfo} from '../../../../data/profile.interface';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';



@Component({
  selector: 'app-profile',
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
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatTooltip,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion
  ],
  templateUrl: './profile.html',
  standalone: true
})
export class OrganizationDialog extends AbstractDialogComponent<OrganizationInfo> implements OnInit {
  protected override form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    shortName: [''],
    inn: ['', [Validators.required, Validators.pattern(/^\d{10,12}$/)]],
    ogrn: ['', [Validators.required, Validators.pattern(/^\d{13,15}$/)]],
    legalFormId: ['', Validators.required],
    registrationAddress: ['', Validators.required],
    actualAddress: ['', Validators.required],
    nameHeadOfOrganization: ['', Validators.required],
    positionOfOrganization: ['', Validators.required],
    bankName: ['', Validators.required],
    bik: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    correspondentAccount: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],
    settlementAccount: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],
    taxationSystemId: ['', Validators.required],
    isVatExempt: [true]
  });

  ngOnInit() {
    if (this.data.value) {
      this.form.patchValue({
        fullName: this.data.value.fullName,
        shortName: this.data.value.shortName,
        legalFormId: this.data.value.legalFormId,
        inn: this.data.value.inn,
        ogrn: this.data.value.ogrn,
        registrationAddress: this.data.value.registrationAddress,
        actualAddress: this.data.value.actualAddress,
        nameHeadOfOrganization: this.data.value.nameHeadOfOrganization,
        positionOfOrganization: this.data.value.positionOfOrganization,
        bankName: this.data.value.bankName,
        bik: this.data.value.bik,
        correspondentAccount: this.data.value.correspondentAccount,
        settlementAccount: this.data.value.settlementAccount,
        taxationSystemId: this.data.value.taxationSystemId,
        isVatExempt: this.data.value.isVatExempt,
      });

      if (this.isViewMode) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }
}
