import * as React from 'react';
import { useEffect } from 'react';
import { Col, DatePicker, Form, Radio, Row } from 'antd';
import { UserSearch } from '../AssigneeSearch/AssigneeSearch';
import { Control, ControlType, selectControlById } from '../../redux/Control/ControlSlice';
import AlButton from '../_ui/AlButton/AlButton';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducer';
import { fetchControlById, updateControl } from '../../redux/Control/ControlService';
import { date } from '../../util/DateUtil';
import { Store } from 'antd/lib/form/interface';

interface Props {
	onFinish: (control: Control) => void;
}

export function ControlForm(props: Props): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const control = useSelector((state: RootState) => selectControlById(state, id));

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchControlById(id));
	}, [dispatch, id]);

	const onFinish = (values: Store) => {
		values.id = id;
		dispatch(updateControl(values as Control));
		props.onFinish(values as Control);
	};

	return (
		<>
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
							{console.log(control)}
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
		</>
	);
}
