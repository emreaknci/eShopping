export default interface OrderDetailDto {
    orderId: string;
    date: string;
    buyerId: string;
    buyerName: string;
    orderStatus: number;
    street: string;
    city: string;
    zipCode: string;
    country: string;
    numberOfInstallments: number;
    orderItems: OrderItemDto[];
    total: number;
}

export interface OrderItemDto {
    id: string;
    orderId: string;
    productId: number;
    productname: string;
    units: number;
    unitPrice: number;
    pictureUrl: string;
}
