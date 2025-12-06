import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'app-layot',
  imports: [
    RouterOutlet,
    SidebarComponent,
    ToolbarComponent
  ],
  templateUrl: './layot.component.html',
  standalone: true,
  styleUrl: './layot.component.scss'
})
export class LayotComponent {


  ngOnInit() {
    console.log('ngOnInit')
  }

}
