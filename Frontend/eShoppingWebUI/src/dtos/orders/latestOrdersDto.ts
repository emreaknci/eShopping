export default interface LatestOrdersDto {
    orders: OrderDto[];
   
}

export interface OrderDto {
    orderId: string;
    buyerName: string;
    orderDate: Date;
    total: number;
    orderStatus: number;
}

