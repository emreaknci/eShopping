import { AxiosResponse } from "axios";
import RevenueAndOrdersDto from "../dtos/orders/revenueAndOrdersDto";
import BaseService from './_base.service';
import LatestOrdersDto from "../dtos/orders/latestOrdersDto";
import OrderListDto from "../dtos/orders/orderListDto";
import OrderDetailDto from "../dtos/orders/orderDetailDto";

const orderEndpoint = `${import.meta.env.VITE_ORDER_SERVICE}`;

const OrderService = {
    async getRevenueAndOrdersDto(daysAgo: number = 1): Promise<AxiosResponse<RevenueAndOrdersDto>> {
        return await BaseService.get(`/${orderEndpoint}/get-revenue-and-orders?daysAgo=${daysAgo}`);
    },
    async getLatestOrdersDto(count: number): Promise<AxiosResponse<LatestOrdersDto>> {
        return await BaseService.get(`/${orderEndpoint}/get-latest-orders?count=${count}`);
    },
    async getOrders(page: number = 1, pageSize: number = 10, orderStatus?: number, searchText?: string): Promise<AxiosResponse<OrderListDto>> {
        let queryParams = `?page=${page}&pageSize=${pageSize}`;

        console.log(orderStatus, searchText)
    
        if (orderStatus !== null && orderStatus !== undefined && !Number.isNaN(orderStatus)) 
            queryParams += `&orderStatus=${orderStatus}`;
           
        if (searchText !== null && searchText !== undefined) 
            queryParams += `&searchText=${encodeURIComponent(searchText)}`;
        
        return await BaseService.get(`/${orderEndpoint}/get-orders${queryParams}`);
    },
    async getOrderDetailsById(orderId: string): Promise<AxiosResponse<OrderDetailDto>> {
        return await BaseService.get(`/${orderEndpoint}/${orderId}`);
    },


    
}

export default OrderService;
