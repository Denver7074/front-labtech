import {Component, inject, signal} from '@angular/core';
import {MatInput, MatFormField, MatError, MatLabel} from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Button} from '../../ui/button/button';
import {MatTab, MatTabChangeEvent, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {AccountRequest, Session, UpdatePasswordRequest} from '../../../data/auth.interface';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../ui/notification.service';
import {Router} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {Loader} from '../../ui/loader/loader';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-security',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatError,
    MatLabel,
    ReactiveFormsModule,
    NgClass,
    Button,
    MatTab,
    MatTabContent,
    MatTabGroup,
    MatCard,
    Loader,
    MatTooltip,
    MatIconModule
  ],
  templateUrl: './security.html',
  styleUrl: './security.scss',
  standalone: true
})
export class Security {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  sessions = signal<Session[] | null>(null);
  loadingSessions = signal(false);
  isShowNewPassword = signal(false);
  isShowLoginPassword = signal(false);
  isShowRepeatedPassword = signal(false);
  isShowCurrentPassword = signal(false);

  passwordForm = this.fb.group({
      currentPassword: ['', [Validators.minLength(8)]],
      newPassword: ['', [Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.minLength(8)]]
    }
  );

  loginForm = this.fb.group({
    newEmail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onChangePassword() {
    if (this.passwordForm.valid) {
      const requestBody: UpdatePasswordRequest = {
        currentPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value,
        repeatedPassword: this.passwordForm.get('repeatedPassword')?.value
      }
      this.authService.updatePassword(requestBody).subscribe({
        next: () => {
          this.authService.logoutAll().subscribe({
            next: () => {
              this.router.navigate(['']);
            },
            error: (err) => {
              this.router.navigate(['']);
            }
          });
        },
        error: (error) => this.notification.showErrorMsg(error.error?.error?.message)
      });
    }
  }

  onChangeLogin() {
    if (this.loginForm.valid) {
      const requestBody: AccountRequest = {
        email: this.loginForm.get('newEmail')?.value,
        password: this.loginForm.get('password')?.value,
      }
      this.authService.updateEmail(requestBody).subscribe({
        error: (error) => this.notification.showErrorMsg(error.error.error.message)
      });
    }
  }

  getAllActiveSession() {
    this.loadingSessions.set(true);

    this.authService.getAllSessions().subscribe({
      next: (sessions) => {
        this.sessions.set(sessions);
        this.loadingSessions.set(false);
      },
      error: (err) => {
        this.loadingSessions.set(false);
        this.notification.showErrorMsg(err.error.error.message)
      }
    });
  }

  deleteSession(session: Session) {
    this.authService.deleteSession(session.id).subscribe({
      next: () => {
        this.getAllActiveSession()
      },
      error: (err) => {
        console.error('Не удалось удалить сессию', err);
        this.notification.showErrorMsg('Ошибка при завершении сессии');
      }
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedLabel = event.tab.textLabel;
    if (selectedLabel === 'Устройства') {
      this.getAllActiveSession()
    }
  }

  isCurrentSession(session: Session): boolean {
    const currentRefreshToken = this.authService.getRefreshToken();
    return Boolean(
      currentRefreshToken &&
      session.refreshToken &&
      currentRefreshToken === session.refreshToken
    );
  }
}
