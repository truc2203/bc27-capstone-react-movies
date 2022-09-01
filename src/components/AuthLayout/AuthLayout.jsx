import React from "react";
import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Row>
      <Col span={14}>
        <h1>Background Image</h1>
      </Col>
      <Col span={8}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;
