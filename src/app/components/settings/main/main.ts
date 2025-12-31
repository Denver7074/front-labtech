import { Component } from '@angular/core';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {Security} from '../security/security';
import {Sub} from '../subscribe/sub/sub';

@Component({
  selector: 'app-main',
  imports: [
    MatTab,
    MatTabContent,
    MatTabGroup,
    Security,
    Sub,
  ],
  templateUrl: './main.html',
  standalone: true
})
export class MainSettings {

}
