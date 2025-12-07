import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Menu} from '../menu/menu';

@Component({
  selector: 'app-layot',
  imports: [
    RouterOutlet,
    Menu,
  ],
  templateUrl: './layot.component.html',
  standalone: true,
})
export class LayotComponent {}
