import { FeatureValueDto } from "./featureValueDto";

export interface FeatureDto {
    id: number;
    name: string;
    values?: FeatureValueDto[];
}