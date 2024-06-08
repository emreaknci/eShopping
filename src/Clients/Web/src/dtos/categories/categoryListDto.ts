import { BrandListDto } from "../brands/brandListDto";
import { FeatureDto } from "../features/featureDto";
import { ProductListDto } from "../products/productListDto";

export interface CategoryListDto {
    id: number;
    name: string;
    parentCategoryId: number;
    features: FeatureDto[];
    subCategories?: CategoryListDto[];
    brands?: BrandListDto[];
    products?:ProductListDto[];
}