import {Component, inject, OnInit, signal} from '@angular/core';
import {NotificationService} from '../../../ui/notification.service';
import {ApiResponse} from '../../../../data/response.interface';
import {PERIOD_LABELS, TRANSACTION_STATUS_LABELS, TransactionInfo} from '../../../../data/subscribe.interface';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatIconButton} from '@angular/material/button';
import {Loader} from '../../../ui/loader/loader';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {GuideService} from '../../../../service/guide.service';
import {CrudService} from '../../../../service/crud.service';

@Component({
  selector: 'app-transactions',
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    DatePipe,
    DecimalPipe,
    MatHeaderCellDef,
    MatCellDef,
    MatNoDataRow,
    MatRowDef,
    MatHeaderRowDef,
    Loader,
    MatIconButton,
    MatTooltip,
    MatIconModule,
  ],
  templateUrl: './transactions.html',
  standalone: true
})
export class Transactions implements OnInit {
  private crudService = inject(CrudService);
  private guideService = inject(GuideService);
  private notification = inject(NotificationService);
  protected readonly TRANSACTION_STATUS_LABELS = TRANSACTION_STATUS_LABELS;
  protected readonly PERIOD_LABELS = PERIOD_LABELS;
  protected isChecking: { [id: string]: boolean } = {};
  transactions = signal<TransactionInfo[]>([]);
  currentPage = signal(0);
  pageSize = signal(10);
  totalItems = signal(0);
  tariffPlanTypeMap = signal<Map<string, string> | null>(null);

  protected readonly displayedColumns: string[] = [
    'index',
    'amount',
    'status',
    'period',
    'subscribe',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  ngOnInit() {
    this.guideService.getTypes('tariff-plan-type').subscribe(types => {
      const map = new Map<string, string>();
      types.forEach(t => map.set(t.id, t.value));
      this.tariffPlanTypeMap.set(map);
    });
    this.loadTransactions();
  }

  loadTransactions() {
    this.crudService
      .getEntities<TransactionInfo>('subscribe-service/api/v1/transactions', this.currentPage(), this.pageSize())
      .subscribe({
        next: (response: ApiResponse<TransactionInfo[]>) => {
          this.transactions.set(response.value);
          this.totalItems.set(response.pagingResults.totalItemsCount);
        },
        error: (err) => {
          const message = err?.error?.error?.message || 'Ошибка загрузки транзакций';
          this.notification.showErrorMsg(message);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadTransactions();
  }

  checkStatus(transactionId: string): void {
    this.isChecking[transactionId] = true;

    const path = `subscribe-service/api/v1/payment/check-status/${transactionId}`;
    this.crudService.get<TransactionInfo>(path).subscribe({
      next: (updatedTx: TransactionInfo) => {
        const currentList = this.transactions();
        const index = currentList.findIndex(tx => tx.id === transactionId);
        if (index !== -1) {
          const updatedList = [...currentList];
          updatedList[index] = { ...updatedList[index], status: updatedTx.status };
          this.transactions.set(updatedList);
        }
        this.isChecking[transactionId] = false;
      },
      error: (err) => {
        this.isChecking[transactionId] = false;
        const message = err?.error?.error?.message || 'Не удалось проверить статус';
        this.notification.showErrorMsg(message);
      }
    });
  }

  getValue(key: string, list: Record<string, string>) {
    return list[key];
  }
}
