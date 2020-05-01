import {Col, Row, Typography} from "antd";
import {Moment} from "moment";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {Control, selectControlById, updateControl} from "../../redux/Control/ControlSlice";
import {notifySucess} from "../../util/NotificationUtil";
import {RootState} from "../../redux/reducer";
import {AlBackArrow} from "../../components/_ui/AlBackArrow/AlBackArrow";
import {ControlForm} from "../../components/ControlForm/ControlForm";
import {fetchControlById} from "../../redux/Control/ControlService";

const {Title} = Typography;

interface NewControlProps {
    history: any;
}

export function EditControlPage(props: NewControlProps) {
    let {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const routeHistory = useHistory();
    const control = useSelector((state: RootState) => selectControlById(state, id));

    useEffect(() => {
        dispatch(fetchControlById(id));
    }, [dispatch]);


    function handleEditControl(data: Control): void {
        data.id = id;
        data.startDate = new Date(((data.startDate as any) as Moment).toISOString());
        dispatch(updateControl(data));
        notifySucess("Edit Control", "Editing a control was successful!");
        routeHistory.goBack();
    }

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={2} xl={1}>
                    <AlBackArrow history={props.history}/>
                </Col>
                <Col xs={20} xl={20}>
                    <Title style={{marginBottom: 0}}>Edit Control</Title>
                </Col>
            </Row>
            <ControlForm onFinish={handleEditControl} control={control}/>
        </>
    );
}
