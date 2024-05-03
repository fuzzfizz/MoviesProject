"use client";
import { Col, Rate, Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import API from "@/libs/API";
import axios from "axios";
import CardImage from "@/components/CardImage";
import "@/app/style/style.css";
import Card from "antd/es/card/Card";

const MoviePage = ({ params }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [cetargory, setCetargory] = useState([]);

  const getcetargory = async () => {
    const result = await API.get("/api/movies");
    setCetargory(result.data);
    console.log(result.data);
  };

  const getData = async (movieName) => {
    const result = await API.get(`/api/movies/${movieName}`);
    setData(result.data);
    console.log(result.data);
  };
  const getVideo = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/videos`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTBiMGIyN2I0M2E4ZmY0ZTJkMmMwZjQ4NWJjY2IyOSIsInN1YiI6IjY2MDRlZjkzYzU4NDBkMDBjOWMzZTBhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zm3oh_w-WxnAvVtyKAs-wSptfvaaESgdUhmydhXs5E0",
        },
      }
    );
    setData1(result.data.results);
    console.log(result.data);
  };
  const getKeyword = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzdiOGQyYjVhNGU5MzA1N2ZiMTFhYzNjMTA5MDA4YiIsInN1YiI6IjY2MDRmMGIwYWFmZWJkMDEyZjE2ZmQxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QvaIlggc1zm5Y2bjERMQm3O9sTkt63m34YgFJmO35Po",
        },
      }
    );
    setData2(result.data.keywords);
    // console.log(result.data.keywords?.name);
  };
  const getPopmovies = async () => {
    const result = await API.get("/api/movies");
    setData3(result.data);
    console.log("data", result.data.results);
  };
  useEffect(() => {
    getData(params.id);
    getVideo();
    // getKeyword();
    getPopmovies();
    getcetargory();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Row
        justify="space-around"
        gutter={[16, 16]}
        style={{ width: "99%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <Col
          span={24}
          style={{ color: "black", paddingLeft: "2rem", paddingTop: "2rem" }}
        >
          <Title
            key={data.id}
            level={2}
            style={{
              margin: "0px",
            }}
          >
            {data.title}
          </Title>
        </Col>
        <Col xs={20} sm={14} md={12} lg={12} xl={6} xxl={6}>
          <img
            key={data.id}
            width={"100%"}
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          />
        </Col>
        <Col className="trilSize" xs={24} sm={24} md={24} lg={20} xl={14}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${data1[0]?.key}?autoplay=1`}
            frameborder="0"
            allow="autoplay; "
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={20}
          xl={24}
          style={{
            color: "black",
            alignItems: "center",
            display: "flex",
            paddingLeft: "2.5rem",
          }}
        >
          <Title key={data.id} level={2}>
            Rate:
            <Rate disabled defaultValue={`${data.vote_average / 2}`} />
          </Title>
        </Col>
        {/* <Col span={24} style={{ paddingTop: "0px", paddingLeft: "2.5rem" }}>
          <Title level={2} style={{ color: "black", margin: "0px" }}>
            keywords:{"  "}
            {data2?.map((movie, index) => (
              <Tag key={index} color="default">
                {movie?.name}
              </Tag>
            ))}
          </Title>
        </Col> */}
        <Col
          key={data.id}
          span={24}
          style={{
            color: "black",
            padding: "2rem",
            paddingLeft: "2.4rem",
          }}
        >
          <Card>
            <Title style={{ margin: "0px" }} level={4}>
              {data.overview}
            </Title>
          </Card>
        </Col>

        <Col
          className="videoSize"
          xs={24}
          sm={24}
          md={24}
          lg={22}
          xl={22}
          style={{ color: "black" }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${data1[1]?.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </Col>
        <Col style={{ color: "black", padding: "2rem", width: "100%" }}>
          <Title level={2}>Related:</Title>
          <Row justify="center" gutter={[16, 16]} style={{ width: "100%" }}>
            {data3.slice(1, 5).map((movie, index) => (
              <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} key={index}>
                <CardImage
                  title={movie.title}
                  Image={movie.poster_path}
                  linkUrl={movie.id}
                  rate={movie.vote_average / 2}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default MoviePage;
