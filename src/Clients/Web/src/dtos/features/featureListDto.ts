import { FeatureValueDto } from "./featureValueDto";

export interface FeatureListDto {
    id: number;
    name: string;
    values: FeatureValueDto[];
}