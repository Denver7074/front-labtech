import {Component} from '@angular/core';
import {Menu} from '../menu/menu';

@Component({
  selector: 'app-layot',
  imports: [
    Menu,
  ],
  templateUrl: './layot.component.html',
  standalone: true,
})
export class LayotComponent {}
