import { connectionDatabase } from "@/libs/mongodb";
import mongoose from "mongoose";

const bucket = new mongoose.mongo.GridFSBucket(connectionDatabase.db);

const uploadFile = (file, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      chunkSizeBytes: 1000000,
      metadata: {
        test: filename,
      },
    });
    const buffer = Buffer.from(file);

    uploadStream.end(buffer);
    uploadStream.on("error", reject);
    uploadStream.on("finish", () => {
      console.log("File uploaded successfully");
      resolve();
    });
  });
};

const getFile = (filename) => {
  return new Promise((resolve, reject) => {
    const downloadStream = bucket.openDownloadStreamByName(filename);
    const chunks = [];

    downloadStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on("error", reject);

    downloadStream.on("end", () => {
      const fileData = Buffer.concat(chunks);
      resolve(fileData);
    });
  });
};

async function getAllFiles() {
  const files = await bucket.find({}).toArray();
 console.log(files);
  const fileDataPromises = files.map(async (file) => {
    return file
    // const downloadStream = bucket.openDownloadStream(file._id);
    // const chunks = [];

    // return new Promise((resolve, reject) => {
    //     downloadStream.on("data", (chunk) => {
    //       chunks.push(chunk);
    //     });

    //     downloadStream.on("error", reject);

    //     downloadStream.on("end", () => {
    //       const fileData = Buffer.concat(chunks);
    //       resolve({ filename: file.filename, data: fileData });
    //     });
    //   }
    // );
  });

  return Promise.all(fileDataPromises);
}

const deleteFile = async (filename) => {
  const files = await bucket.find({ filename }).toArray();
  const fileId = await files[0]?._id;
  return bucket.delete(fileId);
};

export { uploadFile, getFile, getAllFiles,deleteFile };