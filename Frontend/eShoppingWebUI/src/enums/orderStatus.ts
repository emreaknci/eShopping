export enum OrderStatus {
  PaymentPending = 1,
  PaymentFailed = 2,
  PaymentSucceeded = 3,
  Preparing = 4,
  Shipped = 5,
  Delivered = 6,
  CancelledByBuyer = 7,
  CancelledByStore = 8
}

export const getOrderStatus =(statusNumber: number) => {
  return OrderStatus[statusNumber];
}

export const OrderStatusStrings = {
  1: 'Ödeme Bekliyor',
  2: 'Ödeme Başarısız',
  3: 'Ödeme Başarılı',
  4: 'Hazırlanıyor',
  5: 'Kargoya Verildi',
  6: 'Teslim Edildi',
  7: 'İptal Edildi',
  8: 'İptal Edildi (Mağaza)'

} as const;

export const OrderStatusColor = {
  [OrderStatus.PaymentPending]: '#1E90FF',
  [OrderStatus.PaymentFailed]: '#FF6347',
  [OrderStatus.PaymentSucceeded]: '#32CD32',
  [OrderStatus.Preparing]: '#FFD700',
  [OrderStatus.Shipped]: '#FFA500',
  [OrderStatus.Delivered]: '#008000',
  [OrderStatus.CancelledByBuyer]: '#FF6347',
  [OrderStatus.CancelledByStore]: '#FF6347'
};