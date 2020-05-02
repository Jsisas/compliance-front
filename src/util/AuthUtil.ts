import * as React from 'react';
import axios, {AxiosResponse} from "axios";
import {API_URL} from "../index";
import {ApiWrapper} from "../redux/store";
import {notifyError, notifySucess} from "./NotificationUtil";

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

export function authenticate(authRequest: AuthRequest): Promise<AxiosResponse> {
    return axios.post(`${API_URL}/authorize`,
        {
            authorization: {
                token: authRequest.token
            }
        })
}

export function isCurrentUserAuthenticated():boolean {
    const auth = getUserAuth();
    return !(auth == null || auth.token == null || auth.token.length < 1);
}

export function logout(){
    localStorage.removeItem("auth")
    notifySucess("Log out", "Logging out was successful")
}

export function setUserAuth(authUser: Authentication): void {
    localStorage.setItem("auth", JSON.stringify(authUser))
}

export function getUserAuth(): Authentication | null {
    const authentication = localStorage.getItem("auth");

    if (authentication != null) {
        return JSON.parse(authentication)
    } else {
        return null;
    }
}