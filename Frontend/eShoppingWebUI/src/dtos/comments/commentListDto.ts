export interface CommentListDto{
    id: string;
    text: string;
    rating: number;
    productId: number;
    userId: string;
    userFullName: string;
    createdAt: Date;
}