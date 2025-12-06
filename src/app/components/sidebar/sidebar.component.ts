import { Component } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidebar',
  // imports: [
  //     NgOptimizedImage,
  //     NgClass
  // ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    MatSidenav,
    MatListItem,
    MatNavList,
    MatIconModule
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
