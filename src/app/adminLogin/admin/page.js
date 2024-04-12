"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Rate, Space, Row, Col } from "antd";
import Sider from "antd/es/layout/Sider";
import API from "@/libs/API";

const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const getData = async () => {
    try {
      const result = await API.get("/api/movies");
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateData = async (recordId, newData) => {
    try {
      await API.put(`/api/movies/${recordId}`, newData);
      getData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async (recordId) => {
    try {
      await API.delete(`/api/movies/${recordId}`);
      getData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const values = await form.validateFields();
      values.vote_average *= 2; // คูณค่า vote_average ด้วย 2

      // console.log(id._id,"id",values,"values");
      await updateData(id._id, values);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

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
          <Button
            type="primary"
            onClick={() => {
              setSelectedRecord(record);
              setVisible(true);
            }}
          >
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
      <div>
        <Modal
          title="Edit Movie"
          visible={visible}
          onOk={e => { handleEdit(selectedRecord) }}
          onCancel={() => setVisible(false)}
        >
          <Form form={form} initialValues={selectedRecord}>
            <Form.Item
              label="Title"
              name="original_title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Overview"
              name="overview"
              rules={[
                { required: true, message: "Please input the overview!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Vote"
              name="vote_average"
              rules={[{ required: true, message: "Please input the vote!" }]}
            >
              <Rate defaultValue={selectedRecord ? selectedRecord.vote_average / 2 : 0} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
      <Button
        type="primary"
        style={{ width: "80px" }}
        href="/adminLogin/admin/add"
      >
        Add
      </Button>
    </div>
  );
};

export default Admin;
