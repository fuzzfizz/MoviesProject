"use client";
import React from "react";
import CardImage from "@/components/CardImage";

const App = () => {
  const array = [
    {
      src: "https://images.workpointtoday.com/workpointnews/2022/01/11121712/1641878230_16481_HarryPotterandtheSorcerer_sStone-Poster.jpg",
      title: "Movie 1",
    },
    {
      src: "https://images.workpointtoday.com/workpointnews/2022/01/11121712/1641878230_16481_HarryPotterandtheSorcerer_sStone-Poster.jpg",
      title: "Movie 2",
    },
    {
      src: "https://images.workpointtoday.com/workpointnews/2022/01/11121712/1641878230_16481_HarryPotterandtheSorcerer_sStone-Poster.jpg",
      title: "Movie 3",
    },
  ];
  return (
    <>
      <h1>Movies</h1>
      {array.map((item) => (
        <CardImage key={item?.src} src={item.src} title={item.title}>
          <input type="button" value="Bookmark" />
        </CardImage>
      ))}
    </>
  );
};

export default App;
