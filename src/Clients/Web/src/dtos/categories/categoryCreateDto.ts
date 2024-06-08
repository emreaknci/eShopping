export interface CategoryCreateDto {
    name: string;
    parentCategoryId?: number;
    featureIds?: number[];
}