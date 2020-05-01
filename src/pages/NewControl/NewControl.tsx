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
import {ControlForm} from "../../components/ControlForm/ControlForm";

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

        if (selectedRequirements.length > 0) {
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
            <ControlForm onFinish={handleCreateNewControl}/>
        </>
    );
}
