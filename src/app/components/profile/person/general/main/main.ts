import {Component, inject, OnInit, signal} from '@angular/core';
import {PersonGeneralService} from '../../../../../service/profile/person.profile.service';
import {PersonInfo} from '../../../../../data/profile.interface';
import {ActivatedRoute} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/input';


@Component({
  selector: 'app-main',
  imports: [
    MatCardSubtitle,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatError,
    MatProgressSpinner
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone: true
})
export class Main implements OnInit {
  private profileService = inject(PersonGeneralService);
  private activatedRoute = inject(ActivatedRoute);
  personInfo: PersonInfo | null = null;
  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const personId = this.activatedRoute.snapshot.paramMap.get('personId');

    this.profileService.getMyGeneralInformation(personId).subscribe({
      next: (data) => {
        this.personInfo = data;
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Ошибка загрузки профиля');
        this.isLoading.set(false);
        console.error('Error loading profile:', error);
      }
    });
  }

  // Полное имя
  getFullName(): string {
    if (!this.personInfo) return '';

    const parts = [this.personInfo.lastName, this.personInfo.firstName];
    if (this.personInfo.middleName) {
      parts.push(this.personInfo.middleName);
    }
    return parts.join(' ');
  }

  // Возраст
  getAge(): number | null {
    if (!this.personInfo?.birthDate) return null;

    const birthDate = new Date(this.personInfo.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // Форматирование даты
  formatDate(dateString: string): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch {
      return dateString;
    }
  }

}
