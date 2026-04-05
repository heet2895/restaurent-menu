export const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  SERVED: 'served',
  PAID: 'paid',
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];
