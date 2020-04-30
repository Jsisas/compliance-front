import {Col, DatePicker, Form, Input, Radio, Row, Typography} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {Moment} from "moment";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {UserSearch} from "../../components/AssigneeSearch/AssigneeSearch";
import {Control, ControlCategory, createControl,} from "../../redux/Control/ControlSlice";
import {notifySucess} from "../../util/NotificationUtil";
import AlButton from "../../components/_ui/AlButton/AlButton";
import {RootState} from "../../redux/reducer";
import {selectAllTmpRequirements} from "../../redux/Requirement/TmpRequirementSlice/TmpRequirementSlice";
import {Requirement, updateRequirement} from "../../redux/Requirement/RequirementSlice";
import produce, {Draft} from "immer";
import {AlBackArrow} from "../../components/_ui/AlBackArrow/AlBackArrow";

const {Title} = Typography;

interface NewControlProps {
    history: any;
}
export function NewControlPage(props: NewControlProps) {
    const dispatch = useDispatch();
    const routeHistory = useHistory();
    const selectedRequirements = useSelector((state: RootState) => selectAllTmpRequirements(state));


    function handleCreateNewControl(data: Control): void {
        data.startDate = new Date(((data.startDate as any) as Moment).toISOString());
        dispatch(createControl(data));

        if(selectedRequirements.length > 0){
            selectedRequirements.forEach(requirement => {
                const updatedRequirement = produce(requirement, (draft: Draft<Requirement>) => {
                    draft.controls.push(data)
                })
                dispatch(updateRequirement(updatedRequirement))
            })
        }

        notifySucess("Add Control", "Adding a control was successful!");
        routeHistory.push("/controls");
    }

    const onFinish = (values: any) => handleCreateNewControl(values);

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <AlBackArrow history={props.history}/>
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
                            <AlButton type="primary" htmlType="submit">
                                Submit
                            </AlButton>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
