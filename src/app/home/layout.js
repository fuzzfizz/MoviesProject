"use client";
import React, { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Col, Input, Menu, Row, Segmented } from "antd";
import { navigate } from "./actions";
import "./globals.css";
const RootLayout = ({ children }) => {
  const [manu1, setManu1] = useState(false);

  const manurespon = () => {
    setManu1(!manu1)
  }
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
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#001529",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <AntdRegistry >
          <header>
            {/* <Row
              align="middle"
              justify={"space-around"}
              
            ></Row> */}


            
              <div className="flex items-center justify-between p-25">
              <dev className="text-white text-2xl font-x-4 m-2">Movies <br />Website</dev> 
              {/* แสดงเมนูรูปแบบหน้าจอมือถือ */}
              <div className="md:hidden">
              <button id='menu-toggle' className="text-white" onClick={manurespon}>
                <svg
                  fill="none"
                  stroke='currentColor'
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M4 6h16M4 18h16"></path>
                </svg>
              </button>
              </div>
              {/* แสดงเมนูรูปแบบหน้าจอคอม */}
                  <ul className="hidden md:flex space-x-4">
                    <li><Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  enterButton
                /></li>
                    <li className="mr-4"><Button type="primary" href="/adminLogin" className="mr-4">
                  Admin Login
                </Button></li>
                  </ul>
                
              {manu1 ? (
                <ul className="flex-col md:hidden space-x-4">
                    <li><Search
                  placeholder="input search text"
                  onSearch={onSearch}
                    enterButton
                    className="text-white"
                /></li>
                    <li className="mr-4 text-white"><Button type="primary" href="/adminLogin" className="mr-4">
                  Admin Login
                </Button></li>
                  </ul>
              ) : null}
            </div>
            

            
              {/* <Col span={4}>
                
                <h1 className="text-3xl font-serif ">Movies Website</h1>
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
              </Col> */}
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
