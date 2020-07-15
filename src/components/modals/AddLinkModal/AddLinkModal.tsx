import * as React from 'react';
import {Col, Form, Input, Modal, Row} from 'antd';
import styles from './addLinkModal.module.scss';
import {CloseOutlined} from '@ant-design/icons/lib';
import AlButton from '../../_ui/AlButton/AlButton';
import modalStyles from '../modal.module.scss';
import {Store} from 'antd/lib/form/interface';

interface AddLinkProps {
	onAdd: (link: AddLink) => void;
	isVisible?: boolean;
	onCancel?: () => void;
}

export interface AddLink {
	href: string;
}

export function AddLinkModal(props: AddLinkProps): JSX.Element {
	const onFinish = (data: Store) => props.onAdd(data as AddLink);

	return (
		<>
			<Modal
				width={540}
				className={modalStyles.modalTop}
				visible={props.isVisible}
				maskClosable={true}
				onCancel={props.onCancel}
				footer={null}
				closeIcon={<CloseOutlined className={styles.modalCloseButton}/>}
				bodyStyle={{padding: 0}}
			>
				<div className={styles.addTaskModalContent}>
					<Row gutter={[16, 16]} align={'middle'}>
						<Col xs={{span: 24}}>
							<Form layout="vertical" onFinish={onFinish}>
								<Form.Item
									name="href"
									label="Link"
									rules={[
										{required: true, message: 'Please add link'},
									]}
								>
									<Input placeholder="Add link"/>
								</Form.Item>
								<AlButton type="primary" style={{marginRight: '8px'}} htmlType="submit">Add
									link</AlButton>
								<AlButton type="secondary" onClick={props.onCancel}>Cancel</AlButton>
							</Form>
						</Col>
					</Row>
				</div>
			</Modal>
		</>
	);
}
