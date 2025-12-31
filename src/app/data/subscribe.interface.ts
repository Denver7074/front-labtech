export interface TariffPlanInfo {
  id: string;
  trial: boolean;
  tariffs: TariffPriceInfo[],
  tariffPlanTypeId: string;
}

export interface TariffPriceInfo {
  id: string;
  amount: number;
  period: string;
}

export interface PaymentRequest {
  tariffPlanTypeId: string;
  amount: number;
  period: string;
  tariffPlanId: string;
}

export interface PaymentInfo {
  confirmationUrl: string | null;
}

export interface TransactionInfo {
  id: string;
  userId: string;
  amount: number;
  status: string;
  period: string;
  updatedAt: string;
  createdAt: string;
  tariffPlanTypeId: string;
}

export const PERIOD_LABELS: Record<string, string> = {
  MONTH: '1 месяц',
  QUARTER: '3 месяца',
  HALF_YEAR: '6 месяцев',
  YEAR: '12 месяцев'
};

export const PERIOD_ORDER: Record<string, number> = {
  MONTH: 1,
  QUARTER: 2,
  HALF_YEAR: 3,
  YEAR: 4
};

export const TRANSACTION_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ожидание оплаты',
  FAILED: 'Операция не выполнена',
  DONE: 'Успешная операция',
};
