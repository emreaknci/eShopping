import { JwtPayload, jwtDecode } from "jwt-decode";
import StorageService from "../services/storage.service";

export interface JwtInfo {
    nameidentifier: string;
    name: string;
    role: string;
    exp: number;
}

export const JwtHelper = {
    decode: (token: string): JwtPayload => {
        return jwtDecode(token);
    },

    decodedTokenToClaims: (decoded: any): JwtInfo => {
        return {
            nameidentifier: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            exp: decoded.exp
        }
    },

    getTokenInfos: (token: string): JwtInfo => {
        const decoded = JwtHelper.decode(token);
        return JwtHelper.decodedTokenToClaims(decoded);
    },    

    isAdministrator: (token: string): boolean => {
        const claims = JwtHelper.getTokenInfos(token);
        return claims.role.toLowerCase() === "admin";
    }
}