import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import API from "@/libs/API";
import { Image } from "antd";

const contentStyle = {

  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
  height: "auto",
  overflow: "hidden",
};

function SliderShow() {
  const [image, setImage] = useState(null);


  useEffect(() => {
    API.get("api/file-management/get-all")
      .then((res) => {
        console.log(res.data);
        const filenames = res.data.map((item) => item.filename);
        const promises = filenames.map((filename) =>
          API.get(`api/file-management/get-by-filename?filename=${filename}`)
        );
        return Promise.all(promises);
      })
      .then((responses) => {
        const imageData = responses.map((response) => response.data);
        setImage(imageData);
        console.log(imageData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className=" bg-black">
      <Carousel
      autoplay
      style={{
        width:"100%",
        height: "50%",
        objectFit: "cover",
        textAlign: "center",
      }}
      >
        {image &&
          image.map((img, index) => (
            <div key={index} style={contentStyle}>
              <Image
                src={`data:image/${img.type};base64,${img.base64}`}
                alt={`Uploaded Image ${index}`}
                style={{
                  width: "100%",
                  height: "1200px",
                  overflow: "cover",
                }}
              />
            </div>
          ))}




      </Carousel>
    </div>
  );
}

export default SliderShow;
