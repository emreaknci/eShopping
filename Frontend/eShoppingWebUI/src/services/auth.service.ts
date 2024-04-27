import { AxiosResponse } from 'axios';
import { LoginDto } from '../dtos/loginDto';
import { RegisterDto } from '../dtos/registerDto';
import { UserDto } from '../dtos/userDto';
import { Result } from '../utils/Result';
import BaseService from './_base.service';
import { AccessToken } from '../models/accessToken';

const authEndpoint = import.meta.env.VITE_AUTH_SERVICE;
const AuthService = {

    async login(data: LoginDto): Promise<AxiosResponse<Result<AccessToken>>> {
        return await BaseService.post(`/${authEndpoint}/login`, data);
    },

    async register(data: RegisterDto): Promise<AxiosResponse<Result<UserDto>>> {
        return BaseService.post(`/${authEndpoint}/register`, data);
    },

    async registerAsAnAdmin(data: RegisterDto): Promise<AxiosResponse<Result<UserDto>>> {
        return BaseService.post(`/${authEndpoint}/register-admin`, data);
    },
    async revokeAuth(userId:number): Promise<AxiosResponse<Result<boolean>>> {
        return BaseService.post(`/${authEndpoint}/revoke-auth?userId=${userId}`);
    },
    async grantAuth(userId:number): Promise<AxiosResponse<Result<boolean>>> {
        return BaseService.post(`/${authEndpoint}/grant-auth?userId=${userId}`);
    }
}

export default AuthService;
