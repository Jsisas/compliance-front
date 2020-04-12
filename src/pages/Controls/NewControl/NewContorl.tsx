import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import produce from 'immer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserSearch } from '../../../components/AssigneeSearch/AssigneeSearch';
import { Control, ControlCategory, selectAllControls, createControl } from '../../../redux/Control/ControlSlice';
import { RootState } from '../../../redux/reducer';
import { Moment } from 'moment';

const { Title } = Typography;

export function NewControlPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const dispatch = useDispatch();

    function handleCreateNewControl(data: Control): void {
        data.isoStartDate = (data.isoStartDate as unknown as Moment).toISOString()
        data.id = getControlId();
        console.log(data);
        dispatch(createControl(data));
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
                <Col xs={2} xl={{ span: 8, offset: 1 }} >
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
                            <Col xs={2} xl={{ span: 8 }} >
                                <Form.Item
                                    label="Start date"
                                    name="isoStartDate"
                                    rules={[{ required: true, message: 'Please add start date!' }]}
                                >
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            <Col xs={2} xl={{ span: 12 }} >
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