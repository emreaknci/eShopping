import { CreateCommentDto } from '../dtos/comments/createCommentDto';
import BaseService from './_base.service';
import { AxiosResponse } from 'axios';


const commentEndpoint = `${import.meta.env.VITE_COMMENT_SERVICE}`;
const CommentService = {
    async getCommentsByProductId(productId:any): Promise<AxiosResponse<any>> {
        return await BaseService.get(`/${commentEndpoint}?id=${productId}`);
    },
    async addComment(dto:CreateCommentDto): Promise<AxiosResponse<any>> {
        return await BaseService.post(`/${commentEndpoint}`, dto);
    },
    async deleteComment(commentId:string): Promise<AxiosResponse<any>> {
        return await BaseService.delete(`/${commentEndpoint}?id=${commentId}`);
    }
}

export default CommentService;