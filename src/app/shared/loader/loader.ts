import {Component, computed, input} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  standalone: true
})
export class Loader {
  diameter = input<number | null>(100);

  protected safeDiameter = computed(() => {
    const d = this.diameter();
    return d != null ? Math.max(10, d) : 100;
  });
}
