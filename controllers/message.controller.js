const router = require("express").Router();
const Message = require("../models/message.model");
const { error, success, incomplete } = require("../helpers");

router.post("/:room", async (req, res) => {
    try {
        const { when, user, room, body } = req.body;

        const { Room } = req.params;

        const roomCheck = await Room.find({ _id: room });
        if (!roomCheck) throw new Error("No such room.");

        const message = new Message({
            when: date ? date : new Date(),
            user,
            room,
            body,
        });
        const newMessage = await message.save();

        // Structure how we may want to save our task object for the vehicle it is being assigned to.
        const forRoom = {
            id: newMessage._id,
            body: newMessage.body,
            date: newMessage.when,
        };

        await Room.findOneAndUpdate(
            { _id: room },
            { $push: { messages: forRoom } }
        );

        newMessage ? success(res, newMessage) : incomplete(res);
    } catch (err) {
        error(res, err);
    }
});

module.exports = router;

// {
//     "when": "2018-07-15T20:00:47.696Z",
//     "user": "John",
//     "room": "Main",
//     "body": "I really want to attend NASA's DEVELOP program this summer!"
// }
