import { AxiosResponse } from 'axios';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { FeatureDto } from '../dtos/features/featureDto';
import { FeatureCreateDto, FeatureUpdateDto } from '../dtos/features/featureCreateDto';
import { FeatureListDto } from '../dtos/features/featureListDto';

const featureEndpoint = `${import.meta.env.VITE_CATALOG_SERVICE}/feature`;
const FeatureService = {
    async getByIds(ids:number[]): Promise<AxiosResponse<Result<FeatureDto[]>>> {
        return await BaseService.get(`/${featureEndpoint}/get-by-ids`,{headers: {ids: ids.join(',')}});
    },
    async getAll(): Promise<AxiosResponse<Result<FeatureDto[]>>> {
        return await BaseService.get(`/${featureEndpoint}/`);
    },
    async add(dto: FeatureCreateDto): Promise<AxiosResponse<Result<FeatureListDto[]>>> {
        return await BaseService.post(`/${featureEndpoint}/add-feature`, dto);
    },

    async addNewValues(dto: FeatureUpdateDto): Promise<AxiosResponse<Result<boolean>>> {
        return await BaseService.put(`/${featureEndpoint}/update-feature`, dto);
    }


}

export default FeatureService;
