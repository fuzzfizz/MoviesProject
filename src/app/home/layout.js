"use client";
import React, { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Col, Input, Menu, Row, Segmented } from "antd";
import { navigate } from "./actions";
import { useRouter } from "next/navigation";
import API from "@/libs/API";

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
    window.location.reload(); // Refresh the window
    console.log("search:", e);
    navigate({ path: `/home/search?search=${e}` });
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
    {
      label: "Movies",
      key: "movies",
      children: [
        {
          type: "item",
          label: "Thai Movies",
          key: "thaiMovies",
        },
        {
          type: "item",
          label: "Korea Movies",
          key: "koreaMovies",
        },
      ],
    },
    {
      label: "Series",
      key: "Series",

      children: [
        {
          type: "item",
          label: "Thai Series",
          key: "thaiSeries",
        },
        {
          type: "item",
          label: "Korea Series",
          key: "koreaSeries",
        },
      ],
    },
    {
      label: "Cartoons",
      key: "cartoons",

      children: [
        {
          type: "item",
          label: "Anime",
          key: "anime",
        },
        {
          type: "item",
          label: "Animations",
          key: "animations",
        },
      ],
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
            <div className="flex items-center justify-between p-25">
              <dev className="m-2 text-2xl text-white font-x-4">
                Movies <br />
                Website
              </dev>
              {/* แสดงเมนูรูปแบบหน้าจอมือถือ */}
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
                    className="w-6 h-6"
                  >
                    <path d="M4 6h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
              {/* แสดงเมนูรูปแบบหน้าจอคอม */}
              <ul className="hidden space-x-4 md:flex">
                <li>
                  <Search
                    placeholder="input search text"
                    onChange={onSearch}
                    enterButton
                    className="relative"
                    onSearch={pushSearch}
                  />
                </li>
                <li>
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
                          top: "32px",
                          left: "-250px",
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
                  <Col span={4}>
                    <Button type="primary" href="/adminLogin">
                      Admin Login
                    </Button>
                  </Col>
                </li>
              </ul>
              {manu1 ? (
                <ul className="flex-col space-x-4 md:hidden">
                  <li>
                    <Search
                      placeholder="input search text"
                      onChange={onSearch}
                      enterButton
                      className="relative"
                    />
                  </li>
                  <li>
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
                            left: "-80px",
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
                    <Col span={4}>
                      <Button type="primary" href="/adminLogin">
                        Admin Login
                      </Button>
                    </Col>
                  </li>
                </ul>
              ) : null}
            </div>
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
              &copy; 2022 Movie Web App. All rights reserved.
            </Row>
          </footer>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
