import { Component } from '@angular/core';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {AdditionalEquipment} from '../additional/additional-equipment/additional-equipment';
import {TestEquipment} from '../test/test-equipment/test-equipment';
import {StandardEquipment} from '../standard/standard-equipment/standard-equipment';

@Component({
  selector: 'app-main-equipment',
  imports: [
    MatTab,
    MatTabContent,
    MatTabGroup,
    AdditionalEquipment,
    TestEquipment,
    StandardEquipment
  ],
  templateUrl: './main-equipment.html',
  styleUrl: './main-equipment.scss',
  standalone: true
})
export class MainEquipment {

}
