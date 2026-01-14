import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Loader} from '../../../ui/loader/loader';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {AbstractMainComponent} from '../../abstract-main.component';
import {PartDialog} from '../../organization/part/part';
import {PartInfo} from '../../../../data/profile.interface';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    Loader,
    MatExpansionModule,
    MatIconModule,
    MatLabel,
    MatTooltip,
    MatIconButton,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone: true
})
export class MainOrganizationPart extends AbstractMainComponent<PartInfo> implements OnInit {
  protected readonly PartDialog = PartDialog;

  protected getPath(): string {
    return 'organizations';
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationPartId');
    this.id.set(profileId);
    this.orgContext.setOrgPartId(profileId);
    this.loadGuide(['organization-type', 'contact-type', 'parameter-type', 'equipment-type']);
    this.loadProfile();
  }

  protected override loadProfile(): void {
    this.isLoading.set(true);
    this.crudService.get<PartInfo>(`/profile-service/api/v1/organizations/parts/${this.id()}/general`).subscribe({
      next: (data) => {
        this.info.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.info.set(null);
        this.notification.showErrorMsg(error.error.error.message)
      }
    });
  }


}
