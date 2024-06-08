import { AxiosResponse } from 'axios';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { BrandListDto } from '../dtos/brands/brandListDto';

const brandEndpoint = `${import.meta.env.VITE_CATALOG_SERVICE}/brand`;
const BrandService = {
    async getBrands(): Promise<AxiosResponse<Result<BrandListDto[]>>> {
        return await BaseService.get(`/${brandEndpoint}/`);
    },
    async createBrand(dto: any): Promise<AxiosResponse<Result<{ name: string }>>> {
        return await BaseService.post(`/${brandEndpoint}/`, dto);
    }

}

export default BrandService;
