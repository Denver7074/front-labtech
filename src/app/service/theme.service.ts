import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
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
  }

  setTheme(theme: 'light' | 'dark') {
    document.body.style.colorScheme = theme;
    localStorage.setItem(this.THEME_KEY, theme);
  }
}
