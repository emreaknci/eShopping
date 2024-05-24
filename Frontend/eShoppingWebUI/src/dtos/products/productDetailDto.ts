import { CategoryDto } from "../categories/categoryDto";
import { ProductFeatureDto } from "../features/productFeatureDto";
import { ProductImageDto } from "./productImageDto";

export interface ProductDetailDto {
    id:number;
    name:string;
    description:string;
    brandName:string;
    brandId:number;
    price:number;
    unitsInStock:number;
    categories:CategoryDto[];
    features:ProductFeatureDto[];
    images:ProductImageDto[];
}