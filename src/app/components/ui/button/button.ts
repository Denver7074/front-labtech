import {Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-button',
  imports: [
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './button.html',
  standalone: true
})
export class Button {
  disabled = input<boolean | null>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  hint = input<string | null>('');
  buttonClick = output<void>();

  protected onClick() {
    this.buttonClick.emit();
  }
}
