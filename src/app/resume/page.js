"use client";
import { React, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space, Table } from "antd";
import { navigate } from "../home/actions";
import API from "@/libs/API";
import { redirect } from "next/dist/server/api-utils";

const App = () => {
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };
  const [editingRecord, setEditingRecord] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);

    API.post("/api/exam", {
      // _id: values._id,
      facebookName: values.facebookName,
      role: values.role,
      credit: values.credit,
    })
      .then((res) => {
        getData();
      })
      .catch((e) => {
        console.log(e.massage);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [data, setData] = useState([]);

  const getData = async () => {
    const result = await API.get("/api/exam");
    setData(result.data);
  };

  const deleteData = async (recordId) => {
    await API.delete(`/api/exam/${recordId}`);
  };

  const updateData = async (record) => {
    const editedValues = await form.validateFields();

    await API.put(`/api/exam/${record._id}`, {
      // _id: record._id,
      facebookName: editedValues.facebookName,
      role: editedValues.role,
      credit: editedValues.credit,
    });

    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Facebook",
      dataIndex: "facebookName",
      key: "facebookName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit, row) => <>${credit}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (action, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateData(record)}>
            update
          </Button>
          <Button type="primary" onClick={() => deleteData(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* <Form.Item
          label="ID"
          name="_id"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          label="Facebook"
          name="facebookName"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Credit"
          name="credit"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              resetForm();
            }}
          >
            reset
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default App;
