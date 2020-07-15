import * as React from 'react';
import {LeftOutlined} from '@ant-design/icons/lib';
import AlButton from '../AlButton/AlButton';
import styles from './albackarrow.module.scss';
import * as H from 'history';

interface AlBackArrowProps {
	history: H.History;
}

export function AlBackArrow(props: AlBackArrowProps): JSX.Element {
	return (
		<>
			<AlButton type="link" onClick={() => props.history.goBack()}>
				<LeftOutlined className={styles.alBackArrow}/>
			</AlButton>
		</>
	);
}
