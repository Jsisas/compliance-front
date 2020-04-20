import * as React from 'react';
import {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import {selectControlById} from "../../../redux/Control/ControlSlice";
import {fetchAllControls} from "../../../redux/Control/ControlService";
import {Col, Row} from "antd";
import {LeftOutlined} from "@ant-design/icons/lib";
import {AlText} from "../../../components/_ui/AlText/AlText";
import {AlTitle} from "../../../components/_ui/AlTitle/AlTitle";

export function ControlsDetails() {
    let {id} = useParams<{ id: string }>();
    const control = useSelector((state: RootState) => selectControlById(state, id));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllControls());
    }, [dispatch]);

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <Link to="/regulations">
                        <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
                    </Link>
                </Col>
                <Col xs={8} xl={8}>
                    <AlTitle style={{marginBottom: 0}}>{control?.title}</AlTitle>
                </Col>
            </Row>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={{span: 16, offset: 1}} sm={{span: 16, offset: 1}} md={{span: 16, offset: 1}} lg={{span: 16, offset: 1}} xl={{span: 16, offset: 1}}>
                    <AlText type={"secondary"}>{control?.description || "When an employee leaves the company, their authorizations are revoked in the company’s access provisioning software on the last day of their employment contract."}</AlText>
                </Col>
            </Row>
        </>
    );
};