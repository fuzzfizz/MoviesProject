"use client";
import React from "react";
import { Table, Button } from "antd";
import { Form, Input } from "antd";

const AdminLogin = () => {
  const maincss = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  };
  const formcss = {
    height: "50%",
    border: "0px solid #000",
    width: "35%",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 1px 15px 0 #ffffff",
  };

  const onFinish = (values) => {
    // Perform login logic here
    console.log(values);
  };

  return (
    <main style={maincss}>
      <Form onFinish={onFinish} style={formcss}>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px #000000",
          }}
        >
          Admin Login
        </h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" href="/home" style={{ marginRight: "1rem" }}>
            Back to Home
          </Button>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default AdminLogin;
