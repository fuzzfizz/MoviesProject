"use client";

import API from "@/libs/API";
import { Button, Form, Image, Upload } from "antd";
import react,{ useState,useEffect } from "react";


const TestUploadFile = () => {

    const [image, setImage] = useState(null);

    const handleUpload = (value) => {
        console.log(value);
        const data = new FormData();
        data.append("file", value.upload.file.originFileObj);

        API.post("api/file-management/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    useEffect(() => {
        API.get("api/file-management/get-all")
            .then((res) => {
                console.log(res.data);
                const filenames = res.data.map(item => item.filename);
                const promises = filenames.map(filename => API.get(`api/file-management/get-by-filename?filename=${filename}`));
                return Promise.all(promises);
            })
            .then((responses) => {
                console.log(responses);
                const imageData = responses.map(response => response.data);
                setImage(imageData);
                console.log(imageData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);


    return (
        <div>
            test

            {image && image.map((img, index) => (
                <Image
                    key={index}
                    src={`data:image/${img.type};base64,${img}`}
                    alt={`Uploaded Image ${index}`}
                    style={{ width: "300px", height: "300px" }}
                />
            ))}
           


            <Form onFinish={handleUpload}>
                <Form.Item name="upload">
                    <Upload listType="picture-card">Upload</Upload>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Upload
                </Button>
            </Form>
        </div>
    );
};

export default TestUploadFile;