import {Component, OnInit} from '@angular/core';
import {Loader} from '../../../ui/loader/loader';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {SnilsPipe} from '../../../ui/pipes/snils-pipe';
import {DatePipe} from '../../../ui/pipes/date-pipe';
import {MatChipsModule} from '@angular/material/chips';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {EducationDialog} from '../education/education';
import {WorkDialog} from '../work/work';
import {AbstractMainComponent} from '../../abstract-main.component';
import {ProfileDialog} from "../profile/profile";
import {PersonInfo} from '../../../../data/profile.interface';


@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    Loader,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    SnilsPipe,
    DatePipe,
    MatChipsModule,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone: true
})
export class MainPerson extends AbstractMainComponent<PersonInfo> implements OnInit {
  protected readonly WorkDialog = WorkDialog;
  protected readonly EducationDialog = EducationDialog;

  protected getPath(): string {
    return 'persons';
  }

  ngOnInit(): void {
    const personId = this.activatedRoute.snapshot.paramMap.get('personId');
    this.id.set(personId);
    this.loadGuide();
    this.loadProfile();
  }

  protected override getPathGuide(): string[] {
    return ['contact-type', 'education-type', 'education-doc-type', 'measurement-type'];
  }

  // Возраст
  getAge(): number | null {
    const info = this.info();
    if (!info?.birthDate) return null;

    const birthDate = new Date(info.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  getInitials(): string {
    const p = this.info();
    const lastName = p?.lastName?.trim() || '';
    const firstName = p?.firstName?.trim() || '';
    return (
      (lastName[0] || '') + (firstName[0] || '')
    ).toUpperCase() || '??';
  }

  protected readonly ProfileDialog = ProfileDialog;
}
