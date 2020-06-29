import * as React from 'react';
import {Col, DatePicker, Form, Input, Radio, Row} from "antd";
import {UserSearch} from "../AssigneeSearch/AssigneeSearch";
import {Control, ControlCategory} from "../../redux/Control/ControlSlice";
import AlButton from "../_ui/AlButton/AlButton";
import TextArea from "antd/lib/input/TextArea";

interface Props {
    onFinish: any;
    control?: Control;
}

export function ControlForm(props: Props) {

    const onFinish = (values: any) => props.onFinish(values as Control);

    return (
        <>
            <Form layout="vertical" onFinish={onFinish} initialValues={props.control}>
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
                    <AlButton type="primary" htmlType="submit">
                        Submit
                    </AlButton>
                </Form.Item>
            </Form>
        </>
    );
}