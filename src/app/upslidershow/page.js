"use client";

import API from "@/libs/API";
import { Button, Form, Image, Upload } from "antd";
import react, { useState, useEffect } from "react";

const TestUploadFile = () => {
    const [image, setImage] = useState(null);
    const [filenameArray, setFilenameArray] = useState(null);

    const handleUpload = (value) => {
        console.log(value);
        const data = new FormData();
        data.append("file", value.upload.file.originFileObj);

        API.post("api/file-management/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {

                resetScreen();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleDelete = (filename) => {
        API.delete(`api/file-management/del-img?name=${filename}`)
            .then(() => {
                resetScreen();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleChangeOrder = (index, direction) => {
        const newImage = [...image];
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < newImage.length) {
            [newImage[index], newImage[newIndex]] = [newImage[newIndex], newImage[index]];
            setImage(newImage);

            const newFilenameArray = [...filenameArray];
            [newFilenameArray[index], newFilenameArray[newIndex]] = [newFilenameArray[newIndex], newFilenameArray[index]];
            setFilenameArray(newFilenameArray);

            const newOrder = newFilenameArray.map(filename => ({ filename }))
                ;



            console.log(newOrder);
            API.put("api/file-management/update-img", newOrder)
                .then(() => {
                    console.log("Order update successfully");
                })
                .catch((error) => {
                    console.error("Error update order:", error);
                });
        }
    };



    const resetScreen = () => {
        API.get("api/file-management/get-all")
            .then((res) => {
                console.log(res.data);
                const filenames = res.data.map(item => item.filename);
                console.log(filenames);
                const promises = filenames.map(filename => API.get(`api/file-management/get-by-filename?filename=${filename}`));
                setFilenameArray(filenames)
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
    };

    useEffect(() => {
        resetScreen();
    }, []);

    return (
        <>

            <h2 >UP SliderShow Image</h2>

            {image && image.map((img, index) => (
                <div key={index} className="text-center">
                    <Button onClick={() => handleChangeOrder(index, -1)}>Move Up</Button>
                    <Button onClick={() => handleChangeOrder(index, 1)}>Move Down</Button>
                    <img src={`data:image/${img.type};base64,${img.base64}`}
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
        </>
    );
};

export default TestUploadFile;


