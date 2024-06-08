export default interface OrderListDto {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    orders: OrderDto[];
}

export interface OrderDto {
    orderId: string;
    orderDate: Date;
    orderStatus: number;
}