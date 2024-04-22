"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Rate,
  Space,
  Row,
  Col,
  Select,
} from "antd";
import API from "@/libs/API";

const { Option } = Select;

const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [genres, setGenres] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmVisible2, setConfirmVisible2] = useState(false);

  const getData = async () => {
    try {
      const result = await API.get("/api/movies");
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getGenres = async () => {
    try {
      const result = await API.get("/api/Genres");
      setGenres(result.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const updateData = async (recordId, newData) => {
    try {
      const genreIdsArray = newData.genres.map((genreId) =>
        parseInt(genreId, 10)
      );

      const payload = { ...newData, genre_ids: genreIdsArray };

      await API.put(`/api/movies/${recordId}`, payload);

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
    getGenres();
  }, []);

  const handleEdit = async (id) => {
    try {
      const values = await form.validateFields();
      values.vote_average *= 2;

      await updateData(id._id, values);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) { 
        const selectedIds = selectedRows.map((row) => row._id);
        await Promise.all(selectedIds.map(async (id) => await deleteData(id)));
        setSelectedRows([]); 
        getData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  
  
  const handleConfirmDelete = () => {
    console.log("handleConfirmDelete");
    setConfirmVisible2(true);
  };

  const handleConfirmCancel = () => {
    setConfirmVisible2(false);
  };

  const handleConfirmOk = async () => {
    console.log("handleDelete");
    try {
      await handleDelete();
      setConfirmVisible2(false);
    } catch (error) {
      console.error();
    }
  };

  const handleRowSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows); // เปลี่ยนการตั้งค่า selectedRows ให้เท่ากับ selectedRows ที่ได้รับจากพารามิเตอร์
  };
  
  const duplicateMovie = async (recordId) => {
    try {
      const movieToDuplicate = await API.get(`/api/movies/${recordId}`);
      const duplicatedMovieData = {
        adult: movieToDuplicate.data.adult,
        backdrop_path: movieToDuplicate.data.backdrop_path,
        genres: movieToDuplicate.data.genres,
        id: movieToDuplicate.data.id,
        original_language: movieToDuplicate.data.original_language,
        original_title: movieToDuplicate.data.original_title,
        overview: movieToDuplicate.data.overview,
        popularity: movieToDuplicate.data.popularity,
        poster_path: movieToDuplicate.data.poster_path,
        release_date: movieToDuplicate.data.release_date,
        title: movieToDuplicate.data.title,
        video: movieToDuplicate.data.video,
        vote_average: movieToDuplicate.data.vote_average,
        vote_count: movieToDuplicate.data.vote_count,
      };

      await API.post("/api/movies", duplicatedMovieData);
      getData();
    } catch (error) {
      console.error();
    }
  };

  const handleDuplicate = async (recordId) => {
    try {
      await duplicateMovie(recordId);
      setSelectedRows({}); // Clear selected rows after duplication
    } catch (error) {
      console.error();
    }
  };

  const handleConfirmDuplicate = (recordId) => {
    setConfirmVisible(true);
    setSelectedRecord(recordId);
  };
  

  const handleConfirmDuplicateOk = async () => {
    console.log("handleConfirmDuplicateOk");
    try {
      await handleDuplicate(selectedRecord);
      setConfirmVisible(false);
    } catch (error) {
      console.error();
    }
  };

  const deleteButtonDisabled = Object.keys(selectedRows).length === 0;

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
      title: "Date",
      dataIndex: "release_date",
      key: "release_date",
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
              setSelectedRows([record]);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => handleConfirmDuplicate(record.id)}
          >
            Duplicate
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
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}
      >
        <Button
          type="primary"
          style={{ width: "80px" }}
          href="/adminLogin/admin/add"
        >
          Add
        </Button>
        <Button
          type="primary"
          onClick={handleConfirmDelete}
          disabled={deleteButtonDisabled}
          style={{ marginLeft: "1rem" }}
        >
          Delete
        </Button>
      </div>
      <div>
        <Modal
          title="Confirm Delete"
          open={confirmVisible2} 
          onOk={handleConfirmOk}
          onCancel={handleConfirmCancel}
        >
          <p>Are you sure you want to delete selected movies?</p>
        </Modal>
      </div>
      <div>
        <Modal
          title="Edit Movie"
          open={visible}
          onOk={(e) => {
            handleEdit(selectedRecord);
          }}
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
              label="poster_path"
              name="poster_path"
              rules={[
                { required: true, message: "Please input the poster_path!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Vote"
              name="vote_average"
              rules={[{ required: true, message: "Please input the vote!" }]}
            >
              <Rate
                defaultValue={
                  selectedRecord ? selectedRecord.vote_average / 2 : 0
                }
              />
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
                defaultValue={selectedRecord ? selectedRecord.genre_ids : []}
              >
                {genres.map((genre) => (
                  <Option key={genre.id} value={genre.id}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Modal
          title="Confirm Duplicate"
          open={confirmVisible}
          onOk={handleConfirmDuplicateOk}
          onCancel={handleConfirmCancel}
        >
          <p>Are you sure you want to duplicate selected movies?</p>
        </Modal>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: handleRowSelectionChange,
        }}
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={{
          style: {
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Sans-Serif",
            textAlign: "center",
            margin: "auto",
            marginBottom: "10px",
            borderRadius: "0 0 10px 10px",
          },
        }}
      />
    </div>
  );
};

export default Admin;
