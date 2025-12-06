import {Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {Button} from '../button/button';

@Component({
    selector: 'app-toolbar',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    Button
  ],
    templateUrl: './toolbar.component.html',
    standalone: true,
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  // authService = inject(AuthService)

  // onClickButtonLogout() {
  //   this.authService.logout()
  // }

}
