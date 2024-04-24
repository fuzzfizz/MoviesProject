const { Schema } = require("mongoose");
const { connectionDatabase } = require("@/libs/mongodb");

const ImgSchema = new Schema(
    {
        _id: String,
        length: Number,
        chunkSize: Number,
        uploadDate: String,
        filename: String,
        metadata: String,
    },
    { versionKey: false }
);

const ImgModel = connectionDatabase.model("Img", ImgSchema);

module.exports = ImgModel;