import * as React from 'react';
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import { useHistory } from "react-router-dom";
import {Typography} from "antd";
import styles from './loginpage.module.scss'
import {GoogleButton} from "../../components/_ui/GoogleButton/GoogleButton";
import {
    ApiError,
    authenticate,
    Authentication,
    getUserAuth,
    setUserAuth
} from "../../util/AuthUtil";
import {AxiosResponse} from "axios";
import {ApiWrapper} from "../../redux/store";
import {notifyError, notifySucess} from "../../util/NotificationUtil";

const {Title} = Typography;

interface LoginPageProps{
    onAuthChange: any;
}
export function LoginPage(props: LoginPageProps) {
    const history = useHistory();

    const successGoogleLogin = (response: GoogleLoginResponse) => {
        authenticate({token: response.tokenId})
            .then((response: AxiosResponse<ApiWrapper<Authentication>>) => {
                setUserAuth(response.data.data);
                notifySucess("Log in", "Logging in was successful")
                history.push("/regulations")
            })
            .catch((err: any) => {
                notifyError("Log in", "Logging in failed")
                console.log(err)
            })
    }

    const failedGoogleLogin = (response: GoogleLoginResponseOffline) => {
        console.log(response.code);
    }

    return (
        <div className={styles.loginWrapper}>
            <Title>Login</Title>
            <div className={styles.providers}>
                <GoogleLogin
                    clientId="633144400818-1ve596vtf5tv4gccgvl7qn8n5nrcjbnv.apps.googleusercontent.com"
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}/>
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