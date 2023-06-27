const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    when: {
        type: Date,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Message", MessageSchema);
// {
//     "when": "2018-07-15T20:00:47.696Z",
//     "user": "John",
//     "room": "Main",
//     "body": "I really want to attend NASA's DEVELOP program this summer!"
// }
