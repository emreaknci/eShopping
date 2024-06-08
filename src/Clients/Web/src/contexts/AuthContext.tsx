import { createContext, useEffect, useState } from "react";
import { JwtHelper, JwtInfo } from "../utils/JwtHelper";
import StorageService from "../services/storage.service";
import { LoginDto } from "../dtos/loginDto";
import { toast } from "react-toastify";
import { AccessToken } from "../models/accessToken";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { UserDto } from "../dtos/userDto";


export const AuthContext = createContext({
    isAuthenticated: false,
    isTokenChecked: false,
    isAdmin: false,
    logout: () => { },
    login: (loginDto: LoginDto) => { }
})

export const AuthProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = StorageService.getAccessToken();
            if (token) {
                setIsAdmin(JwtHelper.isAdministrator(token));
                setIsAuthenticated(true);
                setIsTokenChecked(true);
                return;
            }
            setIsAuthenticated(false);
            setIsTokenChecked(true);
            return;
        }

        checkToken();
    }, [isAuthenticated])

    useEffect(() => {
        const token = StorageService.getAccessToken();
        if (token && isAuthenticated && isTokenChecked) {
            const exp = JwtHelper.getTokenInfos(token).exp;

            const remainingTime = exp * 1000 - new Date().getTime();
            console.log(remainingTime / 1000)
            if (remainingTime <= 0) {
                logout();
                toast.info("Oturum süreniz doldu. Lütfen tekrar giriş yapın.");
                return;
            } else {
                setTimeout(() => {
                    logout();
                    toast.info("Oturum süreniz doldu. Lütfen tekrar giriş yapın.");
                }, remainingTime)
            }
        }
    }, [isAuthenticated, isTokenChecked])



    const logout = () => {
        StorageService.clearAccessToken();
        setIsAuthenticated(false);
        setIsAdmin(false);
    }

    const login = async (loginDto: LoginDto) => {
        await AuthService.login(loginDto).then(res => {
            const accessToken: AccessToken = res.data.data!;
            StorageService.setAccessToken(accessToken.token);
            setIsAuthenticated(true);
            setIsTokenChecked(true);
            setIsAdmin(JwtHelper.isAdministrator(accessToken.token));
            toast.success("Giriş başarılı");
        }).catch(err => {
            toast.error(err.response.data?.message || "Giriş yapılırken bir hata oluştu");
        })
    }


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isTokenChecked,
            isAdmin,
            logout,
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}