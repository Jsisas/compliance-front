import axios, {AxiosResponse} from "axios";
import {API_URL} from "../index";
import {notifySucess} from "./NotificationUtil";

export interface AuthRequest {
    token: string;
}

export interface Authentication {
    token: string;
    user: AuthUser;
}

export interface AuthUser {
    id: string;
    name: string;
    picture: string;
    username: string;
}

export interface ApiError {
    error: string;
}

export class AuthUtil {

    static authenticate(authRequest: AuthRequest): Promise<AxiosResponse> {
        return axios.post(`${API_URL}/authorize`,
            {
                authorization: {
                    token: authRequest.token
                }
            })
    }

    static isCurrentUserAuthenticated():boolean {
        const auth = AuthUtil.getUserAuth();
        return !(auth == null || auth.token == null || auth.token.length < 1);
    }

    static logout(){
        localStorage.removeItem("auth")
        notifySucess("Log out", "Logging out was successful")
    }

    static setUserAuth(authUser: Authentication): void {
        localStorage.setItem("auth", JSON.stringify(authUser))
    }

    static getUserAuth(): Authentication | null {
        const authentication = localStorage.getItem("auth");

        if (authentication != null) {
            return JSON.parse(authentication)
        } else {
            return null;
        }
    }

}
