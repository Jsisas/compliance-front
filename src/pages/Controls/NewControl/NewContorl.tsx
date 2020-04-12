import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Moment } from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { UserSearch } from '../../../components/AssigneeSearch/AssigneeSearch';
import { Control, ControlCategory, createControl, selectAllControls } from '../../../redux/Control/ControlSlice';
import { RootState } from '../../../redux/reducer';
import { notifySucess } from '../../../util/NotificationUtil';

const { Title } = Typography;

export function NewControlPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const dispatch = useDispatch();
    const routeHistory = useHistory();

    function handleCreateNewControl(data: Control): void {
        data.startDate = (data.startDate as unknown as Moment).toISOString()
        data.id = getControlId();
        console.log(data);
        dispatch(createControl(data));
        notifySucess("Add Control", "Adding a control was successful!")
        routeHistory.push("/controls")
    }

    function getControlId(): number {
        let id = Math.max(...controls.map((o: Control) => o.id), 0) + 1;
        if (id < 1) {
            return 1;
        } else {
            return id;
        }
    }

    const onFinish = (values: any) => handleCreateNewControl(values);

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1} >
                    <Link to="/controls"><LeftOutlined style={{ fontSize: '24px', float: 'right' }} /></Link>
                </Col>
                <Col xs={20} xl={20}>
                    <Title style={{ marginBottom: 0 }}>Add Control</Title>
                </Col>
            </Row>

            <Row gutter={[16, 16]} align={"middle"}>
                <Col xl={{ span: 14, offset: 1 }} md={{ span: 18, offset: 1 }} sm={{ span: 24, offset: 1 }} xs={{ span: 24, offset: 1 }} >
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Please input control title!' }]}
                        >
                            <Input placeholder="Add title" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: 'Please input control description!' }]}
                        >
                            <TextArea placeholder="Add description" />
                        </Form.Item>
                        <Form.Item
                            label="Add assignee"
                            name="assignee"
                        >
                            <UserSearch placeholder="Add assignees" />
                        </Form.Item>


                        <Row gutter={[16, 16]} align={"middle"}>
                            <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 24 }} >
                                <Form.Item
                                    label="Start date"
                                    name="startDate"
                                    rules={[{ required: true, message: 'Please add start date!' }]}
                                >
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            <Col lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 24 }} >
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: 'Please add start date!' }]}
                                >
                                    <Radio.Group>
                                        {Object.keys(ControlCategory).filter(x => isNaN(Number(x))).map(category => {
                                            return <Radio key={category} value={category}>{category}</Radio>
                                        })}
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


        </>
    )
}