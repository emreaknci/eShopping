import { AxiosResponse } from 'axios';
import { LoginDto } from '../dtos/loginDto';
import { UserDto } from '../dtos/userDto';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { Role } from '../models/role';
import { PaginatedResult } from '../utils/PaginatedResult';

const userEndpoint = import.meta.env.VITE_USER_SERVICE;
const UserService = {

    async getCurrentUser(): Promise<AxiosResponse<Result<any>>> {
        return await BaseService.get(`/${userEndpoint}/`);
    },

    async getUsersWithPaginationByRole(role: Role,searchText="", pageNumber = 1, pageSize = 10): Promise<AxiosResponse<PaginatedResult<UserDto>>> {
        return await BaseService.get(`/${userEndpoint}/get-all-with-pagination-by-role?role=${role}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    },
    async getAllByRole(role: Role): Promise<AxiosResponse<Result<UserDto[]>>> {
        return await BaseService.get(`/${userEndpoint}/get-all-by-role?role=${role}`);
    },
}

export default UserService;
