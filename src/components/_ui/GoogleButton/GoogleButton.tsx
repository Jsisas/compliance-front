import * as React from 'react';
import { ReactComponent as GoogleLogo } from '../../../assets/logo/google_logo.svg';
import AlButton from '../AlButton/AlButton';

interface GoogleButtonProps {
	onClick: () => void;
	disabled?: boolean;
}

export function GoogleButton(props: GoogleButtonProps): JSX.Element {
	return (
		<AlButton onClick={props.onClick} type='secondary' disabled={props.disabled || false} style={{ display: 'flex' }}>
			<GoogleLogo style={{ height: '16px', marginRight: '8px' }} /> Google
		</AlButton>
	);
}
