import {Component, inject, OnInit, signal} from '@angular/core';
import {ThemeService} from './service/theme.service';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  themeService = inject(ThemeService);

  protected readonly title = signal('front-labtech');

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
