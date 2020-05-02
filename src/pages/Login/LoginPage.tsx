import * as React from 'react';
import AlButton from "../../components/_ui/AlButton/AlButton";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import axios from 'axios';
import {API_URL} from "../../index";

export function LoginPage() {

    const successGoogleLogin = (response: GoogleLoginResponse) => {
        axios.post(`${API_URL}/authorize`,
            {
                authorization: {
                    token: response.tokenId
                }
            },
            {

                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log(response)
            })
    }

    const failedGoogleLogin = (response: GoogleLoginResponseOffline) => {
        console.log(response.code);
    }

    return (
        <>
            <h1>Login</h1>
            <GoogleLogin
                clientId="633144400818-1ve596vtf5tv4gccgvl7qn8n5nrcjbnv.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response) => successGoogleLogin(response as GoogleLoginResponse)}
                onFailure={(response) => failedGoogleLogin(response as GoogleLoginResponseOffline)}
                cookiePolicy={'single_host_origin'}
            />
        </>
    );
};