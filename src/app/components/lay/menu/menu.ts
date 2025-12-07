import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {ThemeService} from '../../../service/theme.service';
import {AuthService} from '../../../service/auth/auth.service';

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
export class Menu {
  protected themeService = inject(ThemeService);
  protected authService = inject(AuthService);
}
