export interface ProductListDto {
    id: number;
    name?: string | null;
    brandName?: string | null;
    brandId: number;
    price: number;
    imageUrl?: string | null;
    unitsInStock?: number;
}