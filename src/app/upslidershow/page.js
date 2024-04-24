"use client";

import API from "@/libs/API";
import { Button, Form, Image, Upload } from "antd";
import { useState } from "react";
import { useEffect } from "react";

const TestUploadFile = () => {

    const [image, setImage] = useState(null);
    const [filenameArray, setFilenameArray] = useState(null);

    const handleUpload = (value) => {
        console.log(value);
        const data = new FormData();
        data.append("file", value.upload.file.originFileObj);

        API.post("api/file-management/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };


    const handleDelete = (filename) => {
        API.delete(`api/file-management/del-img?name=${filename}`);
        console.log(filename);
    };

    // const handleDelete = (del_img) => {
    //     API.delete(`api/file-management/del-img?${del_img}`)
    //         .then(response => {
    //             console.log(response.data);

    //         })
    //         .catch(error => {
    //             console.error("Error deleting file:", error);

    //         });
    // };



    useEffect(() => {
        API.get("api/file-management/get-all")
            .then((res) => {
                console.log(res.data);
                const filenames = res.data.map(item => item.filename);
                const promises = filenames.map(filename => API.get(`api/file-management/get-by-filename?filename=${filename}`));
                setFilenameArray(filenames)
                return Promise.all(promises);

            })
            .then((responses) => {
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
                <div key={index}>
                    <img src={`data:image/${img.type};base64,${img}`}
                        alt={`Uploaded Image ${index}`}
                        style={{ width: "300px", height: "300px" }} />
                    <Button onClick={() => handleDelete(filenameArray[index])}>Delete</Button>
                </div>
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



