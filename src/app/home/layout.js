"use client";
import React, { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Col, Input, Menu, Row } from "antd";
import { navigate } from "./actions";
import { useRouter } from "next/navigation";
import API from "@/libs/API";

const RootLayout = ({ children }) => {
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

  const fw = {
    fontWeight: "700",
  };

  const items = [
    {
      type: "item",
      label: "Home",
      key: "./",
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
            <Row
              align="middle"
              justify={"space-around"}
              style={{ textAlign: "center" }}
            >
              <Col span={4}>
                <h1>Movies Website</h1>
              </Col>
              <Col span={3} />
              <Col span={8}>
                <Search
                  placeholder="input search text"
                  onChange={onSearch}
                  enterButton
                  className="relative"
                />
                {searchResults && searchResults.length > 0 && (
                  <div className="absolute flex w-full">
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "90%",
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
              </Col>

              <Col span={2}>
                <Button type="primary">Bookmark</Button>
              </Col>
              <Col span={2} />
              <Col span={4}>
                <Button type="primary" href="/adminLogin">
                  Admin Login
                </Button>
              </Col>
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
              &copy; 2022 Movie Web App. All rights reserved.
            </Row>
          </footer>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
