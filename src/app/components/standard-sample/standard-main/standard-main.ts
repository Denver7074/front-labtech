import {Component} from '@angular/core';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {ReagentMain} from '../reagent/reagent-main/reagent-main';
import {StandardReagent} from '../standard/standard-equipment/standard-reagent';
import {PrecursorsMain} from '../precursors/precursors-main/precursors-main';
import {ChemicalSolutionMain} from '../solution/chemical-solution-main/chemical-solution-main';

@Component({
  selector: 'app-standard-main',
  imports: [
    MatTab,
    MatTabContent,
    MatTabGroup,
    ReagentMain,
    StandardReagent,
    PrecursorsMain,
    ChemicalSolutionMain,
  ],
  templateUrl: './standard-main.html',
  styleUrl: './standard-main.scss',
  standalone: true
})
export class StandardMain {

}
