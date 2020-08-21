import * as React from 'react';
import { LeftOutlined } from '@ant-design/icons/lib';
import AlButton from '../AlButton/AlButton';
import styles from './albackarrow.module.scss';
import { useHistory } from 'react-router';

export function AlBackArrow(): JSX.Element {
	const history = useHistory();

	return (
		<AlButton type='link' onClick={() => history.goBack()}>
			<LeftOutlined className={styles.alBackArrow} data-testid='leftArrow' />
		</AlButton>
	);
}
