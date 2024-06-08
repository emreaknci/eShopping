export interface Result<T> {
    data: T | null;
    success: number;
    message: string | null;
}