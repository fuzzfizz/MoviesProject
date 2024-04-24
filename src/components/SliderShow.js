import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import API from "@/libs/API";
import { Button, Form, Image, Upload } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
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
    <div className="px-4 py-4 bg-slate-500">
      <Carousel
        autoplay
        style={{
          width: "100%",
          height: "50%",
          objectFit: "cover",
          textAlign: "center",
        }}
      >
        {image &&
          image.map((img, index) => (
            <div key={index} style={contentStyle}>
              <Image
                src={`data:image/${img.type};base64,${img}`}
                alt={`Uploaded Image ${index}`}
                style={{
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                }}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default SliderShow;
