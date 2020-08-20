import React, { useState } from 'react';
import { notifyError, notifySuccess } from '../../../util/NotificationUtil';
import { InboxOutlined } from '@ant-design/icons/lib';
import AlButton from '../AlButton/AlButton';
import { AddLink, AddLinkModal } from '../../modals/AddLinkModal/AddLinkModal';
import { Typography, Upload } from 'antd';
import styles from './alUpload.module.scss'

const { Title, Text } = Typography;
const { Dragger } = Upload;

export function AlUpload(): JSX.Element {
	const [isAddLinkModalVisible, setAddLinkModalVisible] = useState(false);

	const props = {
		name: 'file',
		multiple: true,
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

		onChange(info: any) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				notifySuccess(`${info.file.name}`, `File uploaded successfully.`);
			} else if (status === 'error') {
				notifyError(`${info.file.name}`, `File upload failed.`);
			}
		}
	};

	function toggleModal() {
		setAddLinkModalVisible(!isAddLinkModalVisible);
	}

	function onLinkAdd() {
		toggleModal();
	}

	return <>
		<AddLinkModal
			onAdd={(link: AddLink) => onLinkAdd()}
			isVisible={isAddLinkModalVisible}
			onCancel={toggleModal}
		/>
		<Dragger {...props} openFileDialogOnClick={true}>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined/>
			</p>
			<p className='ant-upload-text'>Drag and drop evidence</p>
			<p className='ant-upload-hint'>CSV, PDF, XLSX</p>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<AlButton type='link' className={styles.buttonPadding}>
					Open from computer
				</AlButton>
				<Text>or</Text>
				<AlButton
					type='link'
					className={styles.buttonPadding}
					onClick={(event) => {
						event.stopPropagation();
						setAddLinkModalVisible(!isAddLinkModalVisible);
					}}
				>
					add link
				</AlButton>
			</div>
		</Dragger>
	</>;
}