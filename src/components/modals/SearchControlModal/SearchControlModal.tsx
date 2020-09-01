import * as React from 'react';
import { useEffect, useState } from 'react';
import { Col, Modal, Row, Typography } from 'antd';
import styles from './searchControl.module.scss';
import { Control, selectAllControls } from '../../../redux/Control/ControlSlice';
import { CloseOutlined } from '@ant-design/icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { fetchAllControls } from '../../../redux/Control/ControlService';
import modalStyles from '../modal.module.scss';
import { SearchInput } from '../../_ui/SearchInput/SearchInput';
import AlButton from '../../_ui/AlButton/AlButton';

const { Title } = Typography;

interface SearchControlModal {
	isVisible?: boolean;
	onCancel: () => void;
	onAttach: (control: Control[]) => void;
}

export function SearchControlModal(props: SearchControlModal): JSX.Element {
	const allControls = useSelector((state: RootState) => selectAllControls(state));
	const [selectedControls, setSelectedControl] = useState<Control[]>([]);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllControls());
	}, [dispatch]);

	function onControlSelect(controls: Control[]) {
		setSelectedControl(controls);
	}

	return (
		<>
			<Modal
				className={modalStyles.modalTop}
				width={540}
				visible={props.isVisible}
				maskClosable={true}
				onCancel={props.onCancel}
				footer={null}
				closeIcon={<CloseOutlined className={styles.modalCloseButton} />}
				bodyStyle={{ padding: 0 }}
			>
				<div style={{ padding: '12px 14px' }}>
					<Title style={{ margin: 0 }}>Attach existing control</Title>
				</div>
				<div className={styles.addTaskModalContent}>
					<Row gutter={[16, 16]} align={'middle'}>
						<Col xs={{ span: 24 }}>
							<SearchInput
								data={allControls}
								displayKey={'title'}
								idKey={'id'}
								filterByKeys={['title']}
								onSelect={(controls: Control[]) => onControlSelect(controls)}
								data-cy='search-control-modal-input'
							/>
						</Col>
					</Row>
					<Row gutter={[16, 16]} align={'middle'}>
						<Col xs={{ span: 24 }}>
							<AlButton
								type={'primary'}
								disabled={selectedControls.length < 1}
								onClick={() => props.onAttach(selectedControls)}
							>
								Attach control
							</AlButton>
							<AlButton type={'secondary'} onClick={() => props.onCancel()}>
								Cancel
							</AlButton>
						</Col>
					</Row>
				</div>
			</Modal>
		</>
	);
}
