import { AxiosResponse } from 'axios';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { CategoryListDto } from '../dtos/categories/categoryListDto';
import { CategoryCreateDto } from '../dtos/categories/categoryCreateDto';
import { CategoryDto } from '../dtos/categories/categoryDto';

const categoryEndpoint = `${import.meta.env.VITE_CATALOG_SERVICE}/category`;
const CategoryService = {

    async getCategories(): Promise<AxiosResponse<Result<CategoryListDto[]>>> {
        return await BaseService.get(`/${categoryEndpoint}/`);
    },
    async getById(id: number): Promise<AxiosResponse<Result<CategoryListDto>>> {
        return await BaseService.get(`/${categoryEndpoint}/get-by-id?id=${id}`);
    },
    async getCategoriesWithProducts(): Promise<AxiosResponse<Result<CategoryListDto[]>>> {
        return await BaseService.get(`/${categoryEndpoint}/get-categories-with-products`);
    },
    async getCategoryNames(): Promise<AxiosResponse<Result<CategoryDto[]>>> {
        return await BaseService.get(`/${categoryEndpoint}/get-category-names`);
    },
    async add(dto: CategoryCreateDto): Promise<AxiosResponse<Result<CategoryCreateDto>>> {
        return await BaseService.post(`/${categoryEndpoint}/`, dto);
    },

}

export default CategoryService;
