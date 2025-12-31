import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {ThemeService} from '../../../service/theme.service';
import {AuthService} from '../../../service/auth/auth.service';
import {JwtUtils} from '../../../utils/jwt.utils';
import {OrganizationContextService} from '../../../service/organization-context.service';

@Component({
  selector: 'app-menu',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatIconButton,
    MatToolbar,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    RouterLink,
    MatSidenav,
    MatSidenavContainer,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatMiniFabButton,
    RouterLinkActive
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true
})
export class Menu implements OnInit {
  protected themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected id = inject(OrganizationContextService).orgPartId;
  profileRoute = signal('');
  userName = signal<string | null>('');

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        if (this.router.url !== '') {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        // Обработка ошибки (если нужно)
        console.error('Ошибка при выходе', err);
      }
    });
  }

  ngOnInit(): void {
    this.getUserName();
    this.calculateProfileRoute();
  }

  getUserName() {
    const token = this.authService.getToken();
    const payload = JwtUtils.getPayload(token);
    this.userName.set(payload?.sub ?? null);
  }

  private calculateProfileRoute(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.profileRoute.set('/profile');
      return;
    }
    const payload = JwtUtils.getPayload(token);
    const userId = payload?.userId;
    const type = payload?.type?.[0];
    if (type === 'PERSON') {
      this.profileRoute.set(`/persons/${userId}/general`);
    } else {
      this.profileRoute.set(`/organizations/${userId}/general`);
    }
  }
}
