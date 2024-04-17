"use client";
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import API from "@/libs/API";

const AddMoviePage = () => {
  const formcss = {
    height: "65%",
    border: "0px solid #000",
    width: "35%",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 1px 15px 0 #ffffff",
    backgroundColor: "whitesmoke",
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await API.post("/api/movies", values);
      form.resetFields(); // เคลียร์ฟอร์มหลังจากส่งข้อมูลสำเร็จ
      setLoading(false);
      console.log("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie:", error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={formcss}>
        <h1>Add Movie</h1>
        <Form form={form} onFinish={handleSubmit}>
        <Form.Item
            label="id"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="original_title"
            name="original_title"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Overview"
            name="overview"
            rules={[
              {
                required: true,
                message: "Please input the overview!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Release Date"
            name="release_date"
            rules={[
              {
                required: true,
                message: "Please input the release date!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="vote"
            name="vote_average"
            rules={[
              {
                required: true,
                message: "Please input the popularity!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Poster Path"
            name="poster_path"
            rules={[
              {
                required: true,
                message: "Please input the poster path!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Movie
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddMoviePage;
