import * as React from 'react';
import {useState} from 'react';
import {Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Typography} from 'antd';
import styles from './addTaskModal.module.scss';
import modalStyles from '../modal.module.scss';
import {Control} from '../../../redux/Control/ControlSlice';
import {CloseOutlined} from "@ant-design/icons/lib";
import TextArea from "antd/lib/input/TextArea";
import {UserSearch} from "../../AssigneeSearch/AssigneeSearch";
import AlButton from "../../_ui/AlButton/AlButton";
import {
    createTask,
    Month,
    Quarter,
    Task,
    TaskFrequencyType,
    TaskFrequencyTypeRecurrence,
    TaskType,
    Weekday
} from "../../../redux/Task/TaskSlice";
import {useDispatch} from "react-redux";
import {notifySucess} from "../../../util/NotificationUtil";

const {Title, Text} = Typography
const {Option} = Select;

interface AddTaskProps {
    control?: Control;
    isVisible?: boolean;
    onCancel?: any;
}

export function AddTaskModule(props: AddTaskProps) {
    const dispatch = useDispatch();
    const [taskFrequency, setTaskFrequency] = useState(TaskFrequencyType.ONE_TIME);
    const [taskRecurrence, setTaskRecurrence] = useState(TaskFrequencyTypeRecurrence.WEEKLY);

    function handleCreateNewTask(data: Task): void {
        data.control = props.control || {} as Control;
        dispatch(createTask(data));
        notifySucess("Add task", "Adding a task was successful");
        props.onCancel();
    }

    const onFinish = (values: any) => handleCreateNewTask(values);

    return (
        <>
            <Modal
                className={modalStyles.modalTop}
                width={540}
                visible={props.isVisible}
                maskClosable={true}
                onCancel={props.onCancel}
                footer={null}
                closeIcon={<CloseOutlined className={styles.modalCloseButton}/>}
                bodyStyle={{padding: 0}}
            >
                <div style={{padding: "12px 14px"}}>
                    <Title style={{margin: 0}}>Add task</Title>
                    {props.control != null &&
                        <Text type="secondary">to {props.control.title}</Text>
                    }
                </div>
                <div className={styles.addTaskModalContent}>
                    <Row gutter={[16, 16]} align={"middle"}>
                        <Col xs={{span: 24}} className={styles.inputFullWidth}>
                            <Form layout="vertical" onFinish={onFinish}>
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[
                                        {required: true, message: "Please input control title"},
                                    ]}
                                >
                                    <Input placeholder="Add title to the task"/>
                                </Form.Item>
                                <Form.Item label="Type" name="type">
                                    <Radio.Group defaultValue={TaskType.MAINTENANCE}>
                                        <Radio key={TaskType.MAINTENANCE} value={TaskType.MAINTENANCE}>
                                            {TaskType.MAINTENANCE}
                                        </Radio>
                                        <Radio key={TaskType.AUDIT} value={TaskType.AUDIT}>
                                            {TaskType.AUDIT}
                                        </Radio>
                                        <Radio key={TaskType.REVIEW} value={TaskType.REVIEW}>
                                            {TaskType.REVIEW}
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input task description!",
                                        },
                                    ]}
                                >
                                    <TextArea placeholder="Add description to the task"/>
                                </Form.Item>
                                <Form.Item
                                    label="Add assignee"
                                    name="assignee">
                                    <UserSearch placeholder="Add assignees"/>
                                </Form.Item>
                                <Form.Item name="duration" label="Duration">
                                    <Select placeholder="Select task duration" defaultValue={15}>
                                        <Option value={15}>15 minutes</Option>
                                        <Option value={30}>30 minutes</Option>
                                        <Option value={60}>1 hour</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="frequency" label="Frequency">
                                    <Select placeholder="Select task frequency" defaultValue={taskFrequency}
                                            onSelect={(value) => setTaskFrequency(value)}>
                                        <Option value={TaskFrequencyType.ONE_TIME}>{TaskFrequencyType.ONE_TIME}</Option>
                                        <Option
                                            value={TaskFrequencyType.RECURRING}>{TaskFrequencyType.RECURRING}</Option>
                                    </Select>
                                </Form.Item>
                                {taskFrequency === TaskFrequencyType.RECURRING &&
                                <Form.Item name="recurrence" label="Recurrence">
                                    <Select placeholder="Select task recurrence" defaultValue={taskRecurrence}
                                            onSelect={(value) => setTaskRecurrence(value)}>
                                        <Option
                                            value={TaskFrequencyTypeRecurrence.WEEKLY}>{TaskFrequencyTypeRecurrence.WEEKLY}</Option>
                                        <Option
                                            value={TaskFrequencyTypeRecurrence.MONTHLY}>{TaskFrequencyTypeRecurrence.MONTHLY}</Option>
                                        <Option
                                            value={TaskFrequencyTypeRecurrence.QUARTERLY}>{TaskFrequencyTypeRecurrence.QUARTERLY}</Option>
                                        <Option
                                            value={TaskFrequencyTypeRecurrence.ANNUAL}>{TaskFrequencyTypeRecurrence.ANNUAL}</Option>
                                    </Select>
                                </Form.Item>
                                }
                                {((taskRecurrence === TaskFrequencyTypeRecurrence.WEEKLY && taskFrequency === TaskFrequencyType.RECURRING) || (taskRecurrence === TaskFrequencyTypeRecurrence.MONTHLY && taskFrequency === TaskFrequencyType.RECURRING)) &&
                                <Form.Item name="weekDay" label="Weekday">
                                    <Select placeholder="Select task recurrence" defaultValue={Weekday.MONDAY}>
                                        <Option value={Weekday.MONDAY}>Monday</Option>
                                        <Option value={Weekday.TUESDAY}>Tuesday</Option>
                                        <Option value={Weekday.WEDNESDAY}>Wednesday</Option>
                                        <Option value={Weekday.THURSDAY}>Thursday</Option>
                                        <Option value={Weekday.FRIDAY}>Friday</Option>
                                        <Option value={Weekday.SATURDAY}>Saturday</Option>
                                        <Option value={Weekday.SUNDAY}>Sunday</Option>
                                    </Select>
                                </Form.Item>
                                }
                                {(taskRecurrence === TaskFrequencyTypeRecurrence.MONTHLY && taskFrequency === TaskFrequencyType.RECURRING) &&
                                <Form.Item name="week" label="Week">
                                    <Select placeholder="Select week number" defaultValue={Quarter.FIRST}>
                                        <Option value={Quarter.FIRST}>First</Option>
                                        <Option value={Quarter.SECOND}>Second</Option>
                                        <Option value={Quarter.THIRD}>Third</Option>
                                        <Option value={Quarter.FOURTH}>Fourth</Option>
                                    </Select>
                                </Form.Item>
                                }
                                {(taskRecurrence === TaskFrequencyTypeRecurrence.QUARTERLY && taskFrequency === TaskFrequencyType.RECURRING) &&
                                <Form.Item name="quarter" label="Quarter">
                                    <Select placeholder="Select task recurrence" defaultValue={Quarter.FIRST}>
                                        <Option value={Quarter.FIRST}>First</Option>
                                        <Option value={Quarter.SECOND}>Second</Option>
                                        <Option value={Quarter.THIRD}>Third</Option>
                                        <Option value={Quarter.FOURTH}>Fourth</Option>
                                    </Select>
                                </Form.Item>
                                }
                                {(taskRecurrence === TaskFrequencyTypeRecurrence.ANNUAL && taskFrequency === TaskFrequencyType.RECURRING) &&
                                <Form.Item name="annual" label="Annual">
                                    <Select placeholder="Select task recurrence" defaultValue={Month.JANUARY}>
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
                                }
                                <Form.Item
                                    label="Due date"
                                    name="due_at"
                                    rules={[
                                        {required: true, message: "Please add due date!"},
                                    ]}
                                >
                                    <DatePicker/>
                                </Form.Item>
                                <AlButton type="primary" style={{marginRight: "8px"}} htmlType="submit">Add
                                    task</AlButton>
                                <AlButton type="secondary" onClick={props.onCancel}>Cancel</AlButton>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
}
