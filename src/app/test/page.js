"use client";
import API from "@/libs/API";
import { Rate, Table } from "antd";
import { useEffect, useState } from "react";
const App = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const result = await API.get("/api/movies");
    setData(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
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
          <Rate disabled defaultValue={vote_average} />
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Test</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default App;
