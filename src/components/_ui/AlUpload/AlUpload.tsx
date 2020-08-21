import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../../util/NotificationUtil';
import { InboxOutlined } from '@ant-design/icons/lib';
import AlButton from '../AlButton/AlButton';
import { AddLink, AddLinkModal } from '../../modals/AddLinkModal/AddLinkModal';
import { Typography, Upload } from 'antd';
import styles from './alUpload.module.scss';
import { UploadFile } from 'antd/es/upload/interface';
import {v4} from 'uuid';

const { Text } = Typography;
const { Dragger } = Upload;

export enum AttachmentType {
	FILE = 'file',
	LINK = 'link'
}

export interface AlFile {
	uid: string,
	name: string,
	size: number,
	last_modified: string,
	type: string;
	attachment_type: AttachmentType;
	content_base64: string
}

export interface AlUploadProps {
	onChange: (file: AlFile[]) => void;
}
export function AlUpload(props: AlUploadProps): JSX.Element {
	const [isAddLinkModalVisible, setAddLinkModalVisible] = useState(false);
	const [attachments, setAttachments] = useState<AlFile[]>([]);

	useEffect(() => {
		props.onChange(attachments);
	}, [props, attachments]);

	const uploadProps = {
		name: 'file',
		multiple: true,
		action: '',
		openFileDialogOnClick: true,
		fileList: attachments,
		onRemove: (file: UploadFile<AlFile>) => removeFile(file as AlFile),
		beforeUpload: (file: any) => {return addFile(file);}
	};

	function toggleModal() {
		setAddLinkModalVisible(!isAddLinkModalVisible);
	}

	function onLinkAdd(link: AddLink) {
		const alFile: AlFile = {
			uid: v4(),
			name: link.name,
			size: link.href.length,
			last_modified: new Date().toISOString(),
			type: '',
			attachment_type: AttachmentType.LINK,
			content_base64: btoa(link.href)
		};
		setAttachments([...attachments, alFile])
		toggleModal();
	}

	function addFile(file: any) {
		const reader = new FileReader();
		reader.onload = e => {
			if (e && e.target && e.target.result) {
				const alFile: AlFile = {
					uid: v4(),
					name: file.name,
					size: file.size,
					last_modified: new Date(file.lastModified || new Date()).toISOString(),
					type: file.type,
					attachment_type: AttachmentType.FILE,
					content_base64: btoa(e.target.result as string)
				};
				setAttachments([...attachments, alFile]);
				notifySuccess('File added', 'File was attached successfully');
			} else {
				notifyError('File was not added', 'Attaching a file was unsuccessful');
			}
		};
		reader.readAsText(file);
		return false;
	}

	function removeFile(file: AlFile){
		setAttachments(attachments.filter(addedFile => addedFile.uid !== file.uid))
	}

	return <>
		<AddLinkModal
			onAdd={(link: AddLink) => onLinkAdd(link)}
			isVisible={isAddLinkModalVisible}
			onCancel={toggleModal}
		/>
		<Dragger {...uploadProps}>
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