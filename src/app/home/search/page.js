"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, Col, Menu, Pagination, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import SliderShow from "@/components/SliderShow";
import CardImage from "@/components/CardImage";
import API from "@/libs/API";
import { Typography } from "antd";

const App = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 12;
  const searchParams = new useSearchParams();

  const search = searchParams.get("search");

  const searchValue = search;

  const handleCategorySelect = (categoryId) => {
    if (categoryId === selectedCategory) {
      setFilteredData(data);
      setSelectedCategory(null);
    } else {
      const filteredMovies = data.filter((movie) =>
        movie.genre_ids.includes(categoryId)
      );
      setFilteredData(filteredMovies);
      setSelectedCategory(categoryId);
    }
    setCurrentPage(1); // เมื่อเปลี่ยนหมวดหมู่ให้กลับไปที่หน้าแรก
  };

  const getTag = async () => {
    const result = await API.get("/api/Genres");
    setData1(result.data);
  };

  const searchData = async () => {
    if (!searchValue) {
      setData([]);
      return;
    }
    const result = await searchApi(searchValue);
    setData(result.data);
    setFilteredData(result.data);
    console.log("result", result.data);
  };

  const searchApi = async () => {
    const result = await API.get("/api/movies", {
      params: {
        search: String(searchValue), // Convert searchValue to a string
      },
    });
    return result;
  };

  useEffect(() => {
    getTag();
    searchApi();
    searchData();
  }, []);

  const { Title } = Typography;

  const siderStyle = {
    textAlign: "center",
    color: "black",
    backgroundColor: "",
  };

  // ตั้งค่าข้อมูลที่จะแสดงในหน้านั้นๆ
  const indexOfLastMovie = currentPage * pageSize;
  const indexOfFirstMovie = indexOfLastMovie - pageSize;
  const currentMovies = filteredData.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div style={{ backgroundColor: "white" }}>
      <main style={{ justifyContent: "space-between" }}>
        <SliderShow style={{ justify: "center" }} />
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
            <Card style={{ color: "black" }}>
              <Title>
                Search Result:{" "}
                <span style={{ color: "#003eb3" }}>{searchValue}</span>
              </Title>
            </Card>
            <Row
              justify="start"
              gutter={[16, 16]}
              style={{ flexWrap: "wrap", width: "100%", padding: "20px" }}
            >
              {currentMovies.map((movie, index) => (
                <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} key={index}>
                  <CardImage
                    title={movie.title}
                    Image={movie.poster_path}
                    linkUrl={movie.id}
                    rate={movie.vote_average / 2}
                  />
                </Col>
              ))}
              <Row justify="center" className="w-full">
                <Col>
                  <Pagination
                    current={currentPage}
                    total={filteredData.length}
                    pageSize={pageSize}
                    onChange={paginate}
                  />
                </Col>
              </Row>
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
