import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Loader} from '../../../ui/loader/loader';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {PartDialog} from '../part/part';
import {AbstractMainComponent} from '../../abstract-main.component';
import {OrganizationDialog} from '../profile/profile';
import {Router} from '@angular/router';
import {OrganizationInfo, PartInfo} from '../../../../data/profile.interface';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    Loader,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatIconButton,
    MatTooltip,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone: true
})
export class MainOrganization extends AbstractMainComponent<OrganizationInfo> implements OnInit {
  protected readonly OrganizationDialog = OrganizationDialog;
  protected readonly PartDialog = PartDialog;
  private router = inject(Router);

  protected getPath(): string {
    return 'organizations';
  }

  protected override getPathGuide(): string[] {
    return ['legal-form', 'organization-type', 'taxation-type', 'contact-type'];
  }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('organizationId');
    this.id.set(profileId);
    this.loadGuide();
    this.loadProfile();
  }

  goPageOrganizationPart(partInfo: PartInfo) {
    this.router.navigate([`organizations/department/${partInfo.id}/general`])
  }
}
