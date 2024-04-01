"use client";
import { Form, Input, InputNumber } from "antd";
import React, { useState } from "react";

const AddMoviePage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleReleaseYearChange = (e) => {
    setReleaseYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the form submission
    console.log("Form submitted!");
  };

  const formcss = {
    height: "50%",
    border: "0px solid #000",
    width: "35%",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 1px 15px 0 #ffffff",
    backgroundColor: "whitesmoke",
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
        <Form style={{}} onSubmit={handleSubmit}>
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <br />
          <Form.Item
            label="Title"
            name="id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <br />
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <br />
        </Form>
      </div>
    </div>
  );
};

export default AddMoviePage;
