export enum SortType {
    DEFAULT = 0,
    DESC_PRICE = 1,
    INC_PRICE = 2,
    NEW_TO_OLD = 3,
    OLD_TO_NEW = 4
}

export interface ProductFilterOptions {
    pageNumber: number;
    pageSize: number;
    sortType: SortType;
    minPrice?: number;
    maxPrice?: number;
    brandIds?: number[];
    featureValueIds?: number[];
    categoryIds?: number[];
    searchText?: string;
}