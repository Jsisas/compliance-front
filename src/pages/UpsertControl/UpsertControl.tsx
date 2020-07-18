import { Col, DatePicker, Form, Radio, Row, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import TextArea from 'antd/lib/input/TextArea';
import * as H from 'history';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { AlBackArrow } from '../../components/_ui/AlBackArrow/AlBackArrow';
import AlButton from '../../components/_ui/AlButton/AlButton';
import { UserSearch } from '../../components/AssigneeSearch/AssigneeSearch';
import { ControlConnectedItems } from '../../components/ControlConnectedItems/ControlConnectedItems';
import { fetchControlById, upsertControl } from '../../redux/Control/ControlService';
import { Control, ControlType, selectControlById } from '../../redux/Control/ControlSlice';
import { RootState } from '../../redux/reducer';
import { date } from '../../util/DateUtil';
import { notifySuccess } from '../../util/NotificationUtil';

const { Title } = Typography;

interface NewControlProps {
	history: H.History;
}

export function UpsertControlPage(props: NewControlProps): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const dispatch = useDispatch();
	const routeHistory = useHistory();
	const control = useSelector((state: RootState) => selectControlById(state, id));

	useEffect(() => {
		if (id) {
			dispatch(fetchControlById(id));
		}
	}, [dispatch, id]);

	function onFinish(data: Store): void {
		dispatch(upsertControl(data as Control));
		notifySuccess('Add Control', 'Adding a control was successful!');
		routeHistory.goBack();
	}

	return (
		<>
			<Row gutter={[16, 16]} align={'middle'}>
				<Col xs={2} xl={1}>
					<AlBackArrow history={props.history} />
				</Col>
				<Col xs={20} xl={20}>
					<Title style={{ marginBottom: 0 }}>{control ? 'Edit control' : 'Add new control'}</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align={'top'} justify={'space-between'}>
				<Col xs={2} xl={{ span: 10, offset: 1 }}>
					<Form layout='vertical' onFinish={onFinish} initialValues={control}>
						<Form.Item
							name='title'
							rules={[
								{
									required: true,
									message: 'Please input control title!',
								},
							]}
						>
							<TextArea value={control?.title} placeholder='Add title' />
						</Form.Item>

						<Form.Item
							name='description'
							rules={[
								{
									required: true,
									message: 'Please input control description!',
								},
							]}
						>
							<TextArea value={control?.description} placeholder='Add description' />
						</Form.Item>
						<Form.Item label='Add assignee' name='assignee'>
							<UserSearch selectedUser={control?.assignee} placeholder='Add assignees' />
						</Form.Item>

						<Row gutter={[16, 16]} align={'middle'}>
							<Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 24 }}>
								<Form.Item
									label='Start date'
									name='begins_at'
									rules={[{ required: true, message: 'Please add start date!' }]}
								>
									<DatePicker defaultValue={date(control?.begins_at)} />
								</Form.Item>
							</Col>
							<Col lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 24 }}>
								<Form.Item label='Type' name='kind' rules={[{ required: true, message: 'KinTyped is required!' }]}>
									<Radio.Group value={control?.kind}>
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
					{control && <ControlConnectedItems requirements={control.requirements} />}
				</Col>
			</Row>
		</>
	);
}
