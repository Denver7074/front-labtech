import {Component, inject, OnInit, signal} from '@angular/core';
import {NotificationService} from '../../../ui/notification.service';
import {
  PaymentInfo,
  PaymentRequest,
  PERIOD_LABELS, PERIOD_ORDER,
  TariffPlanInfo,
  TariffPriceInfo
} from '../../../../data/subscribe.interface';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

import {MatDivider} from '@angular/material/divider';
import {Loader} from '../../../ui/loader/loader';
import {MatIconModule} from '@angular/material/icon';
import {Button} from '../../../ui/button/button';
import {catchError, forkJoin, map, of} from 'rxjs';
import {GuideService} from '../../../../service/guide.service';
import {DecimalPipe} from '@angular/common';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {MatIconButton} from '@angular/material/button';
import {ComponentType} from '@angular/cdk/portal';
import {MatDialog} from '@angular/material/dialog';
import {TariffDialog} from '../tariff-dialog/tariff-dialog';
import {MatTooltip} from '@angular/material/tooltip';
import {toSignal} from '@angular/core/rxjs-interop';
import {CrudService} from '../../../../service/crud.service';


@Component({
  selector: 'app-tarif-plan',
  imports: [
    MatCardActions,
    MatIconModule,
    MatCardContent,
    MatDivider,
    MatCardTitle,
    MatCardHeader,
    Loader,
    MatCard,
    Button,
    DecimalPipe,
    MatSelect,
    MatFormField,
    MatOption,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './tarif-plan.html',
  styleUrl: './tarif-plan.scss',
  standalone: true
})
export class TariffPlan implements OnInit {
  protected readonly TariffDialog = TariffDialog;
  private crudService = inject(CrudService);
  private notification = inject(NotificationService);
  private guideService = inject(GuideService);
  private dialog = inject(MatDialog);

  tariffPlans = signal<TariffPlanInfo[] | null>(null);
  loading = signal(true);

  private _selectedPeriod = signal<Record<string, string | undefined>>({});
  selectedPeriod = this._selectedPeriod.asReadonly();

  ngOnInit(): void {
    this.loadTariffPlans();
  }

  protected readonly tariffPlanTypes = toSignal(
    forkJoin({
      'tariff-plan-type': this.guideService.getTypes('tariff-plan-type'),
    }).pipe(
      map(result => {
        const outerMap = new Map<string, Map<string, string>>();
        for (const [key, types] of Object.entries(result)) {
          const innerMap = new Map(types.map(t => [t.id, t.value]));
          outerMap.set(key, innerMap);
        }
        return outerMap;
      }),
      catchError(() => of(new Map<string, Map<string, string>>()))
    ),
    { initialValue: new Map<string, Map<string, string>>() }
  );

  loadTariffPlans() {
    this.crudService.get<TariffPlanInfo[]>('subscribe-service/api/v1/tariff-plan/all').subscribe({
      next: (data) => {
        this.tariffPlans.set(data);
        const defaults: Record<string, string> = {};
        data.forEach(plan => {
          if (plan.tariffs.length > 0) {
            defaults[plan.id] = plan.tariffs[0].period;
          }
        });
        this._selectedPeriod.set(defaults);
        this.loading.set(false);
      },
      error: (error) => {
        this.notification.showErrorMsg(error.error?.error?.message || 'Ошибка загрузки тарифов');
        this.loading.set(false);
      }
    });
  }

  onPeriodChange(planId: string, period: string): void {
    this._selectedPeriod.update(prev => ({...prev, [planId]: period}));
  }

  getSelectedTariff(plan: TariffPlanInfo): TariffPriceInfo | undefined {
    const period = this.selectedPeriod()[plan.id];
    return plan.tariffs.find(t => t.period === period);
  }

  getPeriodLabel(period: string): string {
    return PERIOD_LABELS[period] || period;
  }

  onSelectPlan(plan: TariffPlanInfo, period: string | undefined): void {
    const selected = this.getSelectedTariff(plan);
    if (selected) {
      const requestBody: PaymentRequest = {
        tariffPlanTypeId: plan.tariffPlanTypeId,
        period: selected.period,
        amount: selected.amount,
        tariffPlanId: plan.id,
      }
      this.crudService.post<PaymentInfo>(requestBody, 'subscribe-service/api/v1/payment/init').subscribe({
        next: (paymentInfo) => {
          // Перенаправляем на внешний URL (платёжную систему)
          if (!paymentInfo.confirmationUrl) {
            this.notification.showErrorMsg('Ошибка оплаты тарифа');
            return;
          }
          window.open(paymentInfo.confirmationUrl, '_blank');
        },
        error: (error) => {
          this.notification.showErrorMsg(error.error?.error?.message);
        }
      });
    }
  }

  onDelete(id: string) {
    this.crudService.delete(`subscribe-service/api/v1/tariff-plan/${id}`).subscribe({
      next: () => {
        this.loadTariffPlans();
      },
    });
  }

  openDialog(dialogComponent: ComponentType<any>, value?: any) {
    const mode = value ? 'edit' : 'create';
    const dialogRef = this.dialog.open(dialogComponent, {
      data: {
        mode: mode,
        value: value,
        guide: this.tariffPlanTypes(),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (mode === 'edit') {
        this.update(result);
      } else {
        this.add(result);
      }
    });
  }

  add(result: any) {
    this.crudService.post<TariffPlanInfo>(result, `subscribe-service/api/v1/tariff-plan/add`).subscribe({
      next: () => {
        this.loadTariffPlans();
      },
      error: (err) => this.notification.showErrorMsg(err.error.error.message)
    });
  }

  update(result: any) {
    this.crudService.post<TariffPlanInfo>(result, `subscribe-service/api/v1/tariff-plan/update/${result.id}`).subscribe({
      next: () => {
        this.loadTariffPlans();
      },
      error: (err) => this.notification.showErrorMsg(err.error.error.message)
    });
  }

  getSortedTariffs(tariffs: TariffPriceInfo[]): TariffPriceInfo[] {
    return [...tariffs].sort((a, b) =>
      (PERIOD_ORDER[a.period] ?? 999) - (PERIOD_ORDER[b.period] ?? 999)
    );
  }
}

