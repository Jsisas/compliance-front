import * as React from 'react';
import {Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Typography} from 'antd';
import styles from './addTaskModal.module.scss';
import {Control} from '../../../redux/Control/ControlSlice';
import {CloseOutlined} from "@ant-design/icons/lib";
import TextArea from "antd/lib/input/TextArea";
import {UserSearch} from "../../AssigneeSearch/AssigneeSearch";
import AlButton from "../../_ui/AlButton/AlButton";
import {createTask, Task, TaskType} from "../../../redux/Task/TaskSlice";
import {useDispatch} from "react-redux";
import {Moment} from "moment";
import {notifySucess} from "../../../util/NotificationUtil";
import {v4} from "uuid";

const {Title, Text} = Typography
const {Option} = Select;

interface AddTaskProps {
    control: Control;
    isVisible?: boolean;
    onCancel?: any;
}

export function AddTaskModule(props: AddTaskProps) {
    const dispatch = useDispatch();

    function handleCreateNewControl(data: Task): void {
        data.id = v4()
        data.due_at = ((data.due_at as any) as Moment).toDate();
        data.control = props.control;
        dispatch(createTask(data));
        notifySucess("Add task", "Adding a task was successful");
        props.onCancel();
    }

    const onFinish = (values: any) => handleCreateNewControl(values);

    return (
        <>
            <Modal
                width={540}
                visible={props.isVisible}
                maskClosable={true}
                onCancel={props.onCancel}
                footer={null}
                wrapClassName={styles.modalBody}
                closeIcon={<CloseOutlined className={styles.modalCloseButton}/>}
                bodyStyle={{padding: 0}}
            >
                <div style={{padding: "12px 14px"}}>
                    <Title style={{margin: 0}}>Add task</Title>
                    <Text type="secondary">to {props.control?.title}</Text>
                </div>
                <div className={styles.addTaskModalContent}>
                    <Row gutter={[16, 16]} align={"middle"}>
                        <Col xs={{span: 24}}>
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
                                <Form.Item
                                    label="Type"
                                    name="type"
                                    rules={[
                                        {required: true, message: "Please choose task type"},
                                    ]}
                                >
                                    <Radio.Group>
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
                                    name="assignee"
                                    rules={[
                                        {required: true, message: "Please add atleast one assignee"},
                                    ]}>
                                    <UserSearch placeholder="Add assignees"/>
                                </Form.Item>
                                <Form.Item
                                    name="duration"
                                    label="Duration"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select task duration",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select task duration">
                                        <Option value="30">30 minutes</Option>
                                        <Option value="60">1 hour</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="frequency"
                                    label="Frequency"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select task frequency",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select task frequency">
                                        <Option value="0">One-time task</Option>
                                        <Option value="1">Reccuring task</Option>
                                    </Select>
                                </Form.Item>
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
};