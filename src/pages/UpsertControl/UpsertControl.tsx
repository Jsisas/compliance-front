import { Col, DatePicker, Form, Radio, Row, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { AlBackArrow } from '../../components/_ui/AlBackArrow/AlBackArrow';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { ControlConnectedItems } from '../../components/ControlConnectedItems/ControlConnectedItems';
import { fetchControlById, upsertControl } from '../../redux/Control/ControlService';
import { Control, ControlType, selectControlById } from '../../redux/Control/ControlSlice';
import { RootState } from '../../redux/reducer';
import { date } from '../../util/DateUtil';
import { notifySuccess } from '../../util/NotificationUtil';
import { User } from '../../redux/User/UserSlice';
import { selectAllTmpRequirements } from '../../redux/Requirement/TmpRequirementSlice/TmpRequirementSlice';
import { UserSearchSingle } from '../../components/_ui/SearchSelect/Single/UserSearch/UserSearchSingle';
import ReactQuill from 'react-quill';

const { Title } = Typography;

export function UpsertControlPage(): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const dispatch = useDispatch();
	const routeHistory = useHistory();
	const control = useSelector((state: RootState) => selectControlById(state, id));
	const requirementsToAttach = useSelector((state: RootState) => selectAllTmpRequirements(state));
	const [assignee, setAssignee] = useState<User>(control?.assignee || ({} as User));

	const [description, setDescription] = useState<string>(control?.description || '');

	useEffect(() => {
		if (id) {
			dispatch(fetchControlById(id));
		}
	}, [dispatch, id]);

	function onFinish(data: Store): void {
		const controlData: Control = data as Control;
		controlData.id = id;
		controlData.requirements = (control?.requirements || []).concat(requirementsToAttach);
		controlData.assignee = assignee;

		console.log(data);
		console.log(controlData);
		dispatch(upsertControl(controlData));
		notifySuccess('Add Control', 'Adding a control was successful!');

		if (controlData.id) {
			routeHistory.push('/controls/' + controlData.id);
		} else {
			routeHistory.goBack();
		}
	}

	const [form] = Form.useForm();
	React.useEffect(() => {
		form.setFieldsValue({
			description: description,
		});
	}, [description, form]);

	return (
		<>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={2} xl={1}>
					<AlBackArrow />
				</Col>
				<Col xs={20} xl={20}>
					<Title style={{ marginBottom: 0 }}>{control ? 'Edit control' : 'Add new control'}</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align={'top'} justify={'space-between'}>
				<Col xs={2} xl={{ span: 10, offset: 1 }}>
					<Form layout='vertical' onFinish={onFinish} form={form}>
						<Form.Item
							name='title'
							rules={[
								{
									required: true,
									message: 'Please input control title!',
								},
							]}
							initialValue={control?.title}
						>
							<TextArea placeholder='Add title' />
						</Form.Item>

						<Form.Item
							name='description'
							rules={[
								{
									required: true,
									message: 'Please input control description!',
								},
							]}
							initialValue={control?.description || ''}
						>
							<ReactQuill theme='snow' value={control?.description || ''} onChange={(val) => setDescription(val)} />
						</Form.Item>
						<Form.Item label='Add assignee' name='assignee' initialValue={control?.assignee}>
							<UserSearchSingle
								selectedUsers={control ? control.assignee : undefined}
								placeholder='Add assignees'
								onChange={(user: User) => setAssignee(user)}
							/>
						</Form.Item>

						<Row gutter={[16, 16]} align={'middle'}>
							<Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 24 }}>
								<Form.Item
									label='Start date'
									name='begins_at'
									rules={[{ required: true, message: 'Please add start date!' }]}
									initialValue={date(control?.begins_at)}
								>
									<DatePicker />
								</Form.Item>
							</Col>
							<Col lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 24 }}>
								<Form.Item
									label='Type'
									name='kind'
									rules={[{ required: true, message: 'KinTyped is required!' }]}
									initialValue={control?.kind || ControlType.POLICY}
								>
									<Radio.Group defaultValue={control?.kind}>
										<Radio name='kind' key={ControlType.POLICY} value={ControlType.POLICY}>
											{ControlType.POLICY}
										</Radio>
										<Radio name='kind' key={ControlType.PROCESS} value={ControlType.PROCESS}>
											{ControlType.PROCESS}
										</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item>
							<AlButton type='primary' htmlType='submit'>
								Submit
							</AlButton>
						</Form.Item>
					</Form>
				</Col>
				<Col
					xs={{ span: 24, offset: 1 }}
					sm={{ span: 24, offset: 1 }}
					md={{ span: 24, offset: 1 }}
					lg={{ span: 5, offset: 1 }}
					xl={{ span: 5, offset: 1 }}
				>
					{(control || requirementsToAttach) && (
						<ControlConnectedItems requirements={(control?.requirements || []).concat(requirementsToAttach)} />
					)}
				</Col>
			</Row>
		</>
	);
}
