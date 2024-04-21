"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Menu, Pagination } from "antd";
import Sider from "antd/es/layout/Sider";
import SliderShow from "@/components/SliderShow";
import CardImage from "@/components/CardImage";
import API from "@/libs/API";

const App = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // จำนวนรายการต่อหน้า

  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // เรียกให้แสดงข้อมูล
  const indexOfLastItem = filteredData * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
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
      const filteredMovies = data.slice(indexOfFirstItem, indexOfLastItem);
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

    <div style={{ backgroundColor: "white", }}>
      <main
        style={{
          // display: "flex",
          justifyContent: "space-between",
        }}
        >
        <SliderShow style={{justify: "center"}} />
          <Row
          justify="center"
        >
          <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
            
        <Row
          justify="start"
          gutter={[16, 16]}
          style={{ flexWrap: "wrap", width: "100%",padding:"20px" }}
          >
          {filteredData.map((movie, index) => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} key={index}>
              <CardImage
                title={movie.title}
                Image={movie.poster_path}
                linkUrl={movie.id}
                rate={movie.vote_average / 2}
                />
            </Col>
          ))}
              <Pagination
              current={filteredData}
              total={data.length}
              pageSize={itemsPerPage}
              onChange={handleCategorySelect}
              showQuickJumper
              style={{
                width: "100%",
                textAlign: "center",
                padding: "20px",
              }}
              position="top"
            />
        </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>

        <Sider width="100%" style={siderStyle}>
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
                </Col>
                </Row>
      </main>
    </div>
  );
};

export default App;