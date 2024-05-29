import { AxiosResponse } from "axios";
import RevenueAndOrdersDto from "../dtos/orders/revenueAndOrdersDto";
import BaseService from './_base.service';
import LatestOrdersDto from "../dtos/orders/latestOrdersDto";

const orderEndpoint = `${import.meta.env.VITE_ORDER_SERVICE}`;

const OrderService = {
    async getRevenueAndOrdersDto(daysAgo: number = 1): Promise<AxiosResponse<RevenueAndOrdersDto>> {
        return await BaseService.get(`/${orderEndpoint}/get-revenue-and-orders?daysAgo=${daysAgo}`);
    },
    async getLatestOrdersDto(count: number): Promise<AxiosResponse<LatestOrdersDto>> {
        return await BaseService.get(`/${orderEndpoint}/get-latest-orders?count=${count}`);
    }
}

export default OrderService;
