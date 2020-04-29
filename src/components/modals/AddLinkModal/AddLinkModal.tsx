import * as React from 'react';
import {Col, Form, Input, Modal, Row} from 'antd';
import styles from './addLinkModal.module.scss';
import {CloseOutlined} from "@ant-design/icons/lib";
import AlButton from "../../_ui/AlButton/AlButton";

interface AddLinkProps {
    onAdd: any;
    isVisible?: boolean;
    onCancel?: any;
}
export interface AddLink {
    href: string;
}
export function AddLinkModal(props: AddLinkProps) {
    const onFinish = (data: any) => props.onAdd(data);

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
                <div className={styles.addTaskModalContent}>
                    <Row gutter={[16, 16]} align={"middle"}>
                        <Col xs={{span: 24}}>
                            <Form layout="vertical" onFinish={onFinish}>
                                <Form.Item
                                    name="href"
                                    label="Link"
                                    rules={[
                                        {required: true, message: "Please add link"},
                                    ]}
                                >
                                    <Input placeholder="Add link"/>
                                </Form.Item>
                                <AlButton type="primary" style={{marginRight: "8px"}} htmlType="submit">Add link</AlButton>
                                <AlButton type="secondary" onClick={props.onCancel}>Cancel</AlButton>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
};