import * as React from 'react';
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {useHistory} from 'react-router-dom';
import {Typography} from 'antd';
import styles from './loginpage.module.scss';
import {GoogleButton} from '../../components/_ui/GoogleButton/GoogleButton';
import {Authentication, AuthUtil,} from '../../util/AuthUtil';
import {AxiosResponse} from 'axios';
import {ApiWrapper} from '../../redux/store';
import {notifyError, notifySuccess} from '../../util/NotificationUtil';

const {Title} = Typography;

export function LoginPage(): JSX.Element {
	const history = useHistory();

	const successGoogleLogin = (response: GoogleLoginResponse) => {
		AuthUtil.authenticate({token: response.tokenId})
			.then((response: AxiosResponse<ApiWrapper<Authentication>>) => {
				AuthUtil.setUserAuth(response.data.data);
				notifySuccess('Log in', 'Logging in was successful');
				history.push('/regulations');
			})
			.catch(() => {
				notifyError('Log in', 'Logging in failed');
			});
	};

	const failedGoogleLogin = (response: GoogleLoginResponseOffline) => {
		console.log(response.code);
	};

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
}
