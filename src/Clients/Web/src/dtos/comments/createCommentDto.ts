export interface CreateCommentDto{
    text: string;
    rating: number;
    productId: number;
    createdAt: Date;
    hideUserFullName: boolean;
}