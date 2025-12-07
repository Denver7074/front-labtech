import {Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(false);
  private readonly THEME_KEY = 'theme_preference';

  initTheme() {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      this.setTheme(saved);
    } else {
      // Используем системную тему по умолчанию
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(systemDark ? 'dark' : 'light');
    }
  }

  toggleTheme() {
    const current = document.body.style.colorScheme === 'dark' ? 'light' : 'dark';
    this.setTheme(current);
    this.isDark.set(current === 'dark')
  }

  setTheme(theme: 'light' | 'dark') {
    document.body.style.colorScheme = theme;
    localStorage.setItem(this.THEME_KEY, theme);
  }
}
