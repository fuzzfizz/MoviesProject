const { Schema } = require("mongoose");
const { connectionDatabase } = require("@/libs/mongodb");

const itemSchema = new Schema(
    {
        name: String,
    },
    { versionKey: false }
);

const ItemModel = connectionDatabase.model("item", itemSchema);

module.exports = ItemModel;