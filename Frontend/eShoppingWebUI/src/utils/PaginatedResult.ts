import { Result } from './Result';
export interface PaginatedResult<T> extends Result<T[]> {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}