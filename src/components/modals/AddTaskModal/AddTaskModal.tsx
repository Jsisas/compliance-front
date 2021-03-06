import { CloseOutlined } from '@ant-design/icons/lib';
import { Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Control } from '../../../redux/Control/ControlSlice';
import { upsertTask } from '../../../redux/Task/TaskService';
import {
	Month,
	Quarter,
	Task,
	TaskFrequencyType,
	TaskFrequencyTypeRecurrence,
	TaskType,
	Weekday,
} from '../../../redux/Task/TaskSlice';
import { notifySuccess } from '../../../util/NotificationUtil';
import StringUtil from '../../../util/StringUtil';
import AlButton from '../../_ui/AlButton/AlButton';
import modalStyles from '../modal.module.scss';
import styles from './addTaskModal.module.scss';
import { User } from '../../../redux/User/UserSlice';
import { UserSearchSingle } from '../../_ui/SearchSelect/Single/UserSearch/UserSearchSingle';
import ReactQuill from 'react-quill';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

interface AddTaskProps {
	control?: Control;
	isVisible?: boolean;
	onClose?: () => void;
}

export function AddTaskModule(props: AddTaskProps): JSX.Element {
	const dispatch = useDispatch();
	const [taskFrequency, setTaskFrequency] = useState<TaskFrequencyType>(TaskFrequencyType.ONE_TIME);
	const [taskRecurrence, setTaskRecurrence] = useState<TaskFrequencyTypeRecurrence>(TaskFrequencyTypeRecurrence.WEEKLY);
	const [selectedAssignee, setSelectedAssignee] = useState<User>();
	const [description, setDescription] = useState<string>('');

	function handleCreateNewTask(data: Task): void {
		data.control = props.control || ({} as Control);
		data.assignee = selectedAssignee || ({} as User);
		dispatch(upsertTask(data));
		notifySuccess('Add task', 'Adding a task was successful');

		if (props.onClose) {
			props.onClose();
		}
	}

	const onFinish = (values: Store) => {
		if (!values.kind) {
			values.kind = TaskType.MAINTENANCE;
		}
		handleCreateNewTask(values as Task);
	};

	const [form] = Form.useForm();
	React.useEffect(() => {
		form.setFieldsValue({
			description: description,
		});
	}, [description, form]);

	return (
		<>
			<Modal
				className={modalStyles.modalTop}
				width={540}
				visible={props.isVisible}
				maskClosable={true}
				onCancel={props.onClose}
				footer={null}
				closeIcon={<CloseOutlined className={styles.modalCloseButton} />}
				bodyStyle={{ padding: 0 }}
			>
				<div style={{ padding: '12px 14px' }}>
					<Title style={{ margin: 0 }}>Add task</Title>
					{props.control != null && <Text type='secondary'>to {props.control.title}</Text>}
				</div>
				<div className={styles.addTaskModalContent}>
					<Row gutter={[16, 16]} align={'middle'}>
						<Col xs={{ span: 24 }} className={styles.inputFullWidth}>
							<Form layout='vertical' onFinish={onFinish} form={form}>
								<Form.Item
									name='title'
									label='Title'
									rules={[{ required: true, message: 'Please input control title' }]}
								>
									<Input placeholder='Add title to the task' />
								</Form.Item>
								<Form.Item label='Type' name='kind' initialValue={TaskType.MAINTENANCE}>
									<Radio.Group>
										{Object.values(TaskType).map((type: TaskType) => {
											return (
												<Radio value={type} key={type}>
													{StringUtil.humanizeSnakeCase(type)}
												</Radio>
											);
										})}
									</Radio.Group>
								</Form.Item>
								<Form.Item
									name='description'
									label='Description'
									rules={[
										{
											required: true,
											message: 'Please input task description!',
										},
									]}
								>
									<ReactQuill
										theme='snow'
										value={''}
										onChange={(val) => setDescription(val)}
										style={{ backgroundColor: '#fff' }}
									/>
								</Form.Item>
								<Form.Item label='Add assignee' name='assignee'>
									<UserSearchSingle placeholder='Add assignees' onChange={(user: User) => setSelectedAssignee(user)} />
								</Form.Item>
								<Form.Item name='duration' label='Duration' initialValue={15}>
									<Select placeholder='Select task duration'>
										<Option value={15}>15 minutes</Option>
										<Option value={30}>30 minutes</Option>
										<Option value={60}>1 hour</Option>
									</Select>
								</Form.Item>
								<Form.Item name='frequency' label='Frequency' initialValue={taskFrequency}>
									<Select
										placeholder='Select task frequency'
										onSelect={(value) => setTaskFrequency(value as TaskFrequencyType)}
									>
										<Option value={TaskFrequencyType.ONE_TIME}>{TaskFrequencyType.ONE_TIME}</Option>
										<Option value={TaskFrequencyType.RECURRING}>{TaskFrequencyType.RECURRING}</Option>
									</Select>
								</Form.Item>
								{taskFrequency === TaskFrequencyType.RECURRING && (
									<Form.Item name='recurrence' label='Recurrence' initialValue={taskRecurrence}>
										<Select
											placeholder='Select task recurrence'
											onSelect={(value) => setTaskRecurrence(value as TaskFrequencyTypeRecurrence)}
										>
											<Option value={TaskFrequencyTypeRecurrence.WEEKLY}>{TaskFrequencyTypeRecurrence.WEEKLY}</Option>
											<Option value={TaskFrequencyTypeRecurrence.MONTHLY}>{TaskFrequencyTypeRecurrence.MONTHLY}</Option>
											<Option value={TaskFrequencyTypeRecurrence.QUARTERLY}>
												{TaskFrequencyTypeRecurrence.QUARTERLY}
											</Option>
											<Option value={TaskFrequencyTypeRecurrence.ANNUAL}>{TaskFrequencyTypeRecurrence.ANNUAL}</Option>
										</Select>
									</Form.Item>
								)}
								{((taskRecurrence === TaskFrequencyTypeRecurrence.WEEKLY &&
									taskFrequency === TaskFrequencyType.RECURRING) ||
									(taskRecurrence === TaskFrequencyTypeRecurrence.MONTHLY &&
										taskFrequency === TaskFrequencyType.RECURRING)) && (
									<Form.Item name='weekDay' label='Weekday' initialValue={Weekday.MONDAY}>
										<Select placeholder='Select task recurrence'>
											<Option value={Weekday.MONDAY}>Monday</Option>
											<Option value={Weekday.TUESDAY}>Tuesday</Option>
											<Option value={Weekday.WEDNESDAY}>Wednesday</Option>
											<Option value={Weekday.THURSDAY}>Thursday</Option>
											<Option value={Weekday.FRIDAY}>Friday</Option>
											<Option value={Weekday.SATURDAY}>Saturday</Option>
											<Option value={Weekday.SUNDAY}>Sunday</Option>
										</Select>
									</Form.Item>
								)}
								{taskRecurrence === TaskFrequencyTypeRecurrence.MONTHLY &&
									taskFrequency === TaskFrequencyType.RECURRING && (
										<Form.Item name='week' label='Week' initialValue={Quarter.FIRST}>
											<Select placeholder='Select week number'>
												<Option value={Quarter.FIRST}>First</Option>
												<Option value={Quarter.SECOND}>Second</Option>
												<Option value={Quarter.THIRD}>Third</Option>
												<Option value={Quarter.FOURTH}>Fourth</Option>
											</Select>
										</Form.Item>
									)}
								{taskRecurrence === TaskFrequencyTypeRecurrence.QUARTERLY &&
									taskFrequency === TaskFrequencyType.RECURRING && (
										<Form.Item name='quarter' label='Quarter' initialValue={Quarter.FIRST}>
											<Select placeholder='Select task recurrence'>
												<Option value={Quarter.FIRST}>First</Option>
												<Option value={Quarter.SECOND}>Second</Option>
												<Option value={Quarter.THIRD}>Third</Option>
												<Option value={Quarter.FOURTH}>Fourth</Option>
											</Select>
										</Form.Item>
									)}
								{taskRecurrence === TaskFrequencyTypeRecurrence.ANNUAL &&
									taskFrequency === TaskFrequencyType.RECURRING && (
										<Form.Item name='annual' label='Annual' initialValue={Month.JANUARY}>
											<Select placeholder='Select task recurrence'>
												<Option value={Month.JANUARY}>January</Option>
												<Option value={Month.FEBRUARY}>February</Option>
												<Option value={Month.MARCH}>March</Option>
												<Option value={Month.APRIL}>April</Option>
												<Option value={Month.MAY}>May</Option>
												<Option value={Month.JUNE}>June</Option>
												<Option value={Month.JULY}>July</Option>
												<Option value={Month.AUGUST}>August</Option>
												<Option value={Month.SEPTEMBER}>September</Option>
												<Option value={Month.OCTOBER}>October</Option>
												<Option value={Month.DECEMBER}>December</Option>
											</Select>
										</Form.Item>
									)}
								<Form.Item
									label='Due date'
									name='due_at'
									rules={[{ required: true, message: 'Please add due date!' }]}
									initialValue={moment()}
								>
									<DatePicker />
								</Form.Item>
								<AlButton type='primary' style={{ marginRight: '8px' }} htmlType='submit'>
									Add task
								</AlButton>
								<AlButton type='secondary' onClick={props.onClose}>
									Cancel
								</AlButton>
							</Form>
						</Col>
					</Row>
				</div>
			</Modal>
		</>
	);
}
