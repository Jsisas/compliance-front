import React from "react";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

export default function InsightsPage() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <Title>Insights Page</Title>
        </Col>
      </Row>
    </>
  );
}
