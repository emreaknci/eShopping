import { faker, tr } from '@faker-js/faker';

export enum OrderStatus {
  Pending = 'Bekliyor',
  Preparing = 'Hazırlanıyor',
  Shipped = 'Gönderildi',
  Delivered = 'Teslim Edildi',
  Cancelled = 'İptal Edildi',
}
export const OrderStatusColor = {
  [OrderStatus.Pending]: 'blue',
  [OrderStatus.Preparing]: 'orange',
  [OrderStatus.Shipped]: 'green',
  [OrderStatus.Delivered]: 'purple',
  [OrderStatus.Cancelled]: 'red',
};
export type Order = {
  id: string;
  orderDate: Date;
  cancelledDate?: Date;
  totalPrice: number;
  status: OrderStatus;
  userId: string;
  userFullName: string;
  orderItems: OrderItem[];
  address: OrderAddress;
};

export type OrderAddress = {
  address: string;
  city: string;
  country: string;
  zipCode: string;
  receiverPhone?: string;
  receiverName?: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  isCancelled: boolean;
  cancelledDate?: Date;
};


export function createFakeOrderData(userCount:number, ordersPerUser: number): Order[] {
  const users: { id: string; fullName: string }[] = [];

  // Kullanıcıları oluştur
  for (let i = 0; i < userCount; i++) {
    const userId = faker.string.uuid();
    const fullName = faker.person.fullName();
    users.push({ id: userId, fullName });
  }
  const getRandomStatus = () => {
    const statusValues = Object.values(OrderStatus) as string[];
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex];
  };
  // Siparişleri oluştur
  const orders: Order[] = [];
  for (let i = 0; i < userCount*ordersPerUser; i++) {
    const userIndex = Math.floor(i / ordersPerUser);
    const user = users[userIndex];

    const order: Order = {
      id: faker.string.uuid(),
      orderDate: faker.date.past(),
      status: Object.values(OrderStatus)[Math.floor(Math.random() * Object.values(OrderStatus).length)] as OrderStatus,
      totalPrice: 0,
      userId: user.id,
      userFullName: user.fullName,
      orderItems: [],
      cancelledDate: undefined,
      address: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
        receiverPhone: faker.phone.number(),
        receiverName: faker.person.fullName(),
      },
    };

    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let j = 0; j < itemCount; j++) {
      const orderItem = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.number.float({ min: 10, max: 250 }).toFixed(2)),
        quantity: faker.number.int({ min: 1, max: 10 }),
        imageUrl: faker.image.urlPicsumPhotos(),
        isCancelled: false,
      };
      order.orderItems.push(orderItem);
    }
    order.totalPrice = Number(order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));

    orders.push(order);
  }

  return orders;
}


