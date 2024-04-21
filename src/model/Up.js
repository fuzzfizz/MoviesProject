const { Schema } = require("mongoose");
const { connectionDatabase } = require("@/libs/mongodb");

const itemSchema = new Schema(
    {
        _id: String,
        name: String,
    },
    { versionKey: false }
);

const ItemModel = connectionDatabase.model("item", itemSchema);

module.exports = ItemModel;