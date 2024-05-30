export enum OrderStatus {
  Submitted = 1,
  AwaitingValidation = 2,
  StockConfirmed = 3,
  Paid = 4,
  Shipped = 5,
  Cancelled = 6,
}

export const getOrderStatus =(statusNumber: number) => {
  return OrderStatus[statusNumber];
}

export const OrderStatusStrings = {
  1: 'Bekliyor',
  2: 'Onay Bekliyor',
  3: 'Stok Onaylandı',
  4: 'Ödendi',
  5: 'Kargolandı',
  6: 'İptal Edildi'
} as const;

export const OrderStatusColor = {
  [OrderStatus.Submitted]: '#1E90FF', // DodgerBlue
  [OrderStatus.AwaitingValidation]: '#FFA500', // Orange
  [OrderStatus.StockConfirmed]: '#32CD32', // LimeGreen
  [OrderStatus.Paid]: '#32CD32', // LimeGreen
  [OrderStatus.Shipped]: '#6A5ACD', // SlateBlue
  [OrderStatus.Cancelled]: '#FF4500', // OrangeRed
};