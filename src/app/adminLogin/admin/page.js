"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col, Menu, Flex, Rate, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import API from "@/libs/API";

const Admin = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const result = await API.get("/api/movies");
    setData(result.data);
    console.log(result.data);
  };
  const deleteData = async (recordId) => {
    await API.delete(`/api/movies/${recordId}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "original_title",
      key: "original_title",
    },

    {
      title: "Overview",
      dataIndex: "overview",
      key: "overview",
    },
    {
      title: "Vote",
      dataIndex: "vote_average",
      key: "vote_average",
      render: (vote_average, row) => (
        <>
          <Rate disabled defaultValue={vote_average / 2} />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (action, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateData(record)}>
            Edit
          </Button>
          <Button type="primary" onClick={() => deleteData(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ backgroundColor: "#001529", minHeight: "90vh" }}>
      <Row>
        <h1 style={{ color: "white", margin: "2rem" }}>Admin Panel</h1>
      </Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Sider
          style={{
            width: "15%",
            height: "50vh",
            // margin: "1.5rem",
            marginTop: "0",
            padding: "2rem",
            border: "0px solid #000",
            borderRadius: "10px",
            boxShadow: "0px 1px 15px 0 #ffffff",
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            {/* <Menu.Item key="1">Dashboard</Menu.Item>
            <Menu.Item key="2">AdminList</Menu.Item> */}
            <Menu.Item key="3">MoviesList</Menu.Item>
          </Menu>
        </Sider>
        <Row style={{ width: "85%", paddingLeft: "2rem" }}>
          <Col span={24}>
            <Table theme="dark" columns={columns} dataSource={data} />
          </Col>
          <Col span={20} />
          <Col span={4} style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Button
              type="primary"
              style={{ width: "80px" }}
              href="/adminLogin/admin/add"
            >
              Add
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Admin;
