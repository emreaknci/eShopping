import { AxiosResponse } from 'axios';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { ProductFilterOptions } from '../dtos/products/productFilterOptions';
import { PaginatedResult } from '../utils/PaginatedResult';
import { ProductListDto } from '../dtos/products/productListDto';
import { ProductDetailDto } from '../dtos/products/productDetailDto';

const productEndpoint = `${import.meta.env.VITE_CATALOG_SERVICE}/product`;
const ProductService = {

    async getProducts(options:ProductFilterOptions): Promise<AxiosResponse<PaginatedResult<ProductListDto>>> {
        return await BaseService.post(`/${productEndpoint}/get-products`, options);
    },
    async getProductById(id: number): Promise<AxiosResponse<Result<ProductDetailDto>>> {
        return await BaseService.get(`/${productEndpoint}/detail?id=${id}`);
    },
    async addProduct (formData: FormData): Promise<AxiosResponse<Result<ProductDetailDto>>> {
        return await BaseService.post(`/${productEndpoint}/`, formData,{headers: {'Content-Type': 'multipart/form-data'}});
    },

    async getLowStockProducts(units:number=10): Promise<AxiosResponse<PaginatedResult<ProductListDto>>> {
        return await BaseService.get(`/${productEndpoint}/low-stock?units=${units}`);
    }
}

export default ProductService;
