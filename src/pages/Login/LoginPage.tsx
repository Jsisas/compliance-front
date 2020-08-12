import * as React from 'react';
import { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import styles from './loginpage.module.scss';
import { GoogleButton } from '../../components/_ui/GoogleButton/GoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../redux/Auth/AuthService';
import { RootState } from '../../redux/reducer';

const { Title } = Typography;

export function LoginPage(): JSX.Element {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/regulations');
		}
	}, [dispatch, isAuthenticated, history]);

	const login = (token: string) => {
		dispatch(authenticate(token));
	};

	const successGoogleLogin = (response: GoogleLoginResponse) => {
		login(response.tokenId);
	};

	const failedGoogleLogin = (response: GoogleLoginResponseOffline) => {
		console.log(response.code);
	};

	return (
		<div className={styles.loginWrapper}>
			<Title>Login</Title>
			<div className={styles.providers}>
				<GoogleLogin
					clientId='633144400818-1ve596vtf5tv4gccgvl7qn8n5nrcjbnv.apps.googleusercontent.com'
					render={(renderProps) => <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} />}
					onSuccess={(response) => successGoogleLogin(response as GoogleLoginResponse)}
					onFailure={(response) => failedGoogleLogin(response as GoogleLoginResponseOffline)}
					cookiePolicy={'single_host_origin'}
					className={styles.buttonStyle}
				/>
			</div>
		</div>
	);
}
