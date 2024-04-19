"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Menu, Pagination } from "antd";
import Sider from "antd/es/layout/Sider";

import CardImage from "@/components/CardImage";
import API from "@/libs/API";

const App = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getData = async () => {
    const result = await API.get("/api/movies");
    setData(result.data);
    setFilteredData(result.data); // เริ่มต้นด้วยการแสดงหนังทั้งหมด
  };

  const getTag = async () => {
    const result = await API.get("/api/Genres");
    setData1(result.data);
  };

  useEffect(() => {
    getTag();
    getData();
  }, []);

  // ฟังก์ชันที่ใช้ในการกรองหนังตามหมวดหมู่ที่เลือก
  const handleCategorySelect = (categoryId) => {
    if (categoryId === selectedCategory) {
      // ถ้าหมวดหมู่ที่เลือกซ้ำกับที่เลือกก่อนหน้า ให้แสดงหนังทั้งหมด
      setFilteredData(data);
      setSelectedCategory(null);
    } else {
      // กรองหนังตามหมวดหมู่ที่เลือก
      const filteredMovies = data.filter((movie) =>
        movie.genre_ids.includes(categoryId)
      );
      setFilteredData(filteredMovies);
      setSelectedCategory(categoryId);
    }
  };

  const siderStyle = {
    textAlign: "center",
    color: "black",
    backgroundColor: "",
  };

  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <main
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Row
          justify="start"
          gutter={[16, 16]}
          style={{ flexWrap: "wrap", width: "75%" }}
        >
          {filteredData.map((movie, index) => (
            <Col span={6} key={index}>
              <CardImage
                title={movie.title}
                Image={movie.poster_path}
                linkUrl={movie.id}
                rate={movie.vote_average / 2}
              />
            </Col>
          ))}
        </Row>
        <Sider width="25%" style={siderStyle}>
          <Row>
            <Col span={4}>
              <h2>Category:</h2>
            </Col>
            <Col span={20}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <Menu style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                {data1.map((item) => (
                  <Menu.Item
                    key={item.id}
                    onClick={() => handleCategorySelect(item.id)}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              </Menu>
            </Col>
          </Row>
        </Sider>
      </main>
      <div className="">
        <Pagination defaultCurrent={1} total={10}/>
      </div>
    </div>
  );
};

export default App;
