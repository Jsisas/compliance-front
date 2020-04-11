import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { Control, createControl, selectAllControls, ControlCategory } from '../../../redux/Control/ControlSlice';
import { useForm, Controller } from "react-hook-form";
import produce from 'immer';
import { Input, Checkbox, Radio, Typography, Row, Col, DatePicker, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export function NewControlPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const dispatch = useDispatch();
    const [newControl, setNewContorl] = useState<Control>({} as Control);

    const methods = useForm();
    const { handleSubmit, control, reset } = methods;
    const onSubmit = (data: any) => console.log(data);

    const handleCreateNewContorl = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        if (!newControl.title.length) return;

        const controlWithId = produce(newControl, (draft: Control) => {
            let id = Math.max(...controls.map((o: Control) => o.id), 0);
            if (id < 1) {
                id = 1;
            }
            draft.id = id;
        })

        setNewContorl(controlWithId);
        dispatch(createControl(newControl));
    };

    return (
        <>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={{ span: 1 }} lg={{ span: 1 }} >
                    <Link to="/controls"><LeftOutlined style={{ fontSize: '24px', float: 'right' }} /></Link>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                    <Title style={{ marginBottom: 0 }}>Controls Page</Title>
                </Col>
            </Row>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24 }} lg={{ span: 8, offset: 1 }}>
                        <Text type={"secondary"}>Title</Text>
                        <Controller
                            as={Input}
                            name="title"
                            control={control}
                            placeholder="Insert title"
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <Text type={"secondary"}>Description</Text>
                        <Controller
                            as={TextArea}
                            name="description"
                            control={control}
                            placeholder="Insert description"
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                        <Text type={"secondary"} style={{ display: 'block' }}>Start date</Text>
                        <Controller
                            as={DatePicker}
                            name="startDate"
                            control={control}
                            defaultValue={false}
                        />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                        <Text type={"secondary"} style={{ display: 'block' }}>Category</Text>
                        <Controller
                            as={Radio.Group}
                            name="category"
                            options={Object.keys(ControlCategory).filter(x => isNaN(Number(x)))}
                            control={control}
                            defaultValue={false}
                            onChange={([event]: any) => event.target.value}
                        />
                    </Col>
                </Row>

                <Button type={"primary"}>Submit</Button>
            </form>
        </>
    )
}