import {Component, ViewChild} from '@angular/core';
import {MatTab, MatTabChangeEvent, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {TariffPlan} from '../tarif-plan/tarif-plan';
import {Transactions} from '../transactions/transactions';

@Component({
  selector: 'app-sub',
  imports: [
    MatTab,
    MatTabContent,
    MatTabGroup,
    TariffPlan,
    Transactions
  ],
  templateUrl: './sub.html',
  styleUrl: './sub.scss',
  standalone: true
})
export class Sub {

  @ViewChild('transactionsTab') transactionsTab!: Transactions;

  onTabChange($event: MatTabChangeEvent) {
    if ($event.index === 1) { // индекс вашей вкладки
      this.transactionsTab.ngOnInit();
    }
  }
}
