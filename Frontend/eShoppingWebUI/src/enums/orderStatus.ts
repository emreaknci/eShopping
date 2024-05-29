export enum OrderStatus {
  Submitted = 0,
  AwaitingValidation = 1,
  StockConfirmed = 2,
  Paid = 3,
  Cancelled = 4,
}

export const OrderStatusStrings = {
  0: 'Bekliyor',
  1: 'Onay Bekliyor',
  2: 'Stok Onaylandı',
  3: 'Ödendi',
  4: 'İptal Edildi'
} as const;

export const OrderStatusColor = {
  [OrderStatus.Submitted]: 'blue',
  [OrderStatus.AwaitingValidation]: 'orange',
  [OrderStatus.StockConfirmed]: 'green',
  [OrderStatus.Paid]: 'purple',
  [OrderStatus.Cancelled]: 'red',
};