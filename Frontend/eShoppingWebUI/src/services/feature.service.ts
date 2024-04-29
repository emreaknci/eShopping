import { AxiosResponse } from 'axios';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { FeatureDto } from '../dtos/features/featureDto';

const featureEndpoint = `${import.meta.env.VITE_CATALOG_SERVICE}/feature`;
const FeatureService = {
    async getById(ids:number[]): Promise<AxiosResponse<Result<FeatureDto[]>>> {
        return await BaseService.get(`/${featureEndpoint}/get-by-ids`,{headers: {ids: ids.join(',')}});
    },
}

export default FeatureService;
