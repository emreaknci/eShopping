export interface FeatureCreateDto {
    name: string;
    values: string[];
}

export interface FeatureUpdateDto {
    id: number;
    newValues: string[];
}