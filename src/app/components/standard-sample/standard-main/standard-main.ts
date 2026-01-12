import { Component } from '@angular/core';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {EthanolMain} from '../ethanol/ethanol-main/ethanol-main';
import {ReagentMain} from '../reagent/reagent-main/reagent-main';
import {StandardEquipment} from '../standard/standard-equipment/standard-equipment';
import {PrecursorsMain} from '../precursors/precursors-main/precursors-main';
import {ChemicalSolutionMain} from '../solution/chemical-solution-main/chemical-solution-main';

@Component({
  selector: 'app-standard-main',
  imports: [
    MatTab,
    MatTabContent,
    MatTabGroup,
    EthanolMain,
    ReagentMain,
    StandardEquipment,
    PrecursorsMain,
    ChemicalSolutionMain
  ],
  templateUrl: './standard-main.html',
  styleUrl: './standard-main.scss',
  standalone: true
})
export class StandardMain {

}
