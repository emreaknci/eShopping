import { AxiosResponse } from 'axios';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { BrandListDto } from '../dtos/brands/brandListDto';
import { BasketItem } from '../models/baskets/basketItem';
import { CustomerBasket } from '../models/baskets/customerBasket';
import { BasketCheckout } from '../dtos/baskets/basketCheckout';

const basketEndpoint = `${import.meta.env.VITE_BASKET_SERVICE}`;
const BasketService = {
    async getBasketById(customerId: string): Promise<AxiosResponse<Result<CustomerBasket>>> {
        return await BaseService.get(`/${basketEndpoint}/${customerId}`);
    },
    async addItemToBasket(basketItem: BasketItem): Promise<AxiosResponse<Result<CustomerBasket>>> {
        return await BaseService.post(`/${basketEndpoint}/`, basketItem);
    },
    async updateBasket(basket: CustomerBasket): Promise<AxiosResponse<Result<CustomerBasket>>> {
        return await BaseService.put(`/${basketEndpoint}/`, basket);
    },
    async deleteBasket(customerId: string): Promise<AxiosResponse<Result<boolean>>> {
        return await BaseService.delete(`/${basketEndpoint}/${customerId}`);
    },
    async checkout(basketCheckout:BasketCheckout): Promise<AxiosResponse<any>>{
        return await BaseService.post(`/${basketEndpoint}/checkout`, basketCheckout);
    },

}

export default BasketService;
