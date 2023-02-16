const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    addedUsers: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model("Room", RoomSchema);

/* 
{
    "name": "Continental",
    "description": "No business conducted",
    "addedUsers": ["John Wick", "Winston", "Ms. Perkins"]
}
*/
