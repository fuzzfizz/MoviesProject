"use client";
import React, { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Col, Flex, Input, Menu, Row, Segmented } from "antd";
import { navigate } from "./actions";
import { useRouter } from "next/navigation";
import API from "@/libs/API";
import "@/app/style/style.css";
import "../globals.css";
import { Typography } from "antd";
const { Title } = Typography;

import "../globals.css";
const RootLayout = ({ children }) => {
  const [manu1, setManu1] = useState(false);

  const manurespon = () => {
    setManu1(!manu1);
  };
  const { Search } = Input;
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async (e) => {
    const searchValue = e.target.value;
    if (!searchValue) {
      setSearchResults([]);
      return;
    }
    const result = await searchApi(searchValue);
    setSearchResults(result.data);
  };

  const searchApi = async (searchValue) => {
    const result = await API.get("/api/movies", {
      params: {
        search: searchValue,
      },
    });
    return result;
  };

  const pushSearch = (e) => {
    console.log("search:", e);
    window.location.href = `/home/search?${e}`;

    // navigate({ path: `/home/search?search=${e}` });
  };
  const fw = {
    fontWeight: "700",
  };

  const items = [
    {
      type: "item",
      label: "Home",
      key: "/home",
    },
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate({ path: e.key });
  };

  const onSearchClick = (id) => {
    setSearchResults([]);
    console.log("id", id);
    router.push(`/home/${id}`);
  };
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#001529",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <AntdRegistry>
          <header>
            <Row className="Nav">
              <Col xs={16} sm={10} md={10} lg={6} xl={6} xxl={6}>
                <Title
                  style={{
                    margin: "0 0 0 0px",
                    color: "white",
                  }}
                  level={2}
                >
                  Movies Website
                </Title>
              </Col>
              {/* แสดงเมนูรูปแบบหน้าจอมือถือ */}
              <Col xs={4} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className="md:hidden">
                  <button
                    id="menu-toggle"
                    className="text-white"
                    onClick={manurespon}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-10 h-6"
                    >
                      <path d="M4 6h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
              </Col>
              {/* แสดงเมนูรูปแบบหน้าจอคอม */}
              <Col xs={20} sm={12} md={12} lg={10} xl={10} xxl={10}>
                <div className="hidden space-x-10 md:flex">
                  <Col xs={20} sm={12} md={12} lg={10} xl={16} xxl={26}>
                    <Search
                      placeholder="input search text"
                      onChange={onSearch}
                      enterButton
                      className="relative"
                      onSearch={pushSearch}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <div>
                    {searchResults && searchResults.length > 0 && (
                      <div className="absolute flex w-full">
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "380px",
                            maxHeight: "300px",
                            height: "max-content",
                            overflowY: "scroll",
                            overflowX: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            position: "absolute",
                            color: "black",
                            zIndex: 99,
                            padding: "10px",
                            top: "32px",
                            left: "-460px",
                          }}
                          className="border-2 border-gray-300 rounded"
                        >
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              style={{
                                padding: "10px",
                                cursor: "pointer",
                              }}
                              className="hover:bg-gray-200"
                              onClick={() => onSearchClick(result.id)}
                            >
                              {result.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <Col xs={20} sm={12} md={12} lg={6} xl={6} xxl={6}>
                      <Button type="primary" href="/adminLogin">
                        Admin Login
                      </Button>
                    </Col>
                  </div>
                </div>
              </Col>
              {manu1 ? (
                <Row span={24} justify="right">
                  <div
                    className=" md:hidden"
                    style={{ marginTop: "1rem", width: "100%" }}
                  >
                    <Col span={24}>
                      <Search
                        placeholder="input search text"
                        onChange={onSearch}
                        enterButton
                        className="relative"
                        onSearch={pushSearch}
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col>
                      {searchResults && searchResults.length > 0 && (
                        <div className="absolute flex w-full">
                          <div
                            style={{
                              width: "100%",
                              maxWidth: "300px",
                              maxHeight: "300px",
                              height: "max-content",
                              overflowY: "scroll",
                              overflowX: "hidden",
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: "white",
                              position: "absolute",
                              color: "black",
                              zIndex: 99,
                              padding: "10px",
                              top: "0px",
                              left: "0px",
                            }}
                            className="border-2 border-gray-300 rounded"
                          >
                            {searchResults.map((result) => (
                              <div
                                key={result.id}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                                className="hover:bg-gray-200"
                                onClick={() => onSearchClick(result.id)}
                              >
                                {result.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <Col span={4} style={{ marginTop: "10px" }}>
                        <Button type="primary" href="/adminLogin">
                          Admin Login
                        </Button>
                      </Col>
                    </Col>
                  </div>
                </Row>
              ) : null}
            </Row>
            <Row>
              <Col span={24}>
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={items}
                  style={(fw, { backgroundColor: "#fbfbfb" })}
                />
              </Col>
            </Row>
          </header>

          {children}

          <footer justify="center">
            <Row justify={"center"} style={fw}>
              &copy; 2024 Movies Web. All rights reserved.
            </Row>
          </footer>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
