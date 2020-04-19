import {LeftOutlined} from "@ant-design/icons";
import {Col, DatePicker, Form, Input, Radio, Row, Typography} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {Moment} from "moment";
import React from "react";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import {UserSearch} from "../../../components/AssigneeSearch/AssigneeSearch";
import {Control, ControlCategory, createControl,} from "../../../redux/Control/ControlSlice";
import {notifySucess} from "../../../util/NotificationUtil";
import Button from "../../../components/_ui/Button/Button";

const {Title} = Typography;

export function NewControlPage() {
    const dispatch = useDispatch();
    const routeHistory = useHistory();

    function handleCreateNewControl(data: Control): void {
        data.startDate = ((data.startDate as unknown) as Moment).toISOString();
        dispatch(createControl(data));
        notifySucess("Add Control", "Adding a control was successful!");
        routeHistory.push("/controls");
    }

    const onFinish = (values: any) => handleCreateNewControl(values);

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <Link to="/controls">
                        <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
                    </Link>
                </Col>
                <Col xs={20} xl={20}>
                    <Title style={{marginBottom: 0}}>Add Control</Title>
                </Col>
            </Row>

            <Row gutter={[16, 16]} align={"middle"}>
                <Col
                    xl={{span: 8, offset: 1}}
                    md={{span: 18, offset: 1}}
                    sm={{span: 24, offset: 1}}
                    xs={{span: 24, offset: 1}}
                >
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="title"
                            rules={[
                                {required: true, message: "Please input control title!"},
                            ]}
                        >
                            <Input placeholder="Add title"/>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input control description!",
                                },
                            ]}
                        >
                            <TextArea placeholder="Add description"/>
                        </Form.Item>
                        <Form.Item label="Add assignee" name="assignee">
                            <UserSearch placeholder="Add assignees"/>
                        </Form.Item>

                        <Row gutter={[16, 16]} align={"middle"}>
                            <Col
                                lg={{span: 8}}
                                md={{span: 8}}
                                sm={{span: 8}}
                                xs={{span: 24}}
                            >
                                <Form.Item
                                    label="Start date"
                                    name="startDate"
                                    rules={[
                                        {required: true, message: "Please add start date!"},
                                    ]}
                                >
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col
                                lg={{span: 16}}
                                md={{span: 16}}
                                sm={{span: 16}}
                                xs={{span: 24}}
                            >
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        {required: true, message: "Please add start date!"},
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio key={ControlCategory.POLICY} value={ControlCategory.POLICY}>
                                            {ControlCategory.POLICY}
                                        </Radio>
                                        <Radio key={ControlCategory.PROCEDURE} value={ControlCategory.PROCEDURE}>
                                            {ControlCategory.PROCEDURE}
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
