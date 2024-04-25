"use client";
import React, { useEffect, useState } from "react";
import CardImage from "@/components/CardImage";
import API from "@/libs/API";
import { useSearchParams } from "next/navigation";
import Sider from "antd/es/layout/Sider";
import { Col, Menu, Pagination, Row } from "antd";
import SliderShow from "@/components/SliderShow";

const App = () => {
  const [data, setData] = useState([]);

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const searchValue = search;
  const searchData = async () => {
    if (!searchValue) {
      setData([]);
      return;
    }
    const result = await searchApi(searchValue);
    setData(result.data);
    console.log("result", result.data);
  };

  const searchApi = async () => {
    const result = await API.get("/api/movies", {
      params: {
        search: searchValue,
      },
    });
    return result;
  };
  useEffect(() => {
    searchData();
    searchApi();
  }, []);

  const siderStyle = {
    textAlign: "center",
    color: "black",
    backgroundColor: "",
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <main style={{ justifyContent: "space-between" }}>
        <SliderShow style={{ justify: "center" }} />
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
            <Row
              justify="start"
              gutter={[16, 16]}
              style={{ flexWrap: "wrap", width: "100%", padding: "20px" }}
            >
              {data.map((movie, index) => (
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
                  {/* <Pagination
                    current={currentPage}
                    total={filteredData.length}
                    pageSize={pageSize}
                    onChange={paginate}
                  /> */}
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
                  {/* <Menu style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                    {data1.map((item) => (
                      <Menu.Item
                        key={item.id}
                        onClick={() => handleCategorySelect(item.id)}
                      >
                        {item.name}
                      </Menu.Item>
                    ))}
                  </Menu> */}
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
