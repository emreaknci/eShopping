export default interface LatestOrdersDto {
    orders: OrderDto[];
   
}

export interface OrderDto {
    orderId: string;
    orderDate: Date;
    orderStatus: number;
    buyerName: string;
    total: number;
}

