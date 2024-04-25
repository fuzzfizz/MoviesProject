"use client";
import { Form, Input, Button, Select, message } from "antd";
import { useState, useEffect } from "react";
import API from "@/libs/API";

const { Option } = Select;

const AddMoviePage = () => {
  
  const formcss = {
    border: "0px solid #000",
    width: "35%",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 1px 15px 0 #ffffff",
    backgroundColor: "whitesmoke",
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const result = await API.get("/api/Genres");
      setGenres(result.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const genreIdsArray = values.genres.map(genreId => parseInt(genreId, 10));
      const payload = { ...values, genre_ids: genreIdsArray };

      await API.post("/api/movies", payload);  
      form.resetFields();
      setLoading(false);
      message.success('Added movie successfully!');
    } catch (error) {
      console.error("Error adding movie:", error);
      setLoading(false);
      message.error('Failed to add movie.');
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
        <h1 style={{ textAlign: 'center' }}>Add Movie</h1>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input number the ID!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Original_title"
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
            label="Vote"
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
          <Form.Item
            label="Genres"
            name="genres"
            rules={[
              {
                required: true,
                message: "Please select at least one genre!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select genres"
              style={{ width: "100%" }}
            >
              {genres.map((genre) => (
                <Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Option>
              ))}
            </Select>
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
