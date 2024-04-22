"use client";
import React, { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Col, Input, Menu, Row } from "antd";
import { navigate } from "./actions";

const RootLayout = ({ children }) => {
  const { Search } = Input;
  const onSearch = (value) => {
    console.log("Search value:", value);
    navigate({ path: `search?name=${value}` });
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
                  onSearch={onSearch}
                  enterButton
                />
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
