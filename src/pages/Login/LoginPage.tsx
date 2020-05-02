import * as React from 'react';
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import axios from 'axios';
import {Typography} from "antd";
import {API_URL} from "../../index";
import styles from './loginpage.module.scss'
import AlButton from "../../components/_ui/AlButton/AlButton";
import {Link} from "react-router-dom";

const {Title} = Typography;

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
        <div className={styles.loginWrapper}>
            <Title>Login</Title>
            <div className={styles.providers}>
            <Link to="/regulations"><AlButton type="primary">Login</AlButton></Link>
            <GoogleLogin
                clientId="633144400818-1ve596vtf5tv4gccgvl7qn8n5nrcjbnv.apps.googleusercontent.com"
                render={renderProps => (
                    <AlButton onClick={renderProps.onClick} type="secondary">Google</AlButton>
                )}
                onSuccess={(response) => successGoogleLogin(response as GoogleLoginResponse)}
                onFailure={(response) => failedGoogleLogin(response as GoogleLoginResponseOffline)}
                cookiePolicy={'single_host_origin'}
                className={styles.buttonStyle}
            />
            </div>
        </div>
    );
};